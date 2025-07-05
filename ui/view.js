import {GameStatuses} from "../core/game-statuses.js";

export class View {
    render(dto) {

        const rootElement = document.getElementById('root');

        rootElement.innerHTML =""
        rootElement.append('status:  ' + dto.status );

        if (dto.status === GameStatuses.SETTINGS) {
            const button = document.createElement('button');
            button.append('START GAME');

            button.onclick = () => {
                this.onstart?.();
            };
            rootElement.append(button);
        }
    }
}