import { derived, writable } from 'svelte/store';
import { CORNER_AXIAL_COORDS, EDGE_AXIAL_COORDS, HEX_AXIAL_COORDS } from './util/constants';
import { Resource, Color } from './util/enums';
import type { CornerPiece, EdgePiece, Hex, Position } from './util/types';

export class Player {
	availableCornerPositions: Position[] = [];
	availableEdgePositions: Position[] = [];
	victoryPoints = 0;
}

// let turn: number;
// let currentColor: Color;

const colors = [Color.White, Color.Orange, Color.Red, Color.Blue];

export const turn = writable<number>();
export const colorToMove = derived(turn, ($turn) => colors[$turn % 4]);

// export let players = new Map<Color, Player>();

// export const testPlayer = writable<Player>();
export let player: Player;

export const hexes = writable(new Map<string, Hex>());
export const cornerPieces = writable(new Map<string, CornerPiece>());
export const edgePieces = writable(new Map<string, EdgePiece>());

// export const hexes = new Map<string, Hex>();
// export const cornerPieces = new Map<string, CornerPiece>();
// export const edgePieces = new Map<string, EdgePiece>();

function init() {
	turn.set(0);
	// initPlayers();

	player = new Player();
	player.availableCornerPositions = CORNER_AXIAL_COORDS;
	player.availableEdgePositions = EDGE_AXIAL_COORDS;

	initHexes();
	cornerPieces.set(new Map<string, CornerPiece>());
	edgePieces.set(new Map<string, EdgePiece>());
}

// function initPlayers() {
// 	players = new Map<Color, Player>();
// 	players.set(Color.White, new Player());
// 	players.set(Color.Orange, new Player());
// 	players.set(Color.Red, new Player());
// 	players.set(Color.Blue, new Player());

// 	for (const player of players.values()) {
// 		player.availableCornerPositions = CORNER_AXIAL_COORDS;
// 		player.availableEdgePositions = EDGE_AXIAL_COORDS;
// 	}
// }

export const initHexes = (): Map<string, Hex> => {
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

	// Create hexes
	const hexes = new Map<string, Hex>();
	for (const pos of HEX_AXIAL_COORDS) {
		const resource = chooseResource();
		const value = resource != Resource.Desert ? chooseValue() : undefined;
		hexes.set(JSON.stringify(pos), { resource, value });
	}

	return hexes;
};
