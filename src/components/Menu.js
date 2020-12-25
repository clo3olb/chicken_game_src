import GetImage from "./GetImage";
import { useTracked } from "../state";

// Images
import settingIcon from "../img/setting.png";
import fullscreenIcon from "../img/fullscreen.png";
import { useEffect, useState } from "react";
import Setting from "./Setting";

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
  const [settingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    if (!state.loaded) {
      if (localStorage.getItem("category") == "null" || null) {
        localStorage.clear();
      } else {
        dispatch({
          type: "SET_CATEGORY",
          category: localStorage.getItem("category"),
        });
        dispatch({ type: "LOADED" });
      }
    }
    console.log(state.category, state.equation.limit);

    console.log(document.fullscreenEnabled);
  }, []);

  function handleReset() {
    dispatch({ type: "RESET_EQUATION" });
  }

  function handleSettingsClick() {
    setSettingsOpen((settingsOpen) => !settingsOpen);
  }
  function handleFullscreenClick() {
    const app = document.getElementById("App");
    if (!document.fullscreenElement) {
      app.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  return (
    <div id="Menu">
      <div className="reset" onClick={handleReset}>
        <GetImage category="reset" index={1} />
      </div>
      <div className="settings" onClick={handleSettingsClick}>
        <img src={settingIcon} alt="setting" />
      </div>
      <div className="fullscreen" onClick={handleFullscreenClick}>
        <img src={fullscreenIcon} alt="fullscreen" />
      </div>
      {settingsOpen && <Setting setSettingsOpen={setSettingsOpen} />}
      <div className="stages">
        <Stage category="chicken" />
        <Stage category="hamburger" />
        <Stage category="pizza" />
      </div>
    </div>
  );
}
