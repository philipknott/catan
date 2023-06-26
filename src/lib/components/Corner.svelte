<script lang="ts">
	import Piece from '$lib/classes/Piece';
	import { Position } from '$lib/classes/Position';
	import { CORNER_BUTTON_HEIGHT, CORNER_BUTTON_WIDTH } from '$lib/util/constants';
	import { PieceType } from '$lib/util/enums';
	import { convertAxialToSquare } from '$lib/util/helpers';

	export let piece: Piece | null = null;
	export let pos: Position;

	export let placePiece: ((pos: Position) => void) | undefined = undefined;

	const onClick = () => placePiece!(pos);

	const isCity = piece?.type == PieceType.City;

	const { x, y } = convertAxialToSquare(pos);
	const width = `${CORNER_BUTTON_WIDTH}%`;
	const height = `${CORNER_BUTTON_HEIGHT}%`;
	const left = `${x - CORNER_BUTTON_WIDTH / 2}%`;
	const top = `${y - CORNER_BUTTON_HEIGHT / 2}%`;
</script>

{#if placePiece !== undefined}
	<button class="vacant" style:width style:height style:left style:top on:click={onClick} />
{/if}

{#if piece !== null}
	<img
		src="pieces/{isCity ? 'city' : 'settlement'}_{piece.color}.svg"
		alt=""
		style:width
		style:height
		style:left
		style:top
		style:color={piece.color}
	/>
{/if}

<style>
	img {
		position: absolute;
	}

	button {
		position: absolute;
		border-radius: 50%;
	}

	button.vacant {
		opacity: 25%;
	}

	button.vacant:hover {
		opacity: 50%;
	}
</style>
