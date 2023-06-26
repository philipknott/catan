import { ITEM_COSTS } from '$lib/util/constants';
import { PieceType, Resource } from '$lib/util/enums';
import type { ResourceCollection } from '$lib/util/types';

export default class Player {
	private _hand: ResourceCollection;

	constructor() {
		this._hand = [0, 0, 0, 0, 0];
	}

	giveResource(resource: Resource, n?: number) {
		this._hand[resource] += n ?? 1;
	}

	giveResources(resources: ResourceCollection) {
		resources.forEach((n, r) => (this._hand[r] += n));
	}

	purchase(item: PieceType) {
		const cost = ITEM_COSTS[item];
		this._discard(cost);
	}

	canAffordItem(item: PieceType) {
		return this._canAfford(ITEM_COSTS[item]);
	}

	private _canAfford(cost: ResourceCollection): boolean {
		return cost.every((n, r) => this._hand[r] >= n);
	}

	private _discard(cost: ResourceCollection) {
		cost.forEach((n, r) => (this._hand[r] -= n));
	}

	get hand(): number[] {
		return this._hand;
	}
}
