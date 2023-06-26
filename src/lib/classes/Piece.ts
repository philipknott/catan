import type { Color, PieceType } from '$lib/util/enums';

export default class Piece {
	readonly color: Color;
	readonly type: PieceType;

	constructor(color: Color, type: PieceType) {
		this.color = color;
		this.type = type;
	}

	toString = () => `${this.color}${this.type}`;
}
