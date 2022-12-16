import Board from './Board';
import type Player from './Player';

export default class Game {
	board = new Board();
	players: Player[] = [];
	turn = 0;
}
