
import { EVENTS } from "../../../core/constants.js";
import {
    getGooglePoints,
    getPlayerPoints,
    subscribe,
    unsubscribe,
} from "../../../core/state-manager-server.js";

export function ResultPanelComponent() {
    const element = document.createElement("div");
    element.classList.add("result-container");

    const handleRender = (e) => {
        if (e.name === EVENTS.SCORES_CHANGED) {
            render(element);
        }
    };

    subscribe(handleRender);

    render(element);

    return {
        element,
        cleanup: () => {
            unsubscribe(handleRender);
        },
    };
}

async function render(element) {
    const googlePoints = await getGooglePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);
    element.innerHTML = `
               <div class="result-block">
                    <span class="result-title">First Player:</span>
                    <span class="result">${player1Points}</span>
                </div>
                          <div class="result-block">
                    <span class="result-title">Second Player:</span>
                    <span class="result">${player2Points}</span>
                </div>
                <div class="result-block">
                    <span class="result-title">Google:</span>
                    <span class="result">${googlePoints}</span>
                </div>
  `;
}
