import type { Color, CornerPieceType, EdgePieceType, Resource } from './enums';

export type AxialCoords = {
	q: number;
	r: number;
};

export type SquareCoords = {
	x: number;
	y: number;
};

export type Tile = {
	resource: Resource;
	value: number | null;
};

export type Piece = {
	color: Color;
};

export type EdgePiece = Piece & {
	type: EdgePieceType;
};

export type CornerPiece = Piece & {
	type: CornerPieceType;
};
