import type { Color } from '$lib/global/Types';
import type Player from '../Player';

export default abstract class Piece {
	readonly owner: Player;

	constructor(owner: Player) {
		this.owner = owner;
	}

	get color(): Color {
		return this.owner.color;
	}
}
