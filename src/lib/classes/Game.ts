import { Color, type AxialCoords } from '$lib/global/Types';
import Board from './Board';
import City from './pieces/City';
import Road from './pieces/Road';
import Settlement from './pieces/Settlement';
import Player from './Player';

/**
 * Main controller of game. Keeps track of turns and
 * executes commands on behalf of the player onto the board.
 */
export default class Game {
	board = new Board();
	players: Player[] = this.initPlayers();
	turn = 0;

	private initPlayers(): Player[] {
		return Object.values(Color).map((color) => new Player(color));
	}

	get currentPlayer(): Player {
		return this.players[this.turn];
	}

	incrementTurn() {
		this.turn = (this.turn + 1) % this.players.length;
	}

	addRoad(pos: AxialCoords) {
		this.board.placePiece(new Road(this.currentPlayer), pos);
	}

	addSettlement(pos: AxialCoords) {
		this.board.placePiece(new Settlement(this.currentPlayer), pos);
	}

	addCity(pos: AxialCoords) {
		this.board.placePiece(new City(this.currentPlayer), pos);
	}
}
