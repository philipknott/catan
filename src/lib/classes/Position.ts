import { CORNER_AXIAL_COORDS, EDGE_AXIAL_COORDS, HEX_AXIAL_COORDS } from '$lib/util/constants';

export abstract class Position {
	q: number;
	r: number;

	constructor(q: number, r: number) {
		this.q = q;
		this.r = r;
	}

	toString = (): string => JSON.stringify(this);

	getCoords = () => {
		const q = this.q / 6;
		const r = this.r / 6;
		const s = -q - r;
		return {
			x: 12.5 * (q - r / 2 - s / 2) + 50,
			y: 10 * (r - s) + 50,
		};
	};
}

export class EdgePosition extends Position {
	get rotate() {
		const q = this.q / 6;
		const r = this.r / 6;
		const [wq, wr] = [q % 1 == 0, r % 1 == 0];
		if (!wq && wr) {
			return -Math.PI / 3; // Upslope
		} else if (wq && !wr) {
			return 0; // Flat
		} else if (!wq && !wr) {
			return Math.PI / 3; // Downslope
		}
		throw Error('Edge position invalid - something went wrong');
	}

	static readonly ALL_POSSIBLE_POSITIONS = EDGE_AXIAL_COORDS.map(
		({ q, r }) => new EdgePosition(q, r)
	);
}

export class CornerPosition extends Position {
	static readonly ALL_POSSIBLE_POSITIONS = CORNER_AXIAL_COORDS.map(
		({ q, r }) => new CornerPosition(q, r)
	);
}

export class HexPosition extends Position {
	static readonly ALL_POSSIBLE_POSITIONS = HEX_AXIAL_COORDS.map(
		({ q, r }) => new HexPosition(q, r)
	);
}
