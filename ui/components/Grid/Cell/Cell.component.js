import { EVENTS } from "../../../../core/constants.js";
import {
    getGooglePosition,
    getPlayerPosition,
    subscribe,
    unsubscribe,
} from "../../../../core/state-manager-server.js";
import { GoogleComponent } from "../../common/Google/Google.component.js";
import { PlayerComponent } from "../../common/Player/Player.component.js";

export function CellComponent(x, y) {
    const element = document.createElement("td");
    element.classList.add("cell");
    const localState = { renderVersion: 0 };

    const observer = (e) => {
        if ([EVENTS.GOOGLE_JUMPED, EVENTS.PLAYER1_MOVED, EVENTS.PLAYER2_MOVED].includes(e.name)) {
            const {
                newPosition: { x: newX, y: newY },
                prevPosition: { x: prevX, y: prevY },
            } = e.payload;

            if ((x === newX && y === newY) || (x === prevX && y === prevY)) {
                render(x, y, element, localState);
            }
        }
    };

    subscribe(observer);
    render(x, y, element, localState);
    return { element, cleanup: () => unsubscribe(observer) };
}

async function render(x, y, element, localState) {
    localState.renderVersion++;
    const currentRenderVersion = localState.renderVersion;

    element.innerHTML = "";

    const googlePosition = await getGooglePosition();
    const player1Position = await getPlayerPosition(1);
    const player2Position = await getPlayerPosition(2);

    if (currentRenderVersion !== localState.renderVersion) {
        console.warn("New version render");

        return;
    }

    if (googlePosition.x === x && googlePosition.y === y) {
        element.append(GoogleComponent().element);
    }

    if (player1Position.x === x && player1Position.y === y) {
        element.append(PlayerComponent(1).element);
    }

    if (player2Position.x === x && player2Position.y === y) {
        element.append(PlayerComponent(2).element);
    }
}