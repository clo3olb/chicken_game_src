//Chicken
import chicken_1 from "../img/chicken_1.png";
import chicken_5 from "../img/chicken_5.png";
import chicken_10 from "../img/chicken_10.png";
import chicken_50 from "../img/chicken_50.png";
import chicken_100 from "../img/chicken_100.png";

import hamburger_1 from "../img/hamburger_1.png";
import hamburger_5 from "../img/hamburger_5.png";
import hamburger_10 from "../img/hamburger_10.png";
import hamburger_50 from "../img/hamburger_50.png";
import hamburger_100 from "../img/hamburger_100.png";

import pizza_1 from "../img/pizza_1.png";
import pizza_5 from "../img/pizza_5.png";
import pizza_10 from "../img/pizza_10.png";
import pizza_50 from "../img/pizza_50.png";
import pizza_100 from "../img/pizza_100.png";

import balance_center_c from "../img/balance_center_c.png";
import balance_arm_c from "../img/balance_arm_c.png";
import balance_left_c from "../img/balance_left_c.png";
import balance_right_c from "../img/balance_right_c.png";

import balance_center_h from "../img/balance_center_h.png";
import balance_arm_h from "../img/balance_arm_h.png";
import balance_left_h from "../img/balance_left_h.png";
import balance_right_h from "../img/balance_right_h.png";

import balance_center_p from "../img/balance_center_p.png";
import balance_arm_p from "../img/balance_arm_p.png";
import balance_left_p from "../img/balance_left_p.png";
import balance_right_p from "../img/balance_right_p.png";

import bg_c from "../img/bg_c.png";
import bg_h from "../img/bg_h.png";
import bg_p from "../img/bg_p.png";

import reset from '../img/reset.png';

export default function GetImage({ category, index }) {
    switch (category) {
        case "chicken":
            switch (index) {
                case 1:
                    return <img src={chicken_1} alt="chicken_1" />;
                case 5:
                    return <img src={chicken_5} alt="chicken_5" />;
                case 10:
                    return <img src={chicken_10} alt="chicken_10" />;
                case 50:
                    return <img src={chicken_50} alt="chicken_50" />;
                case 100:
                    return <img src={chicken_100} alt="chicken_100" />;
                case "center":
                    return (
                        <img src={balance_center_c} alt="balance_center_c" />
                    );
                case "arm":
                    return <img src={balance_arm_c} alt="balance_arm_c" />;
                case "left":
                    return <img src={balance_left_c} alt="balance_left_c" />;
                case "right":
                    return <img src={balance_right_c} alt="balance_right_c" />;
                default:
                    return <></>;
            }
        case "hamburger":
            switch (index) {
                case 1:
                    return <img src={hamburger_1} alt="hamburger_1" />;
                case 5:
                    return <img src={hamburger_5} alt="hamburger_5" />;
                case 10:
                    return <img src={hamburger_10} alt="hamburger_10" />;
                case 50:
                    return <img src={hamburger_50} alt="hamburger_50" />;
                case 100:
                    return <img src={hamburger_100} alt="hamburger_100" />;
                case "center":
                    return (
                        <img src={balance_center_h} alt="balance_center_h" />
                    );
                case "arm":
                    return <img src={balance_arm_h} alt="balance_arm_h" />;
                case "left":
                    return <img src={balance_left_h} alt="balance_left_h" />;
                case "right":
                    return <img src={balance_right_h} alt="balance_right_h" />;
                default:
                    return <></>;
            }
        case "pizza":
            switch (index) {
                case 1:
                    return <img src={pizza_1} alt="pizza_1" />;
                case 5:
                    return <img src={pizza_5} alt="pizza_5" />;
                case 10:
                    return <img src={pizza_10} alt="pizza_10" />;
                case 50:
                    return <img src={pizza_50} alt="pizza_50" />;
                case 100:
                    return <img src={pizza_100} alt="pizza_100" />;
                case "center":
                    return (
                        <img src={balance_center_p} alt="balance_center_p" />
                    );
                case "arm":
                    return <img src={balance_arm_p} alt="balance_arm_p" />;
                case "left":
                    return <img src={balance_left_p} alt="balance_left_p" />;
                case "right":
                    return <img src={balance_right_p} alt="balance_right_p" />;
                default:
                    return <></>;
            }
        case "reset": return <img src={reset} alt="reset" />;
        default:
            return <></>;
    }
}
