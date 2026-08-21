(function () {
  "use strict";

  const root = document.getElementById("occupancy-demo");
  if (!root) return;

  const sensorNames = ["color", "tof", "co2", "temperature"];
  const activityLabels = ["empty", "sitting", "standing", "walking", "meeting"];
  const state = { data: null, index: 0, playing: false, playbackTime: 0, lastAnimationTime: null };
  const elements = {
    loading: document.getElementById("demo-loading"),
    error: document.getElementById("demo-error"),
    controls: root.querySelector(".demo-controls"),
    visuals: root.querySelector(".demo-visuals"),
    fusion: root.querySelector(".demo-fusion"),
    play: document.getElementById("demo-play"),
    restart: document.getElementById("demo-restart"),
    timeline: document.getElementById("demo-timeline"),
    time: document.getElementById("demo-time"),
    challenge: document.getElementById("demo-challenge"),
    challengeDescription: document.getElementById("demo-challenge-description"),
    truthRoom: document.getElementById("ground-truth-room"),
    truthOccupancy: document.getElementById("truth-occupancy"),
    truthActivity: document.getElementById("truth-activity"),
    colorRoom: document.getElementById("color-sensor-room"),
    colorMotion: document.getElementById("color-motion"),
    tofGrid: document.getElementById("tof-grid"),
    tofBlobs: document.getElementById("tof-blobs"),
    co2Value: document.getElementById("co2-value"),
    temperatureValue: document.getElementById("temperature-value"),
    environmentChart: document.getElementById("environment-chart"),
    fusionOccupancy: document.getElementById("fusion-occupancy"),
    fusionOccupancyConfidence: document.getElementById("fusion-occupancy-confidence"),
    fusionActivity: document.getElementById("fusion-activity"),
    fusionActivityConfidence: document.getElementById("fusion-activity-confidence"),
    fusionMatch: document.getElementById("fusion-match"),
    occupancyProbabilities: document.getElementById("occupancy-probabilities"),
    activityProbabilities: document.getElementById("activity-probabilities"),
    modalities: document.getElementById("modality-estimates")
  };

  const svgNS = "http://www.w3.org/2000/svg";
  const svgElement = function (name, attributes) {
    const element = document.createElementNS(svgNS, name);
    Object.entries(attributes || {}).forEach(function (entry) {
      element.setAttribute(entry[0], entry[1]);
    });
    return element;
  };

  const titleCase = function (value) {
    return String(value).replace(/_/g, " ").replace(/\b\w/g, function (character) { return character.toUpperCase(); });
  };

  const formatTime = function (seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds - minutes * 60;
    return minutes + ":" + remainder.toFixed(1).padStart(4, "0");
  };

  const enabledSensors = function () {
    return Array.from(root.querySelectorAll(".demo-sensor-toggles input:checked")).map(function (input) { return input.value; });
  };

  const currentMask = function () {
    const enabled = new Set(enabledSensors());
    return sensorNames.map(function (name) { return enabled.has(name) ? "1" : "0"; }).join("");
  };

  const currentScenario = function () {
    return state.data.scenarios[elements.challenge.value];
  };

  const sensorData = function (name) {
    const override = currentScenario().sensor_overrides[name];
    if (!override) return state.data.sensors[name];
    return Object.assign({}, state.data.sensors[name], override);
  };

  const drawRoomBase = function (svg) {
    svg.textContent = "";
    [200, 400, 600].forEach(function (x) {
      svg.appendChild(svgElement("line", { x1: x, y1: 0, x2: x, y2: 600, class: "demo-room__grid" }));
    });
    [200, 400].forEach(function (y) {
      svg.appendChild(svgElement("line", { x1: 0, y1: y, x2: 800, y2: y, class: "demo-room__grid" }));
    });
    svg.appendChild(svgElement("rect", { x: 3, y: 3, width: 794, height: 594, class: "demo-room__boundary" }));
  };

  const roomPoint = function (x, y) {
    return { x: x / state.data.room.width_m * 800, y: 600 - y / state.data.room.length_m * 600 };
  };

  const initializeVisuals = function () {
    drawRoomBase(elements.truthRoom);
    drawRoomBase(elements.colorRoom);
    const positions = state.data.sensors.color.sensor_positions_m;
    positions.forEach(function (position, index) {
      const point = roomPoint(position[0], position[1]);
      const circle = svgElement("circle", {
        cx: point.x,
        cy: point.y,
        r: 8,
        class: "demo-color-sensor",
        "data-sensor-index": index
      });
      elements.colorRoom.appendChild(circle);
    });
    for (let index = 0; index < 64; index += 1) {
      const cell = document.createElement("span");
      cell.className = "demo-tof-cell";
      elements.tofGrid.appendChild(cell);
    }
    createProbabilityRows(elements.occupancyProbabilities, ["0 people", "1 person", "2 people", "3 people"]);
    createProbabilityRows(elements.activityProbabilities, activityLabels.map(titleCase));
    sensorNames.forEach(function (name) {
      const article = document.createElement("article");
      article.className = "demo-modality";
      article.dataset.modality = name;
      article.innerHTML = "<h4>" + (name === "tof" ? "ToF" : titleCase(name)) + "</h4><p><strong data-field=\"occupancy\">—</strong> occupants · <span data-field=\"occupancy-confidence\">—</span>%<br><strong data-field=\"activity\">—</strong> · <span data-field=\"activity-confidence\">—</span>%</p>";
      elements.modalities.appendChild(article);
    });
  };

  const createProbabilityRows = function (container, labels) {
    labels.forEach(function (label, index) {
      const row = document.createElement("div");
      row.className = "demo-probability";
      row.dataset.probabilityIndex = index;
      row.innerHTML = "<span>" + label + "</span><span class=\"demo-probability__track\"><span class=\"demo-probability__bar\"></span></span><strong>0%</strong>";
      container.appendChild(row);
    });
  };

  const updateProbabilityRows = function (container, probabilities) {
    Array.from(container.children).forEach(function (row, index) {
      const percentage = Math.round(probabilities[index] * 100);
      row.querySelector(".demo-probability__bar").style.width = percentage + "%";
      row.querySelector("strong").textContent = percentage + "%";
    });
  };

  const renderGroundTruth = function (frame) {
    elements.truthRoom.querySelectorAll(".demo-room__occupant").forEach(function (node) { node.remove(); });
    frame.occupants.filter(function (occupant) { return occupant.present; }).forEach(function (occupant) {
      const point = roomPoint(occupant.x_m, occupant.y_m);
      const group = svgElement("g", { class: "demo-room__occupant" });
      group.appendChild(svgElement("circle", { cx: point.x, cy: point.y, r: 24 }));
      const label = svgElement("text", { x: point.x + 32, y: point.y + 9 });
      label.textContent = occupant.id.replace("person-", "P");
      group.appendChild(label);
      elements.truthRoom.appendChild(group);
    });
    elements.truthOccupancy.textContent = frame.occupancy;
    elements.truthActivity.textContent = titleCase(frame.activity);
  };

  const renderColor = function (index) {
    const data = sensorData("color");
    const response = data.response_magnitude[index];
    elements.colorMotion.textContent = Number(data.motion_score[index]).toFixed(2);
    elements.colorRoom.querySelectorAll(".demo-color-sensor").forEach(function (circle, sensorIndex) {
      const magnitude = Math.min(Number(response[sensorIndex]), 2.2);
      circle.setAttribute("r", String(7 + magnitude * 9));
      circle.style.opacity = String(0.18 + Math.min(magnitude / 1.6, 1) * 0.82);
    });
  };

  const renderToF = function (index) {
    const data = sensorData("tof");
    const values = data.depth_maps_m[index].flat();
    elements.tofBlobs.textContent = data.estimated_blob_count[index];
    Array.from(elements.tofGrid.children).forEach(function (cell, cellIndex) {
      const depth = Number(values[cellIndex]);
      const strength = Math.max(0, Math.min(1, (3.05 - depth) / 2.0));
      cell.style.backgroundColor = "rgba(0, 109, 119, " + (0.08 + strength * 0.92).toFixed(3) + ")";
    });
  };

  const drawEnvironment = function (index) {
    const co2 = sensorData("co2").measured_ppm;
    const temperature = sensorData("temperature").measured_c;
    elements.co2Value.textContent = Number(co2[index]).toFixed(1);
    elements.temperatureValue.textContent = Number(temperature[index]).toFixed(2);
    const canvas = elements.environmentChart;
    const width = Math.max(280, Math.floor(canvas.clientWidth));
    const height = Math.max(220, Math.floor(canvas.clientHeight));
    const ratio = window.devicePixelRatio || 1;
    if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
      canvas.width = width * ratio;
      canvas.height = height * ratio;
    }
    const context = canvas.getContext("2d");
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const styles = getComputedStyle(root);
    const muted = styles.getPropertyValue("--demo-muted").trim();
    const line = styles.getPropertyValue("--demo-line").trim();
    const accent = styles.getPropertyValue("--demo-accent").trim();
    const warm = styles.getPropertyValue("--demo-warm").trim();
    const left = 42, right = 12, top = 14, bottom = 30;
    const plotWidth = width - left - right, plotHeight = height - top - bottom;
    context.strokeStyle = line;
    context.lineWidth = 1;
    [0, 0.5, 1].forEach(function (fraction) {
      const y = top + fraction * plotHeight;
      context.beginPath(); context.moveTo(left, y); context.lineTo(width - right, y); context.stroke();
    });
    const drawSeries = function (values, minimum, maximum, color) {
      context.strokeStyle = color; context.lineWidth = 2; context.beginPath();
      values.forEach(function (value, valueIndex) {
        const x = left + valueIndex / (values.length - 1) * plotWidth;
        const y = top + (1 - (value - minimum) / (maximum - minimum)) * plotHeight;
        if (valueIndex === 0) context.moveTo(x, y); else context.lineTo(x, y);
      });
      context.stroke();
    };
    drawSeries(co2, Math.min.apply(null, co2) - 2, Math.max.apply(null, co2) + 2, accent);
    drawSeries(temperature, Math.min.apply(null, temperature) - 0.01, Math.max.apply(null, temperature) + 0.01, warm);
    const cursorX = left + index / (co2.length - 1) * plotWidth;
    context.strokeStyle = muted; context.lineWidth = 1.5; context.beginPath(); context.moveTo(cursorX, top); context.lineTo(cursorX, top + plotHeight); context.stroke();
    context.fillStyle = muted; context.font = "12px sans-serif";
    context.fillText("0:00", left, height - 8);
    context.fillText("5:00", width - right - 28, height - 8);
    context.fillStyle = accent; context.fillText("CO2", left + 4, top + 14);
    context.fillStyle = warm; context.fillText("Temperature", left + 42, top + 14);
  };

  const renderFusion = function (index, truth) {
    const scenario = currentScenario();
    const prediction = scenario.variants[currentMask()];
    const occupancy = prediction.occupancy_estimate[index];
    const activity = prediction.activity_estimate[index];
    elements.fusionOccupancy.textContent = occupancy;
    elements.fusionActivity.textContent = titleCase(activity);
    elements.fusionOccupancyConfidence.textContent = Math.round(prediction.occupancy_confidence[index] * 100);
    elements.fusionActivityConfidence.textContent = Math.round(prediction.activity_confidence[index] * 100);
    updateProbabilityRows(elements.occupancyProbabilities, prediction.occupancy_probabilities[index]);
    updateProbabilityRows(elements.activityProbabilities, prediction.activity_probabilities[index]);
    const matches = occupancy === truth.occupancy && activity === truth.activity;
    elements.fusionMatch.textContent = matches ? "Matches reference state" : "Disagrees with reference state";
    elements.fusionMatch.classList.toggle("is-mismatch", !matches);
    const enabled = new Set(enabledSensors());
    sensorNames.forEach(function (name) {
      const card = elements.modalities.querySelector("[data-modality=\"" + name + "\"]");
      const modality = scenario.modality_estimates[name];
      card.classList.toggle("is-disabled", !enabled.has(name));
      card.querySelector("[data-field=\"occupancy\"]").textContent = modality.occupancy_estimate[index];
      card.querySelector("[data-field=\"occupancy-confidence\"]").textContent = Math.round(modality.occupancy_confidence[index] * 100);
      card.querySelector("[data-field=\"activity\"]").textContent = titleCase(modality.activity_estimate[index]);
      card.querySelector("[data-field=\"activity-confidence\"]").textContent = Math.round(modality.activity_confidence[index] * 100);
    });
  };

  const render = function () {
    const index = state.index;
    const timestamp = state.data.timestamps_s[index];
    const truth = state.data.ground_truth[index];
    elements.timeline.value = index;
    elements.time.value = formatTime(timestamp);
    elements.challengeDescription.textContent = currentScenario().description;
    renderGroundTruth(truth);
    renderColor(index);
    renderToF(index);
    drawEnvironment(index);
    renderFusion(index, truth);
  };

  const setPlaying = function (playing) {
    state.playing = playing;
    elements.play.textContent = playing ? "Pause" : "Play";
    elements.play.setAttribute("aria-pressed", String(playing));
    state.lastAnimationTime = null;
    if (playing) requestAnimationFrame(animate);
  };

  const animate = function (animationTime) {
    if (!state.playing) return;
    if (state.lastAnimationTime === null) state.lastAnimationTime = animationTime;
    const elapsedSeconds = (animationTime - state.lastAnimationTime) / 1000;
    state.lastAnimationTime = animationTime;
    state.playbackTime += elapsedSeconds * 10;
    const finalTime = state.data.timestamps_s[state.data.timestamps_s.length - 1];
    if (state.playbackTime >= finalTime) {
      state.playbackTime = finalTime;
      state.index = state.data.timestamps_s.length - 1;
      render();
      setPlaying(false);
      return;
    }
    state.index = Math.min(state.data.timestamps_s.length - 1, Math.round(state.playbackTime / state.data.metadata.timestep_s));
    render();
    requestAnimationFrame(animate);
  };

  const bindEvents = function () {
    elements.play.addEventListener("click", function () { setPlaying(!state.playing); });
    elements.restart.addEventListener("click", function () {
      setPlaying(false); state.index = 0; state.playbackTime = 0; render();
    });
    elements.timeline.addEventListener("input", function () {
      setPlaying(false); state.index = Number(elements.timeline.value); state.playbackTime = state.data.timestamps_s[state.index]; render();
    });
    elements.challenge.addEventListener("change", render);
    root.querySelectorAll(".demo-sensor-toggles input").forEach(function (input) { input.addEventListener("change", render); });
    if (window.ResizeObserver) new ResizeObserver(function () { if (state.data) drawEnvironment(state.index); }).observe(elements.environmentChart);
  };

  fetch(root.dataset.dataUrl)
    .then(function (response) {
      if (!response.ok) throw new Error("Sensor data returned HTTP " + response.status + ".");
      return response.json();
    })
    .then(function (data) {
      state.data = data;
      elements.timeline.max = data.timestamps_s.length - 1;
      initializeVisuals();
      bindEvents();
      elements.loading.hidden = true;
      elements.controls.hidden = false;
      elements.visuals.hidden = false;
      elements.fusion.hidden = false;
      root.dataset.ready = "true";
      render();
    })
    .catch(function (error) {
      elements.loading.hidden = true;
      elements.error.hidden = false;
      elements.error.textContent = "The interactive demo could not load: " + error.message;
    });
})();
