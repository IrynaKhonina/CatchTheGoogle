import {GameStatuses} from "./game-statuses";

export class Game {
    #status = GameStatuses.SETTINGS
    #googlePosition = null
    #player1Position = null

    #NumberUtility //=new ShogunNumberUtility()

    constructor(somethingSimilarToNumberUtility) {
        this.#NumberUtility = somethingSimilarToNumberUtility
    }

    #settings = {
        gridSize: {
            columnCount: 4,
            rowCount: 4
        },
        googleJumpInterval: 1000
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
        if (newValue <= 0) {
            throw new TypeError("Interval must be a numbers");
        }
        this.#settings.googleJumpInterval = newValue;
    }

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error("Game must be in Settings before Start");
        }
        this.#status = GameStatuses.IN_PROGRESS;

        this.#placePlayer1ToGrid()
        this.#makeGoogleJump()

        setInterval(() => {
            this.#makeGoogleJump()
        }, this.#settings.googleJumpInterval);

    }

    #placePlayer1ToGrid() {
        this.#player1Position = {  // Исправлено: присваиваем позицию в приватное поле
            x: this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnCount - 1),
            y: this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowCount - 1),
        };
    }

    #makeGoogleJump() {
        const newPosition = {
            x: this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnCount - 1),
            y: this.#NumberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowCount - 1),
        }
        if (newPosition.x === this.#googlePosition?.x && newPosition.y === this.#googlePosition.y) {
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

    get player1Position() {
        return this.#player1Position;
    }

    get gridSize() {
        return this.#settings.gridSize;
    }

    set gridSize(value) {
        this.#settings.gridSize = value
    }

    //todo:movedirection to Constsnts
    movePlayer(playerNumber, moveDirection) {
        // Проверяем, что работаем с игроком 1
        if (playerNumber !== 1) return;

        // Если позиция ещё не установлена, ничего не делаем
        if (!this.#player1Position) return;

        // Создаём копию текущей позиции
        const newPosition = {...this.#player1Position};

        // Обрабатываем каждое направление с проверкой границ
        switch (moveDirection.toUpperCase()) {
            case "UP":
                if (newPosition.y > 0) newPosition.y--;
                break;
            case "DOWN":
                if (newPosition.y < this.#settings.gridSize.rowCount - 1) newPosition.y++;
                break;
            case "LEFT":
                if (newPosition.x > 0) newPosition.x--;
                break;
            case "RIGHT":
                if (newPosition.x < this.#settings.gridSize.columnCount - 1) newPosition.x++;
                break;
            default:
                console.warn("Неизвестное направление:", moveDirection);
                return;
        }

        // Обновляем позицию
        this.#player1Position = newPosition;
    }


}
