
import { getGooglePoints, getPlayerPoints, playAgain } from "../../../core/state-manager-server.js";

export function LoseComponent() {
    const element = document.createElement("div");
    element.classList.add("modal");
    render(element);

    return {
        element,
        cleanup: () => {
            element.querySelector("button").removeEventListener("click", playAgain);
        },
    };
}

async function render(element) {
    const googlePoints = await getGooglePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);
    element.innerHTML = `
   <div class="modal-decoration"><img src="assets/img/icons/lossIcon.svg" alt="icon"></div>
                <div class="modal-elements">
                    <div class="title-modal">You Lose!</div>
                    <div class="text-modal">You'll be lucky next time</div>
                    <div class="modal-result">
                        <div class="result-block">
                            <span class="result-title">Google:</span>
                            <span class="result">${googlePoints}</span>
                        </div>
                        <div class="result-block">
                            <span class="result-title">First Player:</span>
                            <span class="result">${player1Points}</span>
                        </div>
                         <div class="result-block">
                            <span class="result-title">Second Player:</span>
                            <span class="result">${player2Points}</span>
                        </div>
   
                    </div>
                    <button class="button">Play again</button>
                </div>`;
    const btnElement = element.querySelector("button");
    btnElement.addEventListener("click", playAgain);
}
