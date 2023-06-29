import type { Color } from '$lib/util/enums';

export abstract class Piece {
	abstract readonly imgSrc: string;
	readonly color: Color;

	constructor(color: Color) {
		this.color = color;
	}
}

export abstract class CornerPiece extends Piece {
	static readonly WIDTH = 5;
	static readonly HEIGHT = 5;
}

export abstract class EdgePiece extends Piece {
	static readonly WIDTH = 6;
	static readonly HEIGHT = 2;
}

export class City extends CornerPiece {
	imgSrc = `pieces/city_${this.color}.svg`;
}
export class Settlement extends CornerPiece {
	imgSrc = `pieces/settlement_${this.color}.svg`;
}
export class Road extends EdgePiece {
	imgSrc = `pieces/road_${this.color}.svg`;
}
