<script lang="ts">
	import { Move, PieceMove } from '$lib/classes/Move';
	import Player from '$lib/classes/Player';
	import { COLORS } from '$lib/util/constants';
	import type { Color } from '$lib/util/enums';
	import { calculateMoves } from '$lib/util/helpers';
	import type { Piece } from '$lib/util/types';
	import { setContext } from 'svelte';
	import BoardView from './Board.svelte';

	// Create players
	const players = new Map<Color, Player>();
	for (const color of COLORS) {
		players.set(color, new Player());
	}

	// Create Pieces
	let pieces = new Map<string, Piece>();

	let turn = 0;
	$: currentColor = COLORS[turn % 4];
	$: moves = calculateMoves(pieces, currentColor);

	const executeMove = (move: Move) => {
		if (move instanceof PieceMove) {
			const { color, pos, type } = move;
			pieces.set(JSON.stringify(pos), { color, type });
			pieces = pieces;
		}
	};

	setContext('executeMove', executeMove);

	let canPlaceAnywhere: boolean = false;
</script>

<div class="game">
	<!-- Board -->
	<BoardView {currentColor} {pieces} {moves} {canPlaceAnywhere} />

	<!-- Controls -->
	<div style:width="400px">
		<h1>Turn #{turn}: {currentColor}</h1>
		<button on:click={() => turn++}>Next Turn</button>
		<button on:click={() => (canPlaceAnywhere = !canPlaceAnywhere)}
			>canPlaceAnywhere: {canPlaceAnywhere}</button
		>
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
