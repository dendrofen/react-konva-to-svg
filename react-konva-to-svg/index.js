import { Context } from "svgcanvas";

/**
 * Asynchronously sleeps for a specified time.
 * @param {number} time - The time to sleep in milliseconds.
 * @returns {Promise<void>} A Promise that resolves after sleeping.
 */
export const sleep = async (time) => new Promise(resolve => setTimeout(resolve, time));

/**
 * Exports the SVG representation of a Konva stage.
 * @param {Stage} stage - The Konva stage to export.
 * @param {boolean} [blob=false] - Whether to return a Blob object instead of a string.
 * @param {Object} [options] - Additional options.
 * @param {Function} [options.onBefore] - A callback function to execute before exporting.
 * @param {Function} [options.onAfter] - A callback function to execute after exporting.
 * @returns {string|Blob} The SVG data or a Blob object.
 */
export async function exportStageSVG(stage, blob = false, { onBefore, onAfter } = {}) {
    // Get the first layer of the stage
    const layer = stage.getLayers()[0];

    // Call the 'onBefore' callback function if provided, passing in the stage and layer
    onBefore && onBefore([stage, layer]);

    // Asynchronously sleep for 200 milliseconds
    await sleep(200);

    // Create a new context for rendering the SVG
    const oldContext = layer.canvas.context._context;
    const c2s = layer.canvas.context._context = new Context({
        height: stage.height(),
        width: stage.width(),
        ctx: oldContext
    });

    // Draw the stage on the new context
    stage.draw();

    // Get the serialized SVG data
    let out = c2s.getSerializedSvg();

    // If 'blob' is true, create a Blob object with the SVG data and specify the MIME type
    out = blob ? new Blob([out], { type: "image/svg+xml;charset=utf-8" }) : out;

    // Restore the original context
    layer.canvas.context._context = oldContext;

    // Call the 'onAfter' callback function if provided, passing in the stage and layer
    onAfter && onAfter([stage, layer]);

    // Asynchronously sleep for 200 milliseconds
    await sleep(200);

    // Redraw the stage
    stage.draw();

    // Return the SVG data or Blob object
    return out;
}
