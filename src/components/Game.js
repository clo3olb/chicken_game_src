import React, { useEffect } from "react";
import { useTracked } from "../state";
import GetImage from "./GetImage";

//Balance

function PaletteItem({ index }) {
    const [state, dispatch] = useTracked();

    function checkLeftIn(x, y) {
        const leftArm = document.querySelector(".balance_left");
        const bound = leftArm.getBoundingClientRect();
        if (
            state.selected.isActive == true &&
            x > bound.left &&
            x < bound.right &&
            y < bound.bottom &&
            y > bound.top
        ) {
            return true;
        }
        return false;
    }

    function handleTouchStart(e) {
        dispatch({
            type: "SET_SELECTED",
            selected: {
                ...state.selected,
                index: index,
                isActive: true,
            },
        });
        const x = e.changedTouches[0].clientX;
        const y = e.changedTouches[0].clientY;
        changeSelectedPosition(x, y);
    }
    function handleTouchEnd() {
        dispatch({
            type: "SET_SELECTED",
            selected: {
                ...state.selected,
                isActive: false,
            },
        });
    }
    function handleTouchMove(e) {
        const x = e.changedTouches[0].clientX;
        const y = e.changedTouches[0].clientY;
        changeSelectedPosition(x, y);
        if (checkLeftIn(x, y)) {
            dispatch({
                type: "SET_EQUATION",
                equation: {
                    ...state.equation,
                    left: {
                        ...state.equation.left,
                        input: state.equation.left.input + state.selected.index,
                    },
                },
            });
            handleTouchEnd();
            //audioDiong.volume = 0.3;
            //audioDiong.play();
            const leftArm = document.querySelector(".balance_left");
            leftArm.classList.remove("pop");
            void leftArm.offsetWidth;
            leftArm.classList.add("pop");
        }
    }

    function changeSelectedPosition(x, y) {
        const selected = document.getElementById("selected");
        if (selected) {
            const width = selected.offsetWidth;
            const height = selected.offsetHeight;

            selected.style.top = y - height / 2 + "px";
            selected.style.left = x - width / 2 + "px";
        }
    }

    return (
        <div
            className="palette_item"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
        >
            <GetImage category={state.category} index={index} />
        </div>
    );
}

export default function Game() {
    const [state, dispatch] = useTracked();

    useEffect(() => {
        const canvas = document.getElementById("pattern_canvas");
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const ctx = canvas.getContext("2d");
        ctx.globalAlpha = 0.1;
        let img = new Image();
        let start = 0;
        function animate() {
            requestAnimationFrame(animate)
            const size = 100;
            const gap = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < window.innerWidth / size; i++) {
                for (let j = 0; j < window.innerHeight / size; j++) {
                    ctx.drawImage(
                        img,
                        start + i * (size + gap),
                        start + j * (size + gap),
                        size,
                        size
                    );
                }
            }
            start -= 1;
            if (start < -100) {
                start = 0;
            }
        }
        img.src = state.category === 'chicken' ? "./bg_c.png" : state.category === 'pizza' ? "./bg_p.png" : "./bg_h.png";
        img.onload = requestAnimationFrame(animate)
    }, [state.category]);

    return (
        <div id="Game">
            <div className="balance_area bg_secondary">
                <div className={`balance ${state.balance}`}>
                    <div className="balance_center wrapper">
                        <GetImage category={state.category} index="center" />
                    </div>
                    <div className="balance_arm">
                        <GetImage category={state.category} index="arm" />
                        <div className="balance_left">
                            <GetImage category={state.category} index="left" />
                            <div className="value">
                                <GetImage category={state.category} index={1} />
                                &nbsp; = {state.equation.left.input}
                            </div>
                        </div>
                        <div className="balance_right">
                            <GetImage category={state.category} index="right" />
                            <div className="value">
                                <GetImage category={state.category} index={1} />
                                &nbsp; = {state.equation.right}
                            </div>
                        </div>
                    </div>
                </div>
                <canvas id="pattern_canvas" className="bg_patterned"></canvas>
            </div>
            <div className="palette">
                <PaletteItem index={1} />
                <PaletteItem index={5} />
                <PaletteItem index={10} />
                <PaletteItem index={50} />
                <PaletteItem index={100} />
            </div>
            {state.selected.isActive ? (
                <div id="selected">
                    <GetImage
                        category={state.category}
                        index={state.selected.index}
                    />
                </div>
            ) : undefined}
        </div>
    );
}
