import { SERVER } from "./constants.js";

const stateManager = (function () {
  // subscribe on Server Sent Events
  const eventSource = new EventSource(`${SERVER.BASE_URL}/events`);

  eventSource.addEventListener("message", (eventFromES) => {
    const event = JSON.parse(eventFromES.data);
    notifyObservers(event.name, event.payload);
  });

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

  return {
    async getSettings() {
      return await requestServer("settings");
    },
    async getGooglePoints() {
      return await requestServer("getGooglePoints");
    },
    async getPlayerPoints(playerNumber) {
      return await requestServer(`getPlayerPoints?playerNumber=${playerNumber}`);
    },
    async getGridSize() {
      return await requestServer("getGridSize");
    },
    async getGooglePosition() {
      return await requestServer("getGooglePosition");
    },
    async getPlayerPosition(playerNumber) {
      return await requestServer(`getPlayerPosition?playerNumber=${playerNumber}`);
    },
    async getGameStatus() {
      return await requestServer("getGameStatus");
    },
    async setGrid(e) {
      requestServer(`settings/grid?size=${e.target.value}`);
    },
    async setPointsToWin(e) {
      requestServer(`settings/pointsToWin?counts=${e.target.value}`);
    },
    async setPointsToLose(e) {
      requestServer(`settings/pointsToLose?counts=${e.target.value}`);
    },
    async playAgain() {
      requestServer("playAgain");
    },
    async start() {
      requestServer("start");
    },

    async toggleSound() {
      requestServer("settings/sound");
    },
    //players moving action
    async movePlayer(playerNumber, direction) {
      requestServer(`movePlayer?playerNumber=${playerNumber}&direction=${direction}`);
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
  setPointsToWin,
  setPointsToLose,
  setGrid,
  getSettings,
  toggleSound,
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

async function requestServer(endpoint) {
  const response = await fetch(`${SERVER.BASE_URL}/${endpoint}`);
  const responsePayload = await response.json();
  return responsePayload.data;
}
