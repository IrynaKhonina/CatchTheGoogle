
import { EVENTS } from "../../../core/constants.js";
import { getSettings, subscribe } from "../../../core/state-manager-server.js";

export function AudioComponent() {
    const catchAudio = new Audio("./assets/sounds/catch.wav");
    const missAudio = new Audio("./assets/sounds/miss.mp3");

    catchAudio.volume = 0.02;
    missAudio.volume = 0.02;

    subscribe(async (e) => {
        if (e.name === EVENTS.GOOGLE_RAN_AWAY) {
            const { isSoundsOn } = await getSettings();
            if (isSoundsOn) {
                missAudio.currentTime = 0;
                missAudio.play();
            }
        }

        if (e.name === EVENTS.GOOGLE_CAUGHT) {
            const { isSoundsOn } = await getSettings();
            if (isSoundsOn) {
                catchAudio.currentTime = 0;
                catchAudio.play();
            }
        }
    });
}
