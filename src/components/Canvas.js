import { useEffect, useState } from "react";
import { Arc, Ellipse, Group, Image, Layer, Line, Rect, Stage, Text } from "react-konva";

const CustomImage = ({ src, ...props }) => {
    const [image, setImage] = useState();

    useEffect(() => {
        if (!image) {
            const img = new window.Image;
            img.src = src
            img.onload = setImage.bind(this, img);
        }
    }, [image, src])

    return (image && <Image image={image} {...props} />)
}

export default function Canvas() {
    const [width, height] = [300, 300];

    const lineCoef = 6;
    const lines = [
        [0, 0, width / lineCoef, 0],
        [0, 0, 0, height / lineCoef],
        [width, 0, width - width / lineCoef, 0],
        [width, 0, width, height / lineCoef],

        [0, height, width / lineCoef, height],
        [0, height, 0, height - height / lineCoef],
        [width, height, width - width / lineCoef, height],
        [width, height, width, height - height / lineCoef],
    ]
    return (
        <Stage width={width} height={height}>
            <Layer>
                <Group
                    width={width / 4}
                    height={height / 4}
                    draggable
                >
                    <Rect
                        width={width / 4}
                        height={height / 4}
                        fill="#F3CA40"
                    />
                    <Text
                        text="Rect + Text Group"
                        fontFamily="cursive"
                        width={width / 4}
                        height={height / 4}
                        align="center"
                        verticalAlign="middle"
                    />
                </Group>

                <CustomImage
                    src={'https://konvajs.org/assets/lion.png'}
                    width={width / 4}
                    height={height / 4}
                    x={width / 4}
                    draggable
                />

                <Ellipse fill="red" radiusX={10} radiusY={10} x={width / 2} y={height / 2} />

                <Text
                    x={width / 3}
                    y={height / 1.8}
                    text="Use Arc, instead of Ellipse. Red - Ellipse, Green - Arcs. (see example)"

                    width={width / 2}
                />
                <Arc outerRadius={10} angle={360} x={width / 3} y={height / 2} fill={'green'} strokeEnabled={false} />
                <Arc outerRadius={10} angle={360} x={width / 1.5} y={height / 2} fill={'green'} strokeEnabled={false} />

                {lines.map((points, key) =>
                    <Line
                        key={key}
                        points={points}
                        stroke="#577590" strokeWidth={5}
                    />
                )}

            </Layer>
        </Stage>
    )
}