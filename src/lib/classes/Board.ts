import { CORNER_AXIAL_COORDS, EDGE_AXIAL_COORDS, TILE_AXIAL_COORDS } from '../global/Constants';
import { Resource, type AxialCoords } from '../global/Types';
import type CornerPiece from './pieces/CornerPiece';
import type EdgePiece from './pieces/EdgePiece';
import Tile from './Tile';

export default class Board {
	readonly tiles: Map<AxialCoords, Tile>;
	edges: Map<AxialCoords, EdgePiece | null>;
	corners: Map<AxialCoords, CornerPiece | null>;

	constructor() {
		this.tiles = this.initializeTiles();
		this.edges = this.initializeEdges();
		this.corners = this.initializeCorners();
	}

	private initializeTiles(): Map<AxialCoords, Tile> {
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
			Resource.Desert,
		];
		const values = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

		const chooseResource = (): Resource => {
			return resources.splice(Math.floor(resources.length * Math.random()), 1)[0];
		};
		const chooseValue = (): number => {
			return values.splice(Math.floor(values.length * Math.random()), 1)[0];
		};

		// Create tiles
		const tiles: Map<AxialCoords, Tile> = new Map<AxialCoords, Tile>();
		for (const pos of TILE_AXIAL_COORDS) {
			const resource = chooseResource();
			const value = resource != Resource.Desert ? chooseValue() : undefined;
			tiles.set(pos, new Tile(resource, value));
		}

		return tiles;
	}

	private initializeEdges(): Map<AxialCoords, EdgePiece | null> {
		const edges = new Map<AxialCoords, EdgePiece | null>();
		EDGE_AXIAL_COORDS.forEach((pos) => edges.set(pos, null));
		return edges;
	}

	private initializeCorners(): Map<AxialCoords, CornerPiece | null> {
		const corners = new Map<AxialCoords, CornerPiece | null>();
		CORNER_AXIAL_COORDS.forEach((pos) => corners.set(pos, null));
		return corners;
	}
}
