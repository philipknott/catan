<script lang="ts">
	import type { Color } from '$lib/util/enums';
	import type { CornerPiece, EdgePiece, Hex, Position } from '$lib/util/types';
	import CornerView from './Corner.svelte';
	import EdgeView from './Edge.svelte';

	import HexView from './Hex.svelte';

	export let currentColor: Color;
	export let hexes: Map<string, Hex>;
	export let cornerPieces: Map<string, CornerPiece>;
	export let edgePieces: Map<string, EdgePiece>;
	export let availableCorners: Position[];
	export let availableEdges: Position[];

	const placeSettlement = (pos: Position) => {
		const settlement: CornerPiece = {
			color: currentColor,
			isCity: false,
		};
		cornerPieces.set(JSON.stringify(pos), settlement);
		cornerPieces = cornerPieces;
	};

	const placeRoad = (pos: Position) => {
		const road: EdgePiece = { color: currentColor };
		edgePieces.set(JSON.stringify(pos), road);
		edgePieces = edgePieces;
	};
</script>

<div class="wrapper">
	<div class="board">
		<!-- Hexes -->
		{#each [...hexes] as [strPos, hex] (strPos)}
			<HexView pos={JSON.parse(strPos)} {hex} />
		{/each}

		<!-- Available Corners -->
		{#each [...availableCorners] as pos (pos)}
			<CornerView {pos} onClick={() => placeSettlement(pos)} />
		{/each}

		<!-- Available edges -->
		{#each [...availableEdges] as pos (pos)}
			<EdgeView {pos} onClick={() => placeRoad(pos)} />
		{/each}

		<!-- Corner Pieces -->
		{#each [...cornerPieces] as [strPos, piece] (strPos)}
			<CornerView pos={JSON.parse(strPos)} {piece} />
		{/each}

		<!-- Edge Pieces -->
		{#each [...edgePieces] as [strPos, piece] (strPos)}
			<EdgeView pos={JSON.parse(strPos)} {piece} />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		padding: 50px;
		border: 2px solid red;
		max-width: 700px;
		width: 100%;
	}

	.board {
		width: 100%;
		position: relative;
		border: 2px solid blue;
		padding-bottom: 108%; /* for aspect ratio */
	}
</style>
