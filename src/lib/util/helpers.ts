import {
	ADJACENT_CORNER_TRANSFORMATIONS,
	ADJACENT_EDGE_TRANSFORMATIONS,
	ADJACENT_HALFSTEP_TRANSFORMATIONS,
	CORNER_AXIAL_COORDS,
	COST_CITY,
	COST_ROAD,
	COST_SETTLEMENT,
	EDGE_AXIAL_COORDS,
} from './constants';
import { PieceType } from './enums';
import type { Position, ResourceCollection, SquareCoords } from './types';

/**
 * Converts a position from axial (hexagonal) coordinates to square coordinates
 * @param ac Position (Q and R values)
 * @returns X and Y values
 */
export function convertAxialToSquare(ac: Position): SquareCoords {
	const q = ac.q / 6;
	const r = ac.r / 6;
	const s = -q - r;
	return {
		x: 12.5 * (q - r / 2 - s / 2) + 50,
		y: 10 * (r - s) + 50,
	};
}

/**
 * Calculates the slope of an edge on the game board
 * @param ac Position of an edge
 * @returns The slope (in radians)
 */
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

export const isCornerPos = (pos: Position) => {
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

export const getCost = (type: PieceType): ResourceCollection => {
	switch (type) {
		case PieceType.Road:
			return COST_ROAD;
		case PieceType.Settlement:
			return COST_SETTLEMENT;
		case PieceType.City:
			return COST_CITY;
		default:
			throw new Error('Invalid piece type');
	}
};
