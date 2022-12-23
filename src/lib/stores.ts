import { writable } from 'svelte/store';
import type { AxialCoords, CornerPiece, EdgePiece, Tile } from '$lib/util/types';
import { Color } from '$lib/util/enums';

export const turn = Color.Blue;

export const tiles = writable(new Map<AxialCoords, Tile>());
export const edges = writable(new Map<AxialCoords, EdgePiece | null>());
export const corners = writable(new Map<AxialCoords, CornerPiece | null>());
