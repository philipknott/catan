import { expect, it } from 'vitest';
import { CornerPosition, EdgePosition } from './Position';

const allEdgePositions = EdgePosition.ALL_POSSIBLE_POSITIONS;
const allCornerPositions = CornerPosition.ALL_POSSIBLE_POSITIONS;

it('EdgePosition | adjacent edge position', () => {
	// edge in middle of board
	let input = allEdgePositions.find((pos) => pos.q == -6 && pos.r == -3);
	let output = [
		allEdgePositions.find((pos) => pos.q == -9 && pos.r == -3),
		allEdgePositions.find((pos) => pos.q == -9 && pos.r == 0),
		allEdgePositions.find((pos) => pos.q == -3 && pos.r == -3),
		allEdgePositions.find((pos) => pos.q == -3 && pos.r == -6),
	];
	expect(input?.getAdjacentEdgePositions(allEdgePositions).sort()).toStrictEqual(output.sort());

	// edge on edge of board
	input = allEdgePositions.find((pos) => pos.q == -15 && pos.r == 3);
	output = [
		allEdgePositions.find((pos) => pos.q == -15 && pos.r == 0),
		allEdgePositions.find((pos) => pos.q == -12 && pos.r == 3),
		allEdgePositions.find((pos) => pos.q == -15 && pos.r == 6),
	];
	expect(input?.getAdjacentEdgePositions(allEdgePositions).sort()).toStrictEqual(output.sort());
});

it('EdgePosition | adjacent corner position', () => {
	const b = [
		[-8, -2],
		[-4, -4],
	];

	const input = allEdgePositions.find((pos) => pos.q == -6 && pos.r == -3);
	const output = b.map(([q, r]) => allCornerPositions.find((pos) => pos.q == q && pos.r == r));

	expect(input?.getAdjacentCornerPositions(allCornerPositions).sort()).toStrictEqual(output.sort());
});
