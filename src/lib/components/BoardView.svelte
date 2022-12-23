<script lang="ts">
	import { corners, edges, tiles } from '$lib/stores';
	import CornerPieceView from './CornerPieceView.svelte';
	import EdgePieceView from './EdgePieceView.svelte';
	import TileView from './TileView.svelte';
</script>

<div class="wrapper">
	<div class="board">
		<!-- Tiles -->
		{#each [...$tiles] as [pos, tile]}
			<TileView {pos} {tile} />
		{/each}

		<!-- Edges -->
		{#each [...$edges] as [pos, piece]}
			<EdgePieceView {piece} {pos} />
		{/each}

		<!-- Corners -->
		{#each [...$corners] as [pos, piece]}
			<CornerPieceView {piece} {pos} />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		padding: 50px;
		border: 2px solid red;
		max-width: 1000px;
		width: 100%;
	}

	.board {
		width: 100%;
		position: relative;
		border: 2px solid blue;
		padding-bottom: 108%; /* for aspect ratio */
	}
</style>
