import {GameStatuses} from "./game-statuses";

export class Game {
    #status = GameStatuses.SETTINGS
    #googlePosition = null
    #NumberUtility

    constructor(somethingSimilarToNumberUtility) {
        this.#NumberUtility = somethingSimilarToNumberUtility
    }

    #settings = {
        gridSize:{
            columnCount:4,
            rowCount:4
        },
        googleJumpInterval:1000
    }

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error("Game must be in Settings before Start");
        }
        this.#status = GameStatuses.IN_PROGRESS;
        this.#googlePosition ={
            x:this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnCount),
            y:this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowCount),
        }

    }

    getStatus() {
        return this.#status;
    }
    getGooglePosition() {
        return this.#googlePosition;
    }
    get gridSize() {
        return this.#settings.gridSize;
    }



}
