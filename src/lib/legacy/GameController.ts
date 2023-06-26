import type { Writable } from 'svelte/store';
import GameState from '$lib/stores/GameState';
import { PieceType, Resource } from '$lib/util/enums';
import type { Position } from '$lib/util/types';
import { CORNER_AXIAL_COORDS, EDGE_AXIAL_COORDS, HEX_AXIAL_COORDS } from '$lib/util/constants';
import { getAdjacentCornerPositions, getAdjacentEdgePositions } from '$lib/util/helpers';
import { CityMove, Move, PieceMove, RoadMove, SettlementMove } from './Move';
import Piece from '../classes/Piece';
import Player from './Player';

export default class GameController {
	private _gameState: Writable<GameState>;

	constructor(gameState: Writable<GameState>) {
		this._gameState = gameState;
	}

	incrementTurn() {
		this._gameState.update((state) => {
			state.turn++;
			return state;
		});

		this.updateAvailableMoves();
	}

	initializePlayers() {
		const players = new Array(4);
		for (let i = 0; i < 4; i++) {
			players[i] = new Player();
		}

		this._gameState.update((state) => {
			state.players = players;
			return state;
		});
	}

	initializeHexes() {
		const resources = [
			Resource.Brick,
			Resource.Brick,
			Resource.Brick,
			Resource.Ore,
			Resource.Ore,
			Resource.Ore,
			Resource.Grain,
			Resource.Grain,
			Resource.Grain,
			Resource.Grain,
			Resource.Wool,
			Resource.Wool,
			Resource.Wool,
			Resource.Wool,
			Resource.Lumber,
			Resource.Lumber,
			Resource.Lumber,
			Resource.Lumber,
			null,
		];
		const values = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

		const chooseResource = (): Resource | null => {
			return resources.splice(Math.floor(resources.length * Math.random()), 1)[0];
		};
		const chooseValue = (): number => {
			return values.splice(Math.floor(values.length * Math.random()), 1)[0];
		};

		// Create hexes
		const hexes = new Map<Position, Hex>();
		for (const pos of HEX_AXIAL_COORDS) {
			const resource = chooseResource();
			const value = resource != null ? chooseValue() : undefined;
			hexes.set(pos, { resource, value });
		}

		this._gameState.update((state) => {
			state.hexes = hexes;
			return state;
		});
	}

	executeMove(move: Move) {
		if (move instanceof PieceMove) {
			this._gameState.update((state) => {
				state.addPiece(move.type, move.pos);
				return state;
			});
		} else if (move instanceof Move) {
			console.log('recognized as regular move');
		} else {
			throw Error('Unrecognized move type');
		}

		this.updateAvailableMoves();
	}

	updateAvailableMoves() {
		this._gameState.update((state) => {
			state.availableMoves = this._calculateAvailableMoves(state);
			return state;
		});
	}

	private _calculateAvailableMoves(state: GameState): Move[] {
		/*
		Logic: Iterate through each possible position, figure out if a piece can be placed there.

		Road: 
			1. Position is vacant
			2. Adjacent to an existing edge piece of same color OR corner piece of same color

		Settlement:
			1. Position is vacant
			2. Adjacent to an edge piece of same color
			3. NOT adjacent to a corner piece of any color

		City:
			1. Position contains piece of same color
			2. Piece is settlement
		*/

		const moves: Move[] = [];

		// Roads
		for (const edgePos of EDGE_AXIAL_COORDS) {
			// Check vacancy
			if (state.hasPiece(edgePos)) {
				continue;
			}

			// Check for at least one adjacent same-colored piece
			const adjPieces = this._getAdjacentPieces(state, edgePos);
			if (adjPieces.every((piece) => piece.color !== state.currentColor)) {
				continue;
			}

			// Add move
			moves.push(new RoadMove(edgePos));
		}

		// Settlements and cities
		for (const cornerPos of CORNER_AXIAL_COORDS) {
			// Check vacancy
			const piece = state.getPiece(cornerPos);

			if (!piece) {
				/* Settlement Move */

				// Check color of connected roads
				const adjEdgePieces = this._getAdjacentEdgePieces(state, cornerPos);
				if (adjEdgePieces.every((edge) => edge.color !== state.currentColor)) {
					continue;
				}

				// Check nearby settlements
				const adjCornerPieces = this._getAdjacentCornerPieces(state, cornerPos);
				if (adjCornerPieces.length > 0) {
					continue;
				}

				// Add settlement move
				moves.push(new SettlementMove(cornerPos));
				continue;
			}

			/* City Move */

			// Check color and type
			if (piece.color !== state.currentColor || piece.type !== PieceType.Settlement) {
				continue;
			}

			// Add city move
			moves.push(new CityMove(cornerPos));
		}

		return moves;
	}

	private _getAdjacentPieces(state: GameState, pos: Position): Piece[] {
		return [
			...this._getAdjacentCornerPieces(state, pos),
			...this._getAdjacentEdgePieces(state, pos),
		];
	}

	private _getAdjacentCornerPieces(state: GameState, pos: Position): Piece[] {
		const result: Piece[] = [];
		const adjPositions = getAdjacentCornerPositions(pos);
		for (const adjPos of adjPositions) {
			const elementInAdjPos: Piece | undefined = state.getPiece(adjPos);
			if (elementInAdjPos) {
				result.push(elementInAdjPos);
			}
		}
		return result;
	}

	private _getAdjacentEdgePieces(state: GameState, pos: Position): Piece[] {
		const result: Piece[] = [];
		const adjPositions = getAdjacentEdgePositions(pos);
		for (const adjPos of adjPositions) {
			const elementInAdjPos: Piece | undefined = state.getPiece(adjPos);
			if (elementInAdjPos) {
				result.push(elementInAdjPos);
			}
		}
		return result;
	}

	// private _calculateAvailableInitialSettlementMoves(state: GameState): PieceMove[] {
	// 	const moves: PieceMove[] = [];
	// 	for (const cornerPos of CORNER_AXIAL_COORDS) {
	// 		if (
	// 			!state.hasPiece(cornerPos) &&
	// 			this._getAdjacentCornerPieces(state, cornerPos).length === 0
	// 		) {
	// 			moves.push(new SettlementMove(cornerPos));
	// 		}
	// 	}
	// 	return moves;
	// }
}
