import type { Resource } from '$lib/global/Types';
import type Player from '../Player';
import type Tile from '../Tile';
import type Piece from './Piece';

export default interface CornerPiece extends Piece {
	readonly owner: Player;
	readonly connectedTiles: Tile[];

	collectResources(): Resource[];
}
