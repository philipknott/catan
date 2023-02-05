<script lang="ts">
	import type { Move, PieceMove } from '$lib/classes/Move';
	import { PieceType, type Color } from '$lib/util/enums';
	import { getUniversalMoves, initHexes } from '$lib/util/helpers';
	import type { Piece } from '$lib/util/types';
	import { getContext } from 'svelte';
	import Corner from './Corner.svelte';
	import Edge from './Edge.svelte';
	import HexView from './Hex.svelte';

	export let currentColor: Color;
	export let pieces: Map<string, Piece>;
	export let moves: Move[];
	export let canPlaceAnywhere: boolean;

	const executeMove: (move: Move) => void = getContext('executeMove');

	// Initialize hexes
	const hexes = initHexes();

	$: pieceMoves = canPlaceAnywhere
		? getUniversalMoves(currentColor)
		: moves.map((move) => move as PieceMove);
</script>

<div class="wrapper">
	<div class="board">
		<!-- Hexes -->
		{#each [...hexes] as [strPos, hex] (strPos)}
			<HexView pos={JSON.parse(strPos)} {hex} />
		{/each}

		<!-- Pieces -->
		{#each [...pieces] as [strPos, piece]}
			{#if piece.type == PieceType.Road}
				<Edge {piece} pos={JSON.parse(strPos)} />
			{:else}
				<Corner {piece} pos={JSON.parse(strPos)} />
			{/if}
		{/each}

		<!-- Available Positions -->
		{#each pieceMoves as move (JSON.stringify(move.pos))}
			{#if move.type == PieceType.Road}
				<Edge pos={move.pos} onClick={() => executeMove(move)} />
			{:else}
				<Corner pos={move.pos} onClick={() => executeMove(move)} />
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
