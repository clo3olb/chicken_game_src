import "./styles.css";

import Menu from "./components/Menu";
import Equation from "./components/Equation";
import Game from "./components/Game";
import { useTracked } from "./state";

function App() {
    const [state, dispatch] = useTracked();
    //window.addEventListener("contextmenu", (e) => e.preventDefault());
    return (
        <div id="App" className={state.category}>
            <Menu />
            <Equation />
            <Game />
            <div className="bg bg_secondary"></div>
            {state.balance == "equal" ? (
                <div className="slide_page bg_primary slide">정답!</div>
            ) : undefined}
        </div>
    );
}

export default App;
