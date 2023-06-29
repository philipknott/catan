<script lang="ts">
	import { onMount } from 'svelte';
	import { CornerPosition, EdgePosition, HexPosition, Position } from '$lib/classes/Position';
	import { Hex } from '$lib/classes/Hex';
	import { City, Piece, Road, Settlement } from '$lib/classes/Piece';
	import HexView from '$lib/components/Hex.svelte';
	import PieceView from '$lib/components/Piece.svelte';
	import Hud from '$lib/components/hud/Hud.svelte';
	import { Color } from '$lib/util/enums';
	import { generateRandomHexLayout } from '$lib/util/helpers';

	/* --- Sources of Truth --- */

	// board hex tiles
	let hexes = new Map<HexPosition, Hex>();

	// boardValues
	let boardValues = new Map<EdgePosition | CornerPosition, Piece | null>();

	// turn state
	let turnColor: Color;

	/* --- Derived Variables --- */

	// // positions where pieces can be placed
	// let availableCornerPositions = new Array<Position>();
	// let availableEdgePositions = new Array<Position>();

	/* --- Game Functionality --- */

	onMount(() => {
		// init hexes
		hexes = generateRandomHexLayout();

		// init board values
		const _boardValues = new Map<CornerPosition | EdgePosition, Piece | null>();
		for (const pos of CornerPosition.ALL_POSSIBLE_POSITIONS) _boardValues.set(pos, null);
		for (const pos of EdgePosition.ALL_POSSIBLE_POSITIONS) _boardValues.set(pos, null);
		boardValues = _boardValues;

		// init turn color
		turnColor = Color.Red;

		/* --- DEBUG TEST --- */
		const allBoardPositions = Array.from(boardValues.keys());
		// city
		const p1 = allBoardPositions[0];
		boardValues.set(p1, new City(Color.Blue));
		// settlement
		const p2 = allBoardPositions[1];
		boardValues.set(p2, new Settlement(Color.Red));
		// road
		const p3 = allBoardPositions[allBoardPositions.length - 1];
		boardValues.set(p3, new Road(Color.Orange));
		boardValues = boardValues;
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
				{#each [...hexes] as [pos, hex] (pos.toString() + hex.toString())}
					<HexView {pos} {hex} />
				{/each}

				<!-- Pieces -->
				{#each [...boardValues] as [pos, piece] (pos.toString() + piece?.toString() ?? 'null')}
					{#if piece !== null}
						<PieceView {pos} {piece} />
					{/if}
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
