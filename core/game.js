import {GameStatuses} from "./game-statuses";

export class Game {
    #status = GameStatuses.SETTINGS
    #googlePosition = null

    #NumberUtility //=new ShogunNumberUtility()

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
    /**
     * Sets the Google jump interval (in milliseconds).
     * @param {number} newValue - The new jump interval value (must be a positive number).
     * @throws {TypeError} If the provided value is not a number.
     * @throws {RangeError} If the provided value is not a positive number.
     * @returns {void}
     */
    set googleJumpInterval(newValue) {
        if (typeof newValue !== 'number') {
            throw new TypeError("Argument must be a numbers");
        }
        if (newValue <=0){
            throw new TypeError("Interval must be a numbers");
        }
        this.#settings.googleJumpInterval = newValue;
    }

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error("Game must be in Settings before Start");
        }
        this.#status = GameStatuses.IN_PROGRESS;
          this.#makeGoogleJump()

        setInterval(()=>{
            this.#makeGoogleJump()
        }, this.#settings.googleJumpInterval);

    }
    #makeGoogleJump(){
        const newPosition ={
            x:this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnCount -1),
            y:this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowCount -1 ),
        }
        if(newPosition.x === this.#googlePosition?.x && newPosition.y === this.#googlePosition.y){
            this.#makeGoogleJump()
            return
        }
        this.#googlePosition = newPosition;
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
