# react-konva-to-svg

**Extend Konva's functionality to export stages as SVG. Enhance the quality of exported images with SVG format.**

[![GitHub License](https://img.shields.io/github/license/dendrofen/react-konva-to-svg)](LICENSE)
[![Build Size](https://img.shields.io/bundlephobia/minzip/react-konva-to-svg?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=react-konva-to-svg)
[![Version](https://img.shields.io/npm/v/react-konva-to-svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-konva-to-svg)
[![Downloads](https://img.shields.io/npm/dt/react-konva-to-svg.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-konva-to-svg)

## Features

- Export Konva stages to SVG format.
- Asynchronous export with progress tracking.
- Before and after export callbacks for custom processing.
- Flexible context with a function that handles Konva stage objects.
- Export results as text SVG or Blob SVG.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install `react-konva-to-svg` using npm, yarn, or directly from GitHub.

- **npm**: `npm install react-konva-to-svg`
- **yarn**: `yarn add react-konva-to-svg`
- **GitHub**: [GitHub Repository](https://github.com/dendrofen/react-konva-to-svg)

## Usage

To use `react-konva-to-svg`, import the library and utilize the `exportStageSVG` function with your Konva stage object. This function allows you to customize the export process.

### `exportStageSVG(stage, blob, options)`

- `stage`: The Konva stage object you want to export.
- `blob` (optional): Set to `true` to export as Blob SVG, or `false` (default) to export as text SVG.
- `options` (optional): An object containing the following callbacks:
  - `onBefore`: A callback function called before export. Receives an array `[stage, layer]` as an argument.
  - `onAfter`: A callback function called after export. Receives an array `[stage, layer]` as an argument.

**Example usage:**

```javascript
import { exportStageSVG } from 'react-konva-to-svg';

// Example usage
const stage = /* your Konva stage */;
const result = await exportStageSVG(stage, false, {
  onBefore: ([stage, layer]) => {
    // Perform actions before export
  },
  onAfter: ([stage, layer]) => {
    // Perform actions after export
  },
});
```

## Demo

Explore a live demo of react-konva-to-svg in action: [Demo](https://dendrofen.github.io/react-konva-to-svg/)