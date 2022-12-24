import type { AxialCoords, SquareCoords } from './types';

export const convertAxialToSquare = (ac: AxialCoords): SquareCoords => {
	const q = ac.q / 6;
	const r = ac.r / 6;
	const s = -q - r;

	return {
		x: 12.5 * (q - r / 2 - s / 2) + 50,
		y: 10 * (r - s) + 50,
	};
};

export const calculateEdgeRotation = (ac: AxialCoords): number => {
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
};
