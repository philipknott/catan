<script lang="ts">
	import type { Writable } from 'svelte/store';
	import GameController from '$lib/classes/GameController';
	import GameState from '$lib/stores/GameState';
	import { PieceType, type Color } from '$lib/util/enums';
	import Corner from './Corner.svelte';
	import Edge from './Edge.svelte';
	import HexView from './Hex.svelte';

	export let gameState: Writable<GameState>;
	export let gameController: GameController;
</script>

<div class="wrapper">
	<div class="board">
		<!-- Hexes -->
		{#each [...$gameState.hexes] as [pos, hex] (JSON.stringify(pos))}
			<HexView {pos} {hex} />
		{/each}

		<!-- Pieces -->
		{#each [...$gameState.pieces] as [pos, piece]}
			{#if piece.type == PieceType.Road}
				<Edge {piece} {pos} />
			{:else}
				<Corner {piece} {pos} />
			{/if}
		{/each}

		<!-- Available Positions -->
		{#each $gameState.availablePieceMoves as move (JSON.stringify(move.pos))}
			{#if move.type == PieceType.Road}
				<Edge pos={move.pos} onClick={() => gameController.executeMove(move)} />
			{:else}
				<Corner pos={move.pos} onClick={() => gameController.executeMove(move)} />
			{/if}
		{/each}

		<!-- Position Labels (helpful for debugging) -->
		<!-- {#each CORNER_AXIAL_COORDS as pos}
			<Label content={`(${pos.q},${pos.r})`} {pos} />
		{/each}

		{#each EDGE_AXIAL_COORDS as pos}
			<Label content={`(${pos.q},${pos.r})`} {pos} />
		{/each} -->
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
