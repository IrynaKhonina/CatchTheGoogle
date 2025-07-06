
import { EVENTS, GAME_STATES } from "../../core/constants.js";
import { getGameStatus, subscribe } from "../../core/state-manager-server.js";
import { AudioComponent } from "./Audio/Audio.component.js";
import { GridComponent } from "./Grid/Grid.component.js";
import { LoseComponent } from "./Lose/Lose.component.js";
import { ResultPanelComponent } from "./ResultPanel/ResultPanel.component.js";
import { SettingsComponent } from "./Settings/Settings.component.js";
import { StartComponent } from "./Start/Start.component.js";
import { WinComponent } from "./Win/Win.component.js";

export function AppComponent() {
    const localState = { prevGameStatus: null, cleanupFunctions: [] };
    const element = document.createElement("main");

    AudioComponent();

    subscribe((e) => {
        if (e.name === EVENTS.STATUS_CHANGED) {
            render(element, localState);
        }
    });
    render(element, localState);

    return { element };
}

async function render(element, localState) {
    const gameStatus = await getGameStatus();

    if (localState.prevGameStatus === gameStatus) return;
    localState.prevGameStatus = gameStatus;

    element.innerHTML = "";
    clearSubscribers(localState);
    const sectionElement = document.createElement("section");
    sectionElement.classList.add("container");
    const mainElement = document.createElement("div");
    mainElement.classList.add("main-elements");

    element.append(sectionElement);

    switch (gameStatus) {
        case GAME_STATES.SETTINGS: {
            const settingsComponent = SettingsComponent();
            const startComponent = StartComponent();
            sectionElement.append(settingsComponent.element);
            mainElement.append(startComponent.element);
            break;
        }

        case GAME_STATES.IN_PROGRESS: {
            const settingsComponent = SettingsComponent();
            const resultPanelComponent = ResultPanelComponent();
            const gridComponent = GridComponent();
            addCleanupToLocalState(localState, gridComponent.cleanup, settingsComponent.cleanup);
            sectionElement.append(settingsComponent.element);
            mainElement.append(resultPanelComponent.element, gridComponent.element);
            break;
        }

        case GAME_STATES.LOSE: {
            const loseComponent = LoseComponent();
            addCleanupToLocalState(localState, loseComponent.cleanup);
            mainElement.append(loseComponent.element);
            break;
        }

        case GAME_STATES.WIN: {
            const winComponent = WinComponent();
            addCleanupToLocalState(localState, winComponent.cleanup);
            mainElement.append(winComponent.element);
            break;
        }
        default:
            throw new Error("not implemented");
    }

    sectionElement.append(mainElement);
}

function clearSubscribers(localState) {
    localState.cleanupFunctions.forEach((cleanup) => cleanup());
    localState.cleanupFunctions = [];
}

function addCleanupToLocalState(localState, ...cleanups) {
    localState.cleanupFunctions.push(...cleanups);
}