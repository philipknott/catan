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
	resource: Resource;
	value: number | undefined;
};

export type Piece = {
	color: Color;
	type: PieceType;
};
