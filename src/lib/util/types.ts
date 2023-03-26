import type { Color, PieceType, Resource } from './enums';

export type Position = {
	q: number;
	r: number;
};

export type SquareCoords = {
	x: number;
	y: number;
};

export type Hex = {
	resource: Resource | null; // null for desert
	value: number | undefined;
};

export type Piece = {
	color: Color;
	type: PieceType;
};

export type ResourceCollection = [number, number, number, number, number];
