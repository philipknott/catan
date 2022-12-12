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
			Resource.Brick,
			Resource.Brick,
			Resource.Ore,
			Resource.Ore,
			Resource.Ore,
			Resource.Grain,
			Resource.Grain,
			Resource.Grain,
			Resource.Grain,
			Resource.Wool,
			Resource.Wool,
			Resource.Wool,
			Resource.Wool,
			Resource.Lumber,
			Resource.Lumber,
			Resource.Lumber,
			Resource.Lumber,
			Resource.Desert
		];
		const values = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

		// Create tiles
		const tiles: Tile[] = [];
		const chooseResource = (): Resource => {
			return resources.splice(Math.floor(resources.length * Math.random()), 1)[0];
		};
		for (const [q, r] of AXIAL_POSITIONS) {
			const tempTile = new Tile(chooseResource(), q, r);
			tiles.push(tempTile);
		}

		// Add values
		const chooseValue = (): number => {
			return values.splice(Math.floor(values.length * Math.random()), 1)[0];
		};
		tiles.forEach((tile) => {
			if (tile.resource !== Resource.Desert) {
				tile.value = chooseValue();
			}
		});

		return tiles;
	}

	get tiles(): Tile[] {
		return this._tiles;
	}
}
