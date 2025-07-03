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
    game.googleJumpInterval = 1 //ms
    await game.start() // jump - web API /browser 10

    for (let i = 0; i < 100; i++) {
        const prevGooglePosition = game.googlePosition;
        await delay(1) // await -> webAPI/browser 10 // after 10 ms: macrotasks: [jump, game.googlePosition;
        const currentGooglePosition = game.getGooglePosition()
        expect(prevGooglePosition).not.toEqual(currentGooglePosition)
    }


})
// промисификация setTimeout
const delay = (ms) => new Promise(res => setTimeout(res, ms))
