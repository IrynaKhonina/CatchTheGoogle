import {Game} from './game'
import {GameStatuses} from "./game-statuses";

describe('game',()=>{
    it('game should be created and return status ', () => {
const game = new Game()
        expect(game.getStatus()).toBe( GameStatuses.SETTINGS)
    });
})


it('game should be created and return status ', async () => {
    const game = new Game()
    await game.start()
    expect(game.getStatus()).toBe( GameStatuses.IN_PROGRESS)
});

