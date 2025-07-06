export function PlayerComponent(playerNumber) {
    const element = document.createElement("img");
    render(element, playerNumber);
    return { element };
}

async function render(element, playerNumber) {
    const formatPlayerNumber = playerNumber > 9 ? `${playerNumber}` : `0${playerNumber}`;
    element.src = `./assets/img/icons/man${formatPlayerNumber}.svg`;
}