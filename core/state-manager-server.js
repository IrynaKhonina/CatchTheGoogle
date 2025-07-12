import { EVENTS, GAME_STATES, MOVING_DIRECTIONS } from "./constants.js";

const stateManager = (function () {
  const state = {
    gameState: GAME_STATES.SETTINGS,
    settings: {
      /**
       * in milliseconds
       */
      googleJumpInterval: 3000,
      gridSize: {
        rowsCount: 4,
        columnCount: 4,
      },
      pointsToLose: 5,
      pointsToWin: 20,
      isSoundsOn: false,
    },
    positions: {
      google: {
        x: 0,
        y: 0,
      },
      playersPositions: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
    },
    points: {
      google: 0,
      players: [0, 0],
    },
  };

  function generateIntegerNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function jumpGoogleToNewPosition() {
    const newPosition = { ...state.positions.google };
    do {
      newPosition.x = generateIntegerNumber(0, state.settings.gridSize.columnCount - 1);
      newPosition.y = generateIntegerNumber(0, state.settings.gridSize.rowsCount - 1);

      var isNewPositionMatchWithCurrentGooglePosition =
        newPosition.x === state.positions.google.x && newPosition.y === state.positions.google.y;

      var isNewPositionMatchWithPlayersPositions = checkPlayersPositions(newPosition);
    } while (isNewPositionMatchWithCurrentGooglePosition || isNewPositionMatchWithPlayersPositions);

    state.positions.google = newPosition;
  }

  // variable for observer
  let observers = [];

  function notifyObservers(name, payload = {}) {
    const event = {
      name,
      payload,
    };
    observers.forEach((observer) => {
      try {
        observer(event);
      } catch (err) {
        console.error(err);
      }
    });
  }

  let googleJumpInterval;

  // catching google
  function catchGoogle(playerIndex) {
    state.points.players[playerIndex]++;
    notifyObservers(EVENTS.SCORES_CHANGED);
    notifyObservers(EVENTS.GOOGLE_CAUGHT);
    if (state.points.players[playerIndex] === state.settings.pointsToWin) {
      state.gameState = GAME_STATES.WIN;
      clearInterval(googleJumpInterval);
      notifyObservers(EVENTS.STATUS_CHANGED);
    } else {
      const prevPosition = { ...state.positions.google };
      jumpGoogleToNewPosition();
      notifyObservers(EVENTS.GOOGLE_JUMPED, {
        prevPosition,
        newPosition: { ...state.positions.google },
      });
    }
  }

  // validatorPlayerNumber

  function validatePlayerNumberAndGetPlayerIndex(playerNumber) {
    const playerIndex = playerNumber - 1;

    if (playerIndex < 0 || playerIndex > state.points.players.length - 1) {
      throw new Error("Incorrect player number");
    }
    return playerIndex;
  }

  // VALIDATORS

  function checkPlayersPositions(position) {
    var isNewPositionMatchWithPlayersPositions = false;
    const playersPositions = state.positions.playersPositions;
    for (let i = 0; i < playersPositions.length; i++) {
      if (playersPositions[i].x === position.x && playersPositions[i].y === position.y) {
        isNewPositionMatchWithPlayersPositions = true;
      }
    }
    return isNewPositionMatchWithPlayersPositions;
  }

  function checkValidRange(position) {
    if (position.x < 0 || position.x > state.settings.gridSize.rowsCount - 1) return false;
    if (position.y < 0 || position.y > state.settings.gridSize.columnCount - 1) return false;

    return true;
  }

  function checkGooglePosition(position) {
    if (position.x === state.positions.google.x && position.y === state.positions.google.y)
      return true;
    return false;
  }

  return {
    async getSettings() {
      return { ...state.settings };
    },
    async getGooglePoints() {
      return state.points.google;
    },
    /**
     * Возвращает количество очков для указанного игрока.
     * @param {number} playerNumber - Одно-based индекс игрока (1 для первого игрока, 2 для второго и т.д.).
     * @returns {Promise<number>} Промис, который резолвится количеством очков игрока.
     * @throws {Error} Если номер игрока некорректен.
     */
    async getPlayerPoints(playerNumber) {
      const playerIndex = validatePlayerNumberAndGetPlayerIndex(playerNumber);
      return state.points.players[playerIndex];
    },
    async getGridSize() {
      return { ...state.settings.gridSize };
    },
    async getGooglePosition() {
      return { ...state.positions.google };
    },
    async getPlayerPosition(playerNumber) {
      const playerIndex = validatePlayerNumberAndGetPlayerIndex(playerNumber);

      return { ...state.positions.playersPositions[playerIndex] };
    },
    async getGameStatus() {
      return state.gameState;
    },
    async playAgain() {
      state.gameState = GAME_STATES.SETTINGS;
      notifyObservers(EVENTS.STATUS_CHANGED);
    },

    async toggleSound() {
      state.settings.isSoundsOn = !state.settings.isSoundsOn;
      notifyObservers(EVENTS.SETTINGS_CHANGED);
    },
    async setGrid(e) {
      const gridSize = e.target.value;

      const rowsCount = gridSize.split("x")[0];
      const columnCount = gridSize.split("x")[1];
      state.settings.gridSize = {
        rowsCount: Number(rowsCount),
        columnCount: Number(columnCount),
      };
      notifyObservers(EVENTS.SETTINGS_CHANGED);
    },
    async setPointsToWin(e) {
      const counts = e.target.value;
      state.settings.pointsToWin = Number(counts);
      notifyObservers(EVENTS.SETTINGS_CHANGED);
    },
    async setPointsToLose(e) {
      const counts = e.target.value;
      state.settings.pointsToLose = Number(counts);
      notifyObservers(EVENTS.SETTINGS_CHANGED);
    },
    async start() {
      // defense
      if (state.gameState !== GAME_STATES.SETTINGS)
        throw new Error(
          `incorrect transition from ${state.gameState} to ${GAME_STATES.IN_PROGRESS}`
        );
      //init game

      state.positions.playersPositions[0] = { x: 0, y: 0 };
      state.positions.playersPositions[1] = {
        x: state.settings.gridSize.rowsCount - 1,
        y: state.settings.gridSize.columnCount - 1,
      };
      jumpGoogleToNewPosition();

      state.points.google = 0;
      state.points.players = [0, 0];

      // google starts to jump
      googleJumpInterval = setInterval(() => {
        const prevPosition = { ...state.positions.google };
        jumpGoogleToNewPosition();
        notifyObservers(EVENTS.GOOGLE_JUMPED, {
          prevPosition: prevPosition,
          newPosition: { ...state.positions.google },
        });
        notifyObservers(EVENTS.GOOGLE_RAN_AWAY);

        state.points.google++;
        notifyObservers(EVENTS.SCORES_CHANGED);

        if (state.points.google === state.settings.pointsToLose) {
          clearInterval(googleJumpInterval);
          state.gameState = GAME_STATES.LOSE;
          notifyObservers(EVENTS.STATUS_CHANGED);
        }
      }, state.settings.googleJumpInterval);

      // first notify
      state.gameState = GAME_STATES.IN_PROGRESS;
      notifyObservers(EVENTS.STATUS_CHANGED);
    },
    //players moving action
    async movePlayer(playerNumber, direction) {
      if (state.gameState !== GAME_STATES.IN_PROGRESS) {
        console.warn("You can move player, only when game is inprogress");
        return;
      }

      const playerIndex = validatePlayerNumberAndGetPlayerIndex(playerNumber);
      const prevPosition = { ...state.positions.playersPositions[playerIndex] };
      const newPosition = { ...state.positions.playersPositions[playerIndex] };

      switch (direction) {
        case MOVING_DIRECTIONS.UP:
          newPosition.y--;
          break;
        case MOVING_DIRECTIONS.DOWN:
          newPosition.y++;
          break;
        case MOVING_DIRECTIONS.LEFT:
          newPosition.x--;
          break;
        case MOVING_DIRECTIONS.RIGHT:
          newPosition.x++;
          break;
      }

      const isValidRange = checkValidRange(newPosition);

      if (!isValidRange) return;

      const isPlayerPositionSame = checkPlayersPositions(newPosition);

      if (isPlayerPositionSame) return;

      const isGooglePositionSame = checkGooglePosition(newPosition);

      if (isGooglePositionSame) {
        catchGoogle(playerIndex);
      }

      state.positions.playersPositions[playerIndex] = newPosition;

      notifyObservers(EVENTS[`PLAYER${playerNumber}_MOVED`], {
        prevPosition,
        newPosition,
      });
    },
    //observer subscribe
    subscribe(observer) {
      observers.push(observer);
    },
    //observer unsubscribe
    unsubscribe(observer) {
      observers = observers.filter((o) => o !== observer);
    },
  };
})();

export const {
  setPointsToLose,
  setPointsToWin,
  setGrid,
  toggleSound,
  getSettings,
  movePlayer,
  start,
  getGameStatus,
  unsubscribe,
  subscribe,
  getGooglePoints,
  getPlayerPoints,
  getGridSize,
  getPlayerPosition,
  getGooglePosition,
  playAgain,
} = stateManager;
