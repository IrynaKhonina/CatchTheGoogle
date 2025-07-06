// export class Controller {
//     #view;
//     #model;
//
//     constructor(somethingLikeView, somethingLikeModel) {
//         this.#view = somethingLikeView;
//         this.#model = somethingLikeModel;
//
//         this.#model.subscribe(() => {
//             this.#render()
//         })
//         this.#model.subscribe(() => {
//            console.log('STATE OF GAME GHANGED')
//         })
//
//         this.#view.onstart = () => {
//             this.#model.start();
//
//         }
//     }
//
//     init() {
//         this.#render()
//     }
//
//     #render() {
//         const dto = {
//             status: this.#model.getStatus(), // Используем метод getStatus() вместо прямого доступа
//         }
//         this.#view.render(dto) // Передаем dto в render
//     }
// }