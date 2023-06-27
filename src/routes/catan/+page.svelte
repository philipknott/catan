<script lang="ts">
	import { onMount } from 'svelte';
	import { Position } from '$lib/classes/Position';
	import Piece from '$lib/classes/Piece';
	import { Hex } from '$lib/classes/Hex';
	import HexView from '$lib/components/Hex.svelte';
	import Corner from '$lib/components/Corner.svelte';
	import Edge from '$lib/components/Edge.svelte';
	import { Color, PieceType } from '$lib/util/enums';
	import { generateRandomHexLayout, isCornerPos, isEdgePos } from '$lib/util/helpers';
	import { CORNER_AXIAL_COORDS, EDGE_AXIAL_COORDS } from '$lib/util/constants';
	import Hud from '$lib/components/hud/Hud.svelte';

	/* --- Sources of Truth --- */

	// board hex tiles
	let hexes = new Map<string, Hex>();

	// state of each position on board
	let corners = new Map<string, Piece | null>();
	let edges = new Map<string, Piece | null>();

	// turn state
	let turnColor: Color;

	/* --- Derived Variables --- */

	// pieces
	let cornerPieces: Map<string, Piece>;
	let edgePieces: Map<string, Piece>;

	// positions where pieces can be placed
	let availableCornerPositions = new Array<Position>();
	let availableEdgePositions = new Array<Position>();

	$: {
		// sync corners
		const _availableCornerPositions = new Array<Position>();
		const _cornerPieces = new Map<string, Piece>();
		const cornerEntries = Array.from(corners?.entries() ?? []);
		for (const [strPos, value] of cornerEntries) {
			if (value == null || value.type == PieceType.Settlement) {
				_availableCornerPositions.push(Position.parse(strPos));
			}
			if (value != null) {
				_cornerPieces.set(strPos, value);
			}
		}
		availableCornerPositions = _availableCornerPositions;
		cornerPieces = _cornerPieces;

		// sync edges
		const _availableEdgePositions = new Array<Position>();
		const _edgePieces = new Map<string, Piece>();
		const edgeEntries = Array.from(edges?.entries() ?? []);
		for (const [strPos, value] of edgeEntries) {
			if (value == null) {
				_availableEdgePositions.push(Position.parse(strPos));
			} else {
				_edgePieces.set(strPos, value);
			}
		}
		availableEdgePositions = _availableEdgePositions;
		edgePieces = _edgePieces;
	}

	/* --- Game Functionality --- */

	const placePiece = (pos: Position) => {
		console.log('placePiece called');
		const strPos = pos.toString();
		if (isCornerPos(pos)) {
			const newPiece = new Piece(
				turnColor,
				corners.get(strPos) == null ? PieceType.Settlement : PieceType.City
			);
			corners.set(strPos, newPiece);
			corners = corners;
		} else if (isEdgePos(pos)) {
			const newPiece = new Piece(turnColor, PieceType.Road);
			edges.set(strPos, newPiece);
			edges = edges;
		} else {
			throw Error('Position invalid');
		}
	};

	onMount(() => {
		hexes = generateRandomHexLayout();

		corners = new Map<string, Piece | null>(
			Array.from(
				CORNER_AXIAL_COORDS.map(({ q, r }) => {
					const pos = new Position(q, r);
					return [pos.toString(), null];
				})
			)
		);

		edges = new Map<string, Piece | null>(
			Array.from(
				EDGE_AXIAL_COORDS.map(({ q, r }) => {
					const pos = new Position(q, r);
					return [pos.toString(), null];
				})
			)
		);

		turnColor = Color.Red;
	});
</script>

<main>
	<div class="game">
		<!-- Heads Up Display (HUD) -->
		<div class="hud-wrapper">
			<Hud bind:turnColor />
		</div>

		<!-- Board -->
		<div class="board-wrapper">
			<div class="board">
				<!-- Hexes -->
				{#each [...hexes] as [strPos, hex] (strPos + hex.toString())}
					<HexView pos={Position.parse(strPos)} {hex} />
				{/each}

				<!-- Pieces -->
				{#each [...cornerPieces] as [strPos, piece] (strPos + piece.toString())}
					<Corner {piece} pos={Position.parse(strPos)} />
				{/each}
				{#each [...edgePieces] as [strPos, piece] (strPos + piece.toString())}
					<Edge {piece} pos={Position.parse(strPos)} />
				{/each}

				<!-- Available positions where pieces can be placed -->
				{#each availableCornerPositions as pos (pos.toString())}
					<Corner {pos} {placePiece} />
				{/each}
				{#each availableEdgePositions as pos (pos.toString())}
					<Edge {pos} {placePiece} />
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
	.game {
		display: flex;
		position: relative;
		width: 100%;
		height: 100vh;
	}

	.board-wrapper {
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		position: absolute;
		width: 100%;
		max-width: 700px;
		aspect-ratio: 25/27;
	}

	.board {
		width: 100%;
		position: relative;
		border: 2px solid blue;
		padding-bottom: 108%; /* for aspect ratio */
	}

	.hud-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		display: 'flex';
	}
</style>
