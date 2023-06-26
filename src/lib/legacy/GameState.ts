import { Hex } from '$lib/classes/Hex';
import { Move, PieceMove } from '$lib/classes/Move';
import Piece from '$lib/classes/Piece';
import Player from '$lib/classes/Player';
import { Color, PieceType } from '$lib/util/enums';
import type { Position } from '$lib/util/types';

export default class GameState {
	private _pieces: Map<string, Piece>; // Key is JSON.stringify(<Position>)
	private _players: Player[];
	private _availableMoves: Move[];
	private _hexes: Map<string, Hex>;
	turn: number;

	constructor() {
		this._pieces = new Map();
		this._players = [];
		this._availableMoves = [];
		this._hexes = new Map();
		this.turn = 0;

		// Debug setup
		this.addPiece(PieceType.Settlement, { q: 2, r: -4 });
	}

	addPiece(type: PieceType, pos: Position) {
		const piece = new Piece(this.currentColor, type);
		this._pieces.set(JSON.stringify(pos), piece);
	}

	getPiece(pos: Position) {
		return this._pieces.get(JSON.stringify(pos));
	}

	hasPiece(pos: Position) {
		return this._pieces.has(JSON.stringify(pos));
	}

	get pieces(): Map<Position, Piece> {
		const entries = Array.from(this._pieces.entries());
		const result = new Map<Position, Piece>();
		for (const [key, value] of entries) {
			result.set(JSON.parse(key), value);
		}
		return result;
	}

	get currentColor(): Color {
		return this.turn % 4;
	}

	get currentPlayer(): Player {
		return this._players[this.currentColor];
	}

	set players(players: Player[]) {
		this._players = players;
	}

	get players(): Player[] {
		return this._players;
	}

	// set initialPlacementModification(value: boolean) {
	// 	this._initialPlacementModification = value;
	// }

	get availableMoves() {
		return this._availableMoves;
	}

	set availableMoves(moves: Move[]) {
		this._availableMoves = moves;
	}

	get availablePieceMoves(): PieceMove[] {
		return this._availableMoves.filter((move) => move instanceof PieceMove) as PieceMove[];
	}

	set hexes(hexes: Map<Position, Hex>) {
		this._hexes.clear();
		const entries = Array.from(hexes.entries());
		for (const [key, value] of entries) {
			this._hexes.set(JSON.stringify(key), value);
		}
	}

	get hexes(): Map<Position, Hex> {
		const entries = Array.from(this._hexes.entries());
		const result = new Map<Position, Hex>();
		for (const [key, value] of entries) {
			result.set(JSON.parse(key), value);
		}
		return result;
	}
}
