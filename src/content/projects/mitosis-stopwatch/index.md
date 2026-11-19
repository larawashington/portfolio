---
title: Mitosis Stopwatch
description: "An experimental visualization of temporal data that keeps time through computed cell division."
categories: [Data Visualization]
tools: [JavaScript, CSS, HTML, D3.js]
skills: Experimental data visualization, interactive motion, physics simulation, system design
hero: ./poster.png
heroAlt: The stopwatch counting up while cells divide around it
order: 2
date: 2026-09-26
liveUrl: https://pgdv5100-dvia.github.io/mitosis-stopwatch/
repoUrl: https://github.com/PGDV5100-DVIA/mitosis-stopwatch
heroVideo: mitosis-stopwatch.mp4
deck:
  dir: mitosis-deck
  slides:
    - Mitosis Stopwatch
    - The idea
    - Prototype
    - Adding a cell lifecycle
    - Building in sections
    - Mapping out functions
    - The product
    - Going further
    - Thank you
  hideFromList: [Mitosis Stopwatch, Thank you] # still in the deck, just not in Contents
  # GIFs from the PPTX (ppt/media), positions from each slide's XML
  motion:
    - { slide: 3, src: slide-03.mp4, left: 48.37, top: 14.00, width: 45.02, height: 78.13 }
    - { slide: 7, src: slide-07.mp4, left: 16.07, top: 29.29, width: 67.86, height: 67.86 }
---

## Overview

Mitosis Stopwatch is an experimental visualization of temporal data through computed cell division. Starting with one cell that elongates and divides, its daughter cells drift apart and divide again. The population of cells grows exponentially as the timer runs until there is no room for the next division to occur.

The maximum capacity depends on window size.

Moving the cursor through the cells pushes them apart.
