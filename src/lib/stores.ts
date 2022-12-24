import { derived, writable } from 'svelte/store';
import type { AxialCoords, CornerPiece, EdgePiece, Tile } from '$lib/util/types';
import { COLOR_ORDER } from './util/constants';

export const turn = writable<number>(undefined);
export const currentColor = derived(turn, ($turn) => COLOR_ORDER[$turn % COLOR_ORDER.length]);

export const tiles = writable<Map<AxialCoords, Tile>>(undefined);
export const edges = writable<Map<AxialCoords, EdgePiece | null>>(undefined);
export const corners = writable<Map<AxialCoords, CornerPiece | null>>(undefined);
