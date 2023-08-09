import styles from '@/app/page.module.css';
import { exportStageSVG } from "@/lib";
import { useCallback, useState } from "react";

export default function ProcessButtons() {
    const [image, setImage] = useState();

    const onStageSVG = useCallback(async () => {
        const svg = await exportStageSVG(window.Konva.stages[0]);
        setImage(svg);
    }, [setImage])

    const onNoImageSVG = useCallback(async () => {
        const stage = window.Konva.stages[0];
        const imageNode = stage.getLayers()[0].findOne('Image');
        const svg = await exportStageSVG(stage, false, {
            onBefore: () => imageNode.hide(),
            onAfter: () => imageNode.show()
        });
        setImage(svg);
    }, [setImage])

    return (
        <>
            <div className={styles.grid}>
                <button type="button" onClick={onStageSVG}>Stage to SVG</button>
                <button type="button" onClick={onNoImageSVG}>Without Image to SVG</button>
            </div>

            {image &&
                <>
                    <p>image & code below:</p>
                    <div className={styles.grid}>
                        <div dangerouslySetInnerHTML={{ __html: image }} />
                        <textarea value={image} readOnly />
                    </div>
                </>
            }
        </>
    )
}