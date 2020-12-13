import GetImage from "./GetImage";
import { useTracked } from "../state";

// Images
import settingIcon from "../img/setting.png";
import { useEffect } from "react";

function Stage({ category }) {
    const [state, dispatch] = useTracked();
    function handleClick(e) {
        dispatch({ type: "SET_CATEGORY", category: category });
    }

    return (
        <div className="stage" onClick={handleClick}>
            <GetImage category={category} index={1} />
        </div>
    );
}


export default function Menu() {
    const [state, dispatch] = useTracked();
    useEffect(() => {
        if (!state.loaded) {
            dispatch({ type: "SET_CATEGORY", category: localStorage.getItem('category') });
            dispatch({ type: 'LOADED' });
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('category', state.category)
    }, [state.category])
    function handleReset() {
        dispatch({ type: "RESET_EQUATION" });
    }
    return (
        <div id="Menu">
            <div className="reset" onClick={handleReset}>
                <GetImage category='reset' index={1} />
            </div>
            <div className="stages">
                <Stage category="chicken" />
                <Stage category="hamburger" />
                <Stage category="pizza" />
            </div>
        </div>
    );
}
