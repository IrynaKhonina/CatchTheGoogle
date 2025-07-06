// import {GameStatuses} from "../core/game-statuses.js";
//
// export class View {
//     render(dto) {
//         const rootElement = document.getElementById('root');
//         rootElement.innerHTML = ""
//         rootElement.append('status:  ' + dto.status);
//
//         if (dto.status === GameStatuses.SETTINGS) {
//             const settingsComponent = new SettingsComponent();
//             const settingsElement = settingsComponent.render(dto);
//
//
//             rootElement.append(settingsElement);
//         }
//     }
// }
//
// class SettingsComponent {
//     render(dto) {
//
//         const container = document.createElement('div');
//         container.classList.add("top-items");
//
//         const button = document.createElement('button');
//         button.append('START GAME');
//
//         button.onclick = () => {
//             this.onstart?.();
//         };
//         container.append(button);
//         return button;
//     }
// }
//
// class