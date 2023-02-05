/* eslint-disable prefer-const */
import { expect, it } from 'vitest';
import { Color, PieceType } from './enums';
import {
	getAdjacentCornerPieces,
	getAdjacentCornerPositions,
	getAdjacentEdgePieces,
	getAdjacentEdgePositions,
	isCornerPos,
	isEdgePos,
} from './helpers';
import type { Piece } from './types';

/**
 * Converts array to a string that can be directly compared to another string.
 * Useful for comparing arrays.
 * @param arr
 * @returns
 */
const s = <T>(arr: T[]): string => JSON.stringify(arr.map((e) => JSON.stringify(e)).sort());

it('isCornerPos', () => {
	expect(isCornerPos({ q: -2, r: -2 })).true;
	expect(isCornerPos({ q: 0, r: -3 })).false;
});

it('isEdgePos', () => {
	expect(isEdgePos({ q: 0, r: -3 })).true;
	expect(isEdgePos({ q: -2, r: -2 })).false;
});

it('getAdjacentCornerPositions (corners)', () => {
	let res = getAdjacentCornerPositions({ q: -2, r: -2 });
	let sol = [
		{ q: -4, r: -4 },
		{ q: -4, r: 2 },
		{ q: 2, r: -4 },
	];
	expect(s(res)).toBe(s(sol));

	res = getAdjacentCornerPositions({ q: -16, r: 8 });
	sol = [
		{ q: -14, r: 10 },
		{ q: -14, r: 4 },
	];
	expect(s(res)).toBe(s(sol));
});

it('getAdjacentCornerPositions (edges)', () => {
	let res = getAdjacentCornerPositions({ q: -6, r: 3 });
	let sol = [
		{ q: -8, r: 4 },
		{ q: -4, r: 2 },
	];
	expect(s(res)).toBe(s(sol));
});

it('getAdjacentEdgePositions (edges)', () => {
	let res = getAdjacentEdgePositions({ q: -6, r: 3 });
	let sol = [
		{ q: -9, r: 3 },
		{ q: -9, r: 6 },
		{ q: -3, r: 0 },
		{ q: -3, r: 3 },
	];
	expect(s(res)).toBe(s(sol));

	res = getAdjacentEdgePositions({ q: -15, r: 3 });
	sol = [
		{ q: -15, r: 0 },
		{ q: -12, r: 3 },
		{ q: -15, r: 6 },
	];
	expect(s(res)).toBe(s(sol));

	res = getAdjacentEdgePositions({ q: -15, r: 15 });
	sol = [
		{ q: -15, r: 12 },
		{ q: -12, r: 15 },
	];
	expect(s(res)).toBe(s(sol));
});

it('getAdjacentEdgePositions (corners)', () => {
	let res = getAdjacentEdgePositions({ q: -8, r: 4 });
	let sol = [
		{ q: -9, r: 3 },
		{ q: -9, r: 6 },
		{ q: -6, r: 3 },
	];
	expect(s(res)).toBe(s(sol));

	res = getAdjacentEdgePositions({ q: -16, r: 2 });
	sol = [
		{ q: -15, r: 3 },
		{ q: -15, r: 0 },
	];
	expect(s(res)).toBe(s(sol));
});

it('getAdjacentCornerPieces', () => {
	const pieces = new Map<string, Piece>();

	let res = getAdjacentCornerPieces(pieces, { q: -4, r: -4 });
	let sol: Piece[] = [];
	expect(s(res)).toBe(s(sol));

	res = getAdjacentCornerPieces(pieces, { q: -3, r: -3 });
	expect(s(res)).toBe(s(sol));

	pieces.set(JSON.stringify({ q: -2, r: -2 }), { color: Color.White, type: PieceType.Settlement });
	sol = [{ color: Color.White, type: PieceType.Settlement }];

	res = getAdjacentCornerPieces(pieces, { q: -4, r: -4 });
	expect(s(res)).toBe(s(sol));

	res = getAdjacentCornerPieces(pieces, { q: -3, r: -3 });
	expect(s(res)).toBe(s(sol));
});

it('getAdjacentEdgePieces', () => {
	const pieces = new Map<string, Piece>();

	let res = getAdjacentEdgePieces(pieces, { q: -4, r: -4 });
	let sol: Piece[] = [];
	expect(s(res)).toBe(s(sol));

	res = getAdjacentEdgePieces(pieces, { q: -3, r: -3 });
	expect(s(res)).toBe(s(sol));

	pieces.set(JSON.stringify({ q: -3, r: -6 }), { color: Color.White, type: PieceType.Road });
	sol = [{ color: Color.White, type: PieceType.Road }];

	res = getAdjacentEdgePieces(pieces, { q: -4, r: -4 });
	expect(s(res)).toBe(s(sol));

	res = getAdjacentEdgePieces(pieces, { q: -3, r: -3 });
	expect(s(res)).toBe(s(sol));
});
