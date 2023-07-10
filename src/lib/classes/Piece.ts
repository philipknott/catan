import { PieceType, type Color } from '$lib/util/enums';

export class Piece {
	readonly pieceType: PieceType;
	readonly color: Color;

	constructor(pieceType: PieceType, color: Color) {
		this.pieceType = pieceType;
		this.color = color;
	}

	get isEdgePiece() {
		return this.pieceType === PieceType.Road;
	}

	get width() {
		return this.isEdgePiece ? 6 : 5;
	}

	get height() {
		return this.isEdgePiece ? 2 : 5;
	}

	get imgSrc() {
		return `pieces/${this.pieceType}_${this.color}.svg`;
	}

	toString = () => `${this.pieceType}_${this.color}`;

	static createFromString = (str: string) => {
		const [pieceType, color] = str.split('_');
		return new Piece(pieceType as PieceType, color as Color);
	};
}
