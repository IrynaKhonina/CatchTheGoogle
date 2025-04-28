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
    const game = new Game(numberUtil)
    // expect(game.googlePosition).toBeNull()
    expect(game.getGooglePosition()).toBeNull()
    await game.start()
    // expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnCount)
    expect(game.getGooglePosition().x).toBeLessThan(game.gridSize.columnCount)
    expect(game.getGooglePosition().x).toBeGreaterThanOrEqual(0)
    expect(game.getGooglePosition().y).toBeLessThan(game.gridSize.rowCount)
    expect(game.getGooglePosition().y).toBeGreaterThanOrEqual(0)
})