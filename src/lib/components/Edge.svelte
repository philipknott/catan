<script lang="ts">
	import { EDGE_BUTTON_HEIGHT, EDGE_BUTTON_WIDTH } from '$lib/util/constants';
	import { calculateEdgeRotation, convertAxialToSquare } from '$lib/util/helpers';
	import type { Piece, Position } from '$lib/util/types';

	export let piece: Piece | undefined = undefined;
	export let pos: Position;
	export let onClick: () => void = () => {};

	const { x, y } = convertAxialToSquare(pos);
</script>

{#if piece}
	<img
		src="pieces/road_{piece.color}.svg"
		alt=""
		style:width="{EDGE_BUTTON_WIDTH}%"
		style:height="{EDGE_BUTTON_HEIGHT}%"
		style:left="{x - EDGE_BUTTON_WIDTH / 2}%"
		style:top="{y - EDGE_BUTTON_HEIGHT / 2}%"
		style:rotate="{calculateEdgeRotation(pos)}rad"
		on:focus={onClick}
	/>
{:else}
	<button
		class="vacant"
		style:width="{EDGE_BUTTON_WIDTH}%"
		style:height="{EDGE_BUTTON_HEIGHT}%"
		style:left="{x - EDGE_BUTTON_WIDTH / 2}%"
		style:top="{y - EDGE_BUTTON_HEIGHT / 2}%"
		style:rotate="{calculateEdgeRotation(pos)}rad"
		disabled={!onClick}
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
