export class Controller {
    #view;
    #model;

    constructor(somethingLikeView, somethingLikeModel) {
        this.#view = somethingLikeView;
        this.#model = somethingLikeModel;
    }

    init() {
        const dto = {
            status: this.#model.getStatus(), // Используем метод getStatus() вместо прямого доступа
        }
        this.#view.render(dto) // Передаем dto в render
    }
}