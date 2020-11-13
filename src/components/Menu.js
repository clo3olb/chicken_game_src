import GetImage from "./GetImage";
import { useTracked } from "../state";

// Images
import settingIcon from "../img/setting.png";

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
    return (
        <div id="Menu">
            <div className="setting">
                <img src={settingIcon} alt="setting" />
            </div>
            <div className="stages">
                <Stage category="chicken" />
                <Stage category="hamburger" />
                <Stage category="pizza" />
            </div>
        </div>
    );
}
