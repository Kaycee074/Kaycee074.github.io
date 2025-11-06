---
permalink: /
title: "Welcome!"
excerpt: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

![1pager](/images/A23.jpg "Flyer")

*The beauty of math, science, and technology lies in their endless possibilities. Every problem is an invitation to explore, learn, and innovate.*

## About me
I am a **machine learning scientist** and a **Ph.D. candidate** in the
[Department of Electrical, Computer, and Systems Engineering at Rensselaer Polytechnic Institute](https://ecse.rpi.edu/).
My research lies at the intersection of **machine learning, optimization, and control systems**.

### Key Projects
1. **Automating Safe Reinforcement Learning** (AIRC Research)  
2. **Safe and Robust Prompt Tuning of Foundation Models** (AIRC Research)  
3. **Off-Policy Evaluation for Safe Offline RL using Offline Datasets** (IBM Research)  
4. **Probabilistic Low-Rank Adaptation (LoRA) for Large Language Models**  
5. **Machine Learning for Bi-Linear Flow Models**  
6. **Ensuring Safety in Multimodal Machine Learning Models**

## Education
- **B.Sc**: Electrical & Electronics Engineering — **First Class Honours, Valedictorian**  
- **M.Sc**: Computer & Systems Engineering — **Distinction**  
- **Ph.D**: Electrical, Computer, & Systems Engineering (2021–Present)

## Recent news
- 🏆 **October 2025** — Received the **2025 Graduate Teaching Excellence Award at Rensselaer**  
- 🏆 **April 2025** — Received the **Dr. Alireza Seyedi ’99, ’04 Award at Rensselaer**  
- 🎉 **October 2024** — Passed the **Doctoral Candidacy Examination**  
- 🏆 **October 2024** — **ACM SIG Travel Grant Award**

---

## Live Demo: Occupancy & Activity (ToF + Color Sensors)
> Privacy-first sensing with low-res ToF and ceiling color sensors; fused to detect people, count occupants, and estimate basic activity (walking / seated) in real time.

<!-- Option A: iframe to a hosted demo URL -->
<!-- Replace the src with your deployed demo URL (e.g., /demo/ or an external app) -->
<div style="aspect-ratio: 16/9; width: 100%; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
  <iframe
    src="/demo/index.html"
    title="ToF + Color Sensors Demo"
    loading="lazy"
    style="width:100%; height:100%; border:0;">
  </iframe>
</div>

<!-- Option B: Inline assets (if you place a static bundle under /assets/demo) -->
<!--
<script defer src="/assets/demo/main.js"></script>
<link rel="preload" href="/assets/demo/main.css" as="style" onload="this.rel='stylesheet'">
<div id="demo-root" style="min-height: 520px"></div>
-->

### How it works (brief)
- **ToF heatmap** (stitched 20×25 tiles) → motion energy + connected components → occupant centroids.  
- **Color sensors** → robust Z-scores (median/MAD) → local color shift index near each centroid.  
- **Fusion** → confidence, occupancy count, and activity (walking vs seated) with low latency.
