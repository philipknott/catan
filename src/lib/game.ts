import { CORNER_AXIAL_COORDS, EDGE_AXIAL_COORDS, TILE_AXIAL_COORDS } from './util/constants';
import { Resource } from './util/enums';
import type { AxialCoords, CornerPiece, EdgePiece, Tile } from './util/types';
import { corners, edges, tiles, turn } from './stores';

export function initGame() {
	turn.set(0);
	tiles.set(initTiles());
	edges.set(initEdges());
	corners.set(initCorners());
}

export function nextTurn() {
	turn.update((turn) => turn + 1);
}

function initTiles(): Map<AxialCoords, Tile> {
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
		const value = resource != Resource.Desert ? chooseValue() : null;
		tiles.set(pos, { resource, value });
	}

	return tiles;
}

function initEdges(): Map<AxialCoords, EdgePiece | null> {
	const edges = new Map<AxialCoords, EdgePiece | null>();
	EDGE_AXIAL_COORDS.forEach((pos) => edges.set(pos, null));
	return edges;
}

function initCorners(): Map<AxialCoords, CornerPiece | null> {
	const corners = new Map<AxialCoords, CornerPiece | null>();
	CORNER_AXIAL_COORDS.forEach((pos) => corners.set(pos, null));
	return corners;
}
