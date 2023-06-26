import { Position } from '$lib/classes/Position';
import { ITEM_COSTS } from '$lib/util/constants';
import { PieceType } from '$lib/util/enums';
import type { ResourceCollection } from '$lib/util/types';

export abstract class Move {}

export abstract class PieceMove extends Move {
	abstract readonly type: PieceType;
	abstract readonly cost: ResourceCollection;
	readonly pos: Position;

	constructor(pos: Position) {
		super();
		this.pos = pos;
	}
}

export class RoadMove extends PieceMove {
	readonly type = PieceType.Road;
	readonly cost = ITEM_COSTS[PieceType.Road];
}

export class SettlementMove extends PieceMove {
	readonly type = PieceType.Settlement;
	readonly cost = ITEM_COSTS[PieceType.Settlement];
}

export class CityMove extends PieceMove {
	readonly type = PieceType.City;
	readonly cost = ITEM_COSTS[PieceType.City];
}
