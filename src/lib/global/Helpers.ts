import { ALPHA, BOARD_HEIGHT, BOARD_WIDTH } from './Constants';
import type { AxialCoords, SquareCoords } from './Types';

export const convertAxialToSquare = (axialCoord: AxialCoords): SquareCoords => {
	const [q, r, s] = [axialCoord.q, axialCoord.r, -(axialCoord.q + axialCoord.r)];
	return {
		x: ALPHA * (q - r / 2 - s / 2) + BOARD_WIDTH / 2,
		y: ALPHA * ((Math.sqrt(3) / 2) * (r - s)) + BOARD_HEIGHT / 2,
	};
};

export const calculateEdgeRotation = (axialCoord: AxialCoords): number => {
	const { q, r } = axialCoord;
	const [wq, wr] = [q % 1 == 0, r % 1 == 0];

	if (!wq && wr) {
		return -Math.PI / 3; // Upslope
	} else if (wq && !wr) {
		return 0; // Flat
	} else if (!wq && !wr) {
		return Math.PI / 3; // Downslope
	}

	throw Error('Edge coordinates invalid');
};
