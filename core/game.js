import {GameStatuses} from "./game-statuses";

export class Game {
    #status = GameStatuses.SETTINGS

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error("Game must be in Settings before Start");
        }
        this.#status = GameStatuses.IN_PROGRESS;
    }
    getStatus() {
        return this.#status;
    }


}
