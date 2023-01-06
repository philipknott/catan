import type { Color, Resource } from './enums';

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
};

export type EdgePiece = Piece;

export type CornerPiece = Piece & {
	isCity: boolean;
};
