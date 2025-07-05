import {Game} from './game'
import {GameStatuses} from "./game-statuses";
import {ShogunNumberUtility} from "./shogun-number-utility";

describe('game', () => {
    it('game should be created and return status ', () => {
        const numberUtil = new ShogunNumberUtility()
        const game = new Game(numberUtil)
        expect(game.getStatus()).toBe(GameStatuses.SETTINGS)
    });
})


it('game should be created and return status ', async () => {
    const numberUtil = new ShogunNumberUtility()
    const game = new Game(numberUtil)
    await game.start()
    expect(game.getStatus()).toBe(GameStatuses.IN_PROGRESS)
});

it('google should be in the Grid after start', async () => {
    const numberUtil = new ShogunNumberUtility()

    for (let i = 0; i < 1000; i++) {
        const game = new Game(numberUtil)
        // expect(game.googlePosition).toBeNull()
        expect(game.getGooglePosition()).toBeNull()
        await game.start()
        // expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnCount)
        expect(game.getGooglePosition().x).toBeLessThan(game.gridSize.columnCount)
        expect(game.getGooglePosition().x).toBeGreaterThanOrEqual(0)
        expect(game.getGooglePosition().y).toBeLessThan(game.gridSize.rowCount)
        expect(game.getGooglePosition().y).toBeGreaterThanOrEqual(0)
    }


})


it('google should be in the Grid but in position after jump', async () => {
    const numberUtil = new ShogunNumberUtility()
    const game = new Game(numberUtil)


   expect(game.player1Position).toBeNull()


    await game.start() // jump - web API /browser 10

    for (let i = 0; i < 100; i++) {
        const prevGooglePosition = game.googlePosition;
        await delay(1) // await -> webAPI/browser 10 // after 10 ms: macrotasks: [jump, game.googlePosition;
        const currentGooglePosition = game.getGooglePosition()
        expect(prevGooglePosition).not.toEqual(currentGooglePosition)
    }


})
// промисификация setTimeout

it('player should move in correct directions', async () => {

    const fakeNumberUtility = {
        index:0,
        values:[
            3,3,
            0,0
        ],
        getRandomIntegerNumber(from, to) {
            return this.values[this.index++];
        }
    };

    const game = new Game(fakeNumberUtility);
    game.gridSize = {columnCount: 4, rowCount: 4};

    // 1. Проверяем начальное состояние
    expect(game.player1Position).toBeNull();

    // 2. Запускаем игру (игрок должен появиться в (3,3))
    await game.start();
    expect(game.player1Position).toEqual({x: 3, y: 3});

    // 3. Тестируем движения
    game.movePlayer(1, "RIGHT");
    expect(game.player1Position).toEqual({x: 3, y: 3}); // Не должен сдвинуться (уже у правой границы)

    game.movePlayer(1, "DOWN");
    expect(game.player1Position).toEqual({x: 3, y: 3}); // Не должен сдвинуться (уже у нижней границы)

    game.movePlayer(1, "UP");
    expect(game.player1Position).toEqual({x: 3, y: 2});

    game.movePlayer(1, "UP");
    expect(game.player1Position).toEqual({x: 3, y: 1});

    game.movePlayer(1, "LEFT");
    expect(game.player1Position).toEqual({x: 2, y: 1});

    game.movePlayer(1, "UP");
    expect(game.player1Position).toEqual({x: 2, y: 0});

    // Дополнительная проверка движения вниз
    game.movePlayer(1, "DOWN");
    expect(game.player1Position).toEqual({x: 2, y: 1});
});
// промисификация setTimeout
const delay = (ms) => new Promise(res => setTimeout(res, ms))
