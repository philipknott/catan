import { PieceType, type Color } from '$lib/util/enums';
import type { Position } from '$lib/util/types';

export class Move {
	color: Color;

	constructor(color: Color) {
		this.color = color;
	}
}

export abstract class PieceMove extends Move {
	pos: Position;
	abstract readonly type: PieceType;

	constructor(color: Color, pos: Position) {
		super(color);
		this.pos = pos;
	}
}

export class RoadMove extends PieceMove {
	readonly type = PieceType.Road;
	constructor(color: Color, pos: Position) {
		super(color, pos);
	}
}

export class SettlementMove extends PieceMove {
	readonly type = PieceType.Settlement;
	constructor(color: Color, pos: Position) {
		super(color, pos);
	}
}

export class CityMove extends PieceMove {
	readonly type = PieceType.City;
	constructor(color: Color, pos: Position) {
		super(color, pos);
	}
}
