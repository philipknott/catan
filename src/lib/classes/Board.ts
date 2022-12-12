import { AXIAL_POSITIONS } from '../global/Constants';
import { Resource } from '../global/Types';
import Tile from './Tile';

export default class Board {
	private _tiles: Tile[];

	constructor() {
		this._tiles = this.generateTiles();
	}

	private generateTiles(): Tile[] {
		const resources = [
			Resource.Brick,
			Resource.Desert,
			Resource.Grain,
			Resource.Lumber,
			Resource.Ore,
			Resource.Wool
		];
		const getRandomResource = (): Resource =>
			resources[Math.floor(resources.length * Math.random())];

		const tiles: Tile[] = [];
		for (const [q, r] of AXIAL_POSITIONS) {
			const tempTile = new Tile(getRandomResource(), Math.floor(12 * Math.random()) + 1, q, r);
			tiles.push(tempTile);
		}

		return tiles;
	}

	get tiles(): Tile[] {
		return this._tiles;
	}
}
