import { CORNER_AXIAL_COORDS, EDGE_AXIAL_COORDS, TILE_AXIAL_COORDS } from './util/constants';
import { CornerPieceType, EdgePieceType, Resource } from './util/enums';
import type { AxialCoords, CornerPiece, EdgePiece, Tile } from './util/types';
import { corners, currentColor, edges, tiles, turn } from './stores';
import { get } from 'svelte/store';

export function initGame() {
	turn.set(0);
	tiles.set(initTiles());
	edges.set(initEdges());
	corners.set(initCorners());
}

export function nextTurn() {
	turn.update((turn) => turn + 1);
}

export function setCorner(pos: AxialCoords, type: CornerPieceType) {
	const piece: CornerPiece = {
		color: get(currentColor),
		type,
	};
	corners.update((corners) => corners.set(JSON.stringify(pos), piece));
}

export function getCorner(pos: AxialCoords) {
	return get(corners).get(JSON.stringify(pos));
}

export function setEdge(pos: AxialCoords, type: EdgePieceType) {
	const piece: EdgePiece = {
		color: get(currentColor),
		type,
	};
	edges.update((edges) => edges.set(JSON.stringify(pos), piece));
}

export function getEdge(pos: AxialCoords) {
	return get(edges).get(JSON.stringify(pos));
}

function initTiles(): Map<string, Tile> {
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
	const tiles = new Map<string, Tile>();
	for (const pos of TILE_AXIAL_COORDS) {
		const resource = chooseResource();
		const value = resource != Resource.Desert ? chooseValue() : null;
		tiles.set(JSON.stringify(pos), { resource, value });
	}

	return tiles;
}

function initEdges(): Map<string, EdgePiece | null> {
	const edges = new Map<string, EdgePiece | null>();
	EDGE_AXIAL_COORDS.forEach((pos) => edges.set(JSON.stringify(pos), null));
	return edges;
}

function initCorners(): Map<string, CornerPiece | null> {
	const corners = new Map<string, CornerPiece | null>();
	CORNER_AXIAL_COORDS.forEach((pos) => corners.set(JSON.stringify(pos), null));
	return corners;
}
