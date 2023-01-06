<script lang="ts">
	import { initHexes } from '$lib/game';
	import { COLORS, CORNER_AXIAL_COORDS, EDGE_AXIAL_COORDS } from '$lib/util/constants';
	import type { CornerPiece, EdgePiece } from '$lib/util/types';
	import BoardView from './Board.svelte';

	let turn = 0;
	$: currentColor = COLORS[turn % 4];

	const hexes = initHexes();
	const availableCorners = CORNER_AXIAL_COORDS;
	const availableEdges = EDGE_AXIAL_COORDS;
	const cornerPieces = new Map<string, CornerPiece>();
	const edgePieces = new Map<string, EdgePiece>();
</script>

<div class="game">
	<BoardView
		{currentColor}
		{hexes}
		{availableCorners}
		{availableEdges}
		{cornerPieces}
		{edgePieces}
	/>
	<div style:width="400px">
		<h1>Turn #{turn}: {currentColor}</h1>
		<button on:click={() => turn++}>Next Turn</button>
	</div>
</div>

<style>
	div {
		margin: 20px;
	}

	.game {
		display: flex;
		justify-content: center;
	}
</style>
