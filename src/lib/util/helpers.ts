import { Hex, ResourceHex } from '$lib/classes/Hex';
import { HexPosition, Position } from '$lib/classes/Position';
import { CORNER_AXIAL_COORDS, EDGE_AXIAL_COORDS } from './constants';
import { Color, Resource } from './enums';

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
// export const getAdjacentCornerPositions = (pos: Position): Position[] => {
// 	const transformations = isCornerPos(pos)
// 		? ADJACENT_CORNER_TRANSFORMATIONS
// 		: ADJACENT_HALFSTEP_TRANSFORMATIONS;

// 	const result = transformations
// 		.map((trans) => ({
// 			q: pos.q + trans.q,
// 			r: pos.r + trans.r,
// 		}))
// 		.filter((adj) => isCornerPos(adj));

// 	return result;
// };

/**
 * @param pos Corner or Edge Position
 * @returns List of adjacent corner positions
 */
// export const getAdjacentEdgePositions = (pos: Position): Position[] => {
// 	const transformations = isCornerPos(pos)
// 		? ADJACENT_HALFSTEP_TRANSFORMATIONS
// 		: ADJACENT_EDGE_TRANSFORMATIONS;

// 	return transformations
// 		.map((trans) => ({
// 			q: pos.q + trans.q,
// 			r: pos.r + trans.r,
// 		}))
// 		.filter((adj) => isEdgePos(adj));
// };

// export const getAdjacentPositions = (pos: Position): Position[] => {
// 	const a1 = getAdjacentCornerPositions(pos);
// 	const a2 = getAdjacentEdgePositions(pos);
// 	return a1.concat(a2);
// };

// export const getCost = (type: PieceType): ResourceCollection => {
// 	switch (type) {
// 		case PieceType.Road:
// 			return COST_ROAD;
// 		case PieceType.Settlement:
// 			return COST_SETTLEMENT;
// 		case PieceType.City:
// 			return COST_CITY;
// 		default:
// 			throw new Error('Invalid piece type');
// 	}
// };

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

export const generateRandomHexLayout = (): Map<Position, Hex> => {
	/**
	 * 3 Brick
	 * 3 Ore
	 * 4 Grain
	 * 4 Wool
	 * 4 Lumber
	 */
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

	/**
	 * 2x[3, 4, 5, 6, 8, 9, 10, 11]
	 * 1x[2, 12]
	 */
	const values: number[] = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

	// helper that removes a random value from an array and returns it
	const drawOne = <T>(arr: T[]) => arr.splice(Math.floor(arr.length * Math.random()), 1)[0];

	const drawRandomHex = (): Hex => {
		const resource = drawOne(resources);

		if (resource === null) {
			return new Hex();
		}

		const value = drawOne(values);
		return new ResourceHex(resource, value);
	};

	const hexes = new Map<HexPosition, Hex>();
	for (const pos of HexPosition.ALL_POSSIBLE_POSITIONS) {
		hexes.set(pos, drawRandomHex());
	}
	return hexes;
};
