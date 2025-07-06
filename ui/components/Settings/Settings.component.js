
import { EVENTS, GAME_STATES } from "../../../core/constants.js";

import {
    getGameStatus,
    getSettings,
    setGrid,
    setPointsToLose,
    setPointsToWin,
    subscribe,
    toggleSound,
    unsubscribe,
} from "../../../core/state-manager-server.js";

export function SettingsComponent() {
    const element = document.createElement("div");
    element.classList.add("top-items");
    const observer = (e) => {
        if (e.name === EVENTS.SETTINGS_CHANGED || e.name === EVENTS.STATUS_CHANGED) {
            render(element);
        }
    };
    subscribe(observer);
    render(element);

    return {
        element,
        cleanup: () => {
            unsubscribe(observer);
            element.querySelector("#gridSelect").removeEventListener("change", setGrid);
            element.querySelector("#winSelect").removeEventListener("change", setPointsToWin);
            element.querySelector("#loseSelect").removeEventListener("change", setPointsToLose);
            element.querySelector("#toggleBtn").removeEventListener("click", toggleSound);
        },
    };
}
async function render(element) {
    const { isSoundsOn, pointsToWin, pointsToLose, gridSize } = await getSettings();
    const status = await getGameStatus();
    element.innerHTML = `
                  <div class="line">
                <label for="01">Grid size</label>
                <select name="select" id="gridSelect">
                    <option value="4x4">4x4</option>
                    <option value="5x5">5x5</option>
                    <option value="7x7">7x7</option>
                    <option value="8x8">8x8</option>
                </select>
            </div>
            <div class="line">
                <label for="02">Points to win</label>
                <select name="select" id="winSelect">
                    <option value="20">20 pts</option>
                    <option value="40">40 pts</option>
                    <option value="50">50 pts</option>
                    <option value="60">60 pts</option>
                    <option value="80">80 pts</option>
                </select>
            </div>
            <div class="line">
                <label for="03">Points to lose</label>
                <select name="select" id="loseSelect">
                    <option value="5">5 pts</option>
                    <option value="10">10 pts</option>
                    <option value="15">15 pts</option>
                    <option value="20">20 pts</option>
                    <option value="25">25 pts</option>
                </select>
            </div>
            <div class="switch-button">
    <label>Sound on</label>
    <button id="toggleBtn" class="toggle">
      <span class="icon-slider"></span>
    </button>
  </div>
      `;

    const selectGrid = element.querySelector("#gridSelect");
    const selectWin = element.querySelector("#winSelect");
    const selectLose = element.querySelector("#loseSelect");
    const selectToggle = element.querySelector("#toggleBtn");

    if (status === GAME_STATES.IN_PROGRESS) {
        selectGrid.disabled = true;
        selectWin.disabled = true;
        selectLose.disabled = true;
    }

    const optionGrid = selectGrid.querySelector(
        `option[value="${gridSize.rowsCount}x${gridSize.columnCount}"]`
    );
    optionGrid.selected = true;

    const optionWin = selectWin.querySelector(`option[value="${pointsToWin}"]`);

    optionWin.selected = true;

    const optionLose = selectLose.querySelector(`option[value="${pointsToLose}"]`);

    optionLose.selected = true;

    if (isSoundsOn) {
        selectToggle.classList.add("on");
    }

    selectGrid.addEventListener("change", setGrid);
    selectWin.addEventListener("change", setPointsToWin);
    selectLose.addEventListener("change", setPointsToLose);
    selectToggle.addEventListener("click", toggleSound);
}
