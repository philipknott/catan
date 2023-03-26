import { PieceType } from '$lib/util/enums';
import type { Position } from '$lib/util/types';

export abstract class Move {}

export abstract class PieceMove extends Move {
	abstract readonly type: PieceType;
	readonly pos: Position;

	constructor(pos: Position) {
		super();
		this.pos = pos;
	}
}

export class RoadMove extends PieceMove {
	readonly type = PieceType.Road;
}

export class SettlementMove extends PieceMove {
	readonly type = PieceType.Settlement;
}

export class CityMove extends PieceMove {
	readonly type = PieceType.City;
}
