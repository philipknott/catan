import type { Color } from '$lib/global/Types';
import type Player from '../Player';

export default interface Piece {
	readonly owner: Player;

	get color(): Color;
}
