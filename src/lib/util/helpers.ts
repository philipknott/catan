import { Hex } from '$lib/classes/Hex';
import { Position } from '$lib/classes/Position';
import {
	ADJACENT_CORNER_TRANSFORMATIONS,
	ADJACENT_EDGE_TRANSFORMATIONS,
	ADJACENT_HALFSTEP_TRANSFORMATIONS,
	CORNER_AXIAL_COORDS,
	COST_CITY,
	COST_ROAD,
	COST_SETTLEMENT,
	EDGE_AXIAL_COORDS,
	HEX_AXIAL_COORDS,
} from './constants';
import { Color, PieceType, Resource } from './enums';
import type { ResourceCollection, SquareCoords } from './types';

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

export const getColorString = (color: Color): string => {
	switch (color) {
		case Color.White:
			return 'white';
		case Color.Blue:
			return 'blue';
		case Color.Red:
			return 'red';
		case Color.Orange:
			return 'orange';
		default:
			throw new Error('Input color is not valid');
	}
};

export const generateRandomHexLayout = (): Map<string, Hex> => {
	const resources: (Resource | null)[] = [
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
	const values: number[] = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

	// helper that removes a random value from an array and returns it
	const drawOne = <T>(arr: T[]) => arr.splice(Math.floor(arr.length * Math.random()), 1)[0];

	const drawRandomHexState = (): Hex => {
		const resource = drawOne(resources);
		const value = resource != null ? drawOne(values) : undefined;
		return new Hex(resource, value);
	};

	const hexes = new Map<string, Hex>();
	HEX_AXIAL_COORDS.forEach((pos) => {
		const strPos = JSON.stringify(pos);
		const hex = drawRandomHexState();
		hexes.set(strPos, hex);
	});
	return hexes;
};
