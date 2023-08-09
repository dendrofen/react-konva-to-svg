import { Context } from "svgcanvas";

export const sleep = async (time) => new Promise(resolve => setTimeout(resolve, time));

export async function exportStageSVG(stage, blob = false, { onBefore, onAfter } = {}) {
    const layer = stage.getLayers()[0];

    onBefore && onBefore([stage, layer]);

    await sleep(200);

    const oldContext = layer.canvas.context._context;
    const c2s = layer.canvas.context._context = new Context({
        height: stage.height(),
        width: stage.width(),
        ctx: oldContext
    });

    stage.draw();

    let out = c2s.getSerializedSvg();
    out = blob ? new Blob([out], { type: "image/svg+xml;charset=utf-8" }) : out;

    layer.canvas.context._context = oldContext;
    onAfter && onAfter([stage, layer])

    await sleep(200);

    stage.draw();

    return out;
}