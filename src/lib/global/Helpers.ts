import type { AxialCoords, SquareCoords } from './Types';

export const convertAxialToSquare = (axialCoord: AxialCoords): SquareCoords => {
	const [q, r, s] = [axialCoord.q, axialCoord.r, -(axialCoord.q + axialCoord.r)];
	return {
		x: 12.5 * (q - r / 2 - s / 2) + 50,
		y: 10 * (r - s) + 50,
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
