
import { start } from "../../../core/state-manager-server.js";

export function StartComponent() {
    const element = document.createElement("button");
    element.classList.add("button");
    element.classList.add("main-button");
    element.append("START GAME");
    render(element);

    return { element };
}

async function render(element) {
    element.addEventListener("click", start);
}
