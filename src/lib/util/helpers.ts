import { ADJACENT_CORNER_TRANSFORMATIONS, CORNER_AXIAL_COORDS } from './constants';
import type { Position, SquareCoords } from './types';

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

export function getAdjacentCornerPositions(pos: Position): Position[] {
	return ADJACENT_CORNER_TRANSFORMATIONS.map(
		(trans): Position => ({
			q: pos.q + trans.q,
			r: pos.r + trans.r,
		})
	).filter((adj) => CORNER_AXIAL_COORDS.some((pos) => JSON.stringify(adj) == JSON.stringify(pos)));
}
