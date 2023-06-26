<script lang="ts">
	import Piece from '$lib/classes/Piece';
	import { Position } from '$lib/classes/Position';
	import { EDGE_BUTTON_HEIGHT, EDGE_BUTTON_WIDTH } from '$lib/util/constants';
	import { calculateEdgeRotation, convertAxialToSquare } from '$lib/util/helpers';

	export let piece: Piece | null = null;
	export let pos: Position;
	export let placePiece: ((pos: Position) => void) | undefined = undefined;

	const onClick = () => placePiece!(pos);

	const { x, y } = convertAxialToSquare(pos);
	const width = `${EDGE_BUTTON_WIDTH}%`;
	const height = `${EDGE_BUTTON_HEIGHT}%`;
	const left = `${x - EDGE_BUTTON_WIDTH / 2}%`;
	const top = `${y - EDGE_BUTTON_HEIGHT / 2}%`;
	const rotate = `${calculateEdgeRotation(pos)}rad`;
</script>

{#if placePiece !== undefined}
	<button
		class="vacant"
		style:width
		style:height
		style:left
		style:top
		style:rotate
		on:click={onClick}
	/>
{/if}

{#if piece !== null}
	<img
		src="pieces/road_{piece.color}.svg"
		alt=""
		style:width
		style:height
		style:left
		style:top
		style:rotate
		on:focus={onClick}
	/>
{/if}

<style>
	img {
		position: absolute;
	}

	button {
		position: absolute;
		z-index: 2;
	}

	button.vacant {
		opacity: 25%;
	}

	button.vacant:hover {
		opacity: 50%;
	}
</style>
