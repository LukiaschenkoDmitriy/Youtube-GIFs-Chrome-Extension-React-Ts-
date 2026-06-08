import {createElement} from "react";
import {createRoot} from "react-dom/client";

import App from "@PopUp/App";

const app = document.getElementById("popup-react");

if (app) {
    const root = createRoot(app);
    root.render(createElement(App))
}