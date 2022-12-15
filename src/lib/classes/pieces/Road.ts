import type { Color } from '$lib/global/Types';
import type Player from '../Player';
import type EdgePiece from './EdgePiece';

export default class Road implements EdgePiece {
	readonly owner: Player;

	constructor(owner: Player) {
		this.owner = owner;
	}

	get color(): Color {
		return this.owner.color;
	}
}
