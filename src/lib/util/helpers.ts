import { CityMove, PieceMove, RoadMove, SettlementMove, type Move } from '$lib/classes/Move';
import {
	ADJACENT_CORNER_TRANSFORMATIONS,
	ADJACENT_EDGE_TRANSFORMATIONS,
	ADJACENT_HALFSTEP_TRANSFORMATIONS,
	CORNER_AXIAL_COORDS,
	EDGE_AXIAL_COORDS,
	HEX_AXIAL_COORDS,
} from './constants';
import { Color, PieceType, Resource } from './enums';
import type { Hex, Piece, Position, SquareCoords } from './types';

export function convertAxialToSquare(ac: Position): SquareCoords {
	const q = ac.q / 6;
	const r = ac.r / 6;
	const s = -q - r;

	return {
		x: 12.5 * (q - r / 2 - s / 2) + 50,
		y: 10 * (r - s) + 50,
	};
}

export function calculateEdgeRotation(ac: Position): number {
	const q = ac.q / 6;
	const r = ac.r / 6;

	const [wq, wr] = [q % 1 == 0, r % 1 == 0];

	if (!wq && wr) {
		return -Math.PI / 3; // Upslope
	} else if (wq && !wr) {
		return 0; // Flat
	} else if (!wq && !wr) {
		return Math.PI / 3; // Downslope
	}

	throw Error('Edge coordinates invalid');
}

export const equals = (a: Position, b: Position) => JSON.stringify(a) == JSON.stringify(b);

export const isCornerPos = (pos: Position) => {
	// Edge positions only have q and r values that are divisible by 3
	// return pos.q % 3 != 0;

	// Check the long way
	return CORNER_AXIAL_COORDS.map((e) => JSON.stringify(e)).includes(JSON.stringify(pos));
};

export const isEdgePos = (pos: Position) => {
	return EDGE_AXIAL_COORDS.map((e) => JSON.stringify(e)).includes(JSON.stringify(pos));
};

/**
 * @param pos Corner or Edge Position
 * @returns List of adjacent corner positions
 */
export const getAdjacentCornerPositions = (pos: Position): Position[] => {
	const transformations = isCornerPos(pos)
		? ADJACENT_CORNER_TRANSFORMATIONS
		: ADJACENT_HALFSTEP_TRANSFORMATIONS;

	const result = transformations
		.map((trans) => ({
			q: pos.q + trans.q,
			r: pos.r + trans.r,
		}))
		.filter((adj) => isCornerPos(adj));

	return result;
};

/**
 * @param pos Corner or Edge Position
 * @returns List of adjacent corner positions
 */
export const getAdjacentEdgePositions = (pos: Position): Position[] => {
	const transformations = isCornerPos(pos)
		? ADJACENT_HALFSTEP_TRANSFORMATIONS
		: ADJACENT_EDGE_TRANSFORMATIONS;

	return transformations
		.map((trans) => ({
			q: pos.q + trans.q,
			r: pos.r + trans.r,
		}))
		.filter((adj) => isEdgePos(adj));
};

export const getAdjacentPositions = (pos: Position): Position[] => {
	const a1 = getAdjacentCornerPositions(pos);
	const a2 = getAdjacentEdgePositions(pos);
	return a1.concat(a2);
};

export const initHexes = (): Map<string, Hex> => {
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
		Resource.Desert,
	];
	const values = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

	const chooseResource = (): Resource => {
		return resources.splice(Math.floor(resources.length * Math.random()), 1)[0];
	};
	const chooseValue = (): number => {
		return values.splice(Math.floor(values.length * Math.random()), 1)[0];
	};

	// Create hexes
	const hexes = new Map<string, Hex>();
	for (const pos of HEX_AXIAL_COORDS) {
		const resource = chooseResource();
		const value = resource != Resource.Desert ? chooseValue() : undefined;
		hexes.set(JSON.stringify(pos), { resource, value });
	}

	return hexes;
};

export const getAdjacentCornerPieces = (pieces: Map<string, Piece>, pos: Position): Piece[] => {
	const result: Piece[] = [];
	const adjPositions = getAdjacentCornerPositions(pos);
	for (const adjPos of adjPositions) {
		const elementInAdjPos: Piece | undefined = pieces.get(JSON.stringify(adjPos));
		if (elementInAdjPos) {
			result.push(elementInAdjPos);
		}
	}
	return result;
};

export const getAdjacentEdgePieces = (pieces: Map<string, Piece>, pos: Position) => {
	const result: Piece[] = [];
	const adjPositions = getAdjacentEdgePositions(pos);
	for (const adjPos of adjPositions) {
		const elementInAdjPos: Piece | undefined = pieces.get(JSON.stringify(adjPos));
		if (elementInAdjPos) {
			result.push(elementInAdjPos);
		}
	}
	return result;
};

export const getAdjacentPieces = (pieces: Map<string, Piece>, pos: Position) => {
	const a1 = getAdjacentCornerPieces(pieces, pos);
	const a2 = getAdjacentEdgePieces(pieces, pos);
	return a1.concat(a2);
};

export const calculateMoves = (pieces: Map<string, Piece>, currentColor: Color): Move[] => {
	console.log('updating moves');
	const moves = [];

	/*
	Iterate through each possible position, figure out if a piece can be placed there.

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

	// Roads
	for (const edgePos of EDGE_AXIAL_COORDS) {
		// Check vacancy
		if (pieces.has(JSON.stringify(edgePos))) {
			continue;
		}

		// Check color of adjacent pieces
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (getAdjacentPieces(pieces, edgePos).every((piece) => piece!.color != currentColor)) {
			continue;
		}

		// Add move
		console.log(`road move added: ${JSON.stringify(edgePos)}`);
		moves.push(new RoadMove(currentColor, edgePos));
	}

	// Settlements and cities
	for (const cornerPos of CORNER_AXIAL_COORDS) {
		// Check vacancy
		const piece = pieces.get(JSON.stringify(cornerPos));

		if (!piece) {
			/* Settlement Move */

			// Check color of connected roads
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			if (getAdjacentEdgePieces(pieces, cornerPos).every((edge) => edge!.color != currentColor)) {
				continue;
			}

			// Check nearby settlements
			if (getAdjacentCornerPieces(pieces, cornerPos).length > 0) {
				continue;
			}

			// Add settlement move
			console.log(`settlement move added: ${JSON.stringify(cornerPos)}`);
			moves.push(new SettlementMove(currentColor, cornerPos));
			continue;
		}

		/* City Move */

		// Check color and type
		if (piece.color != currentColor || piece.type != PieceType.Settlement) {
			continue;
		}

		// Add city move
		console.log(`city move added: ${JSON.stringify(cornerPos)}`);
		moves.push(new CityMove(currentColor, cornerPos));
	}

	console.log(`moves calculated: ${moves.length}`);

	return moves;
};

export const getUniversalMoves = (color: Color): PieceMove[] => {
	const moves: PieceMove[] = [];
	for (const edgePos of EDGE_AXIAL_COORDS) {
		moves.push(new RoadMove(color, edgePos));
	}
	for (const cornerPos of CORNER_AXIAL_COORDS) {
		moves.push(new SettlementMove(color, cornerPos));
	}
	return moves;
};
