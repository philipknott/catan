<script lang="ts">
	import { EDGE_BUTTON_HEIGHT, EDGE_BUTTON_WIDTH } from '$lib/util/constants';
	import { EdgePieceType } from '$lib/util/enums';
	import { calculateEdgeRotation, convertAxialToSquare } from '$lib/util/helpers';
	import type { AxialCoords, EdgePiece } from '$lib/util/types';
	import { edges, turn } from '$lib/stores';

	export let piece: EdgePiece | null;
	export let pos: AxialCoords;

	const { x, y } = convertAxialToSquare(pos);
</script>

{#if piece == null}
	<button
		style:width="{EDGE_BUTTON_WIDTH}%"
		style:height="{EDGE_BUTTON_HEIGHT}%"
		style:left="{x - EDGE_BUTTON_WIDTH / 2}%"
		style:top="{y - EDGE_BUTTON_HEIGHT / 2}%"
		style:rotate="{calculateEdgeRotation(pos)}rad"
		on:click={() => {
			edges.update((edges) => edges.set(pos, { color: turn, type: EdgePieceType.Road }));
		}}
	/>
{:else}
	<button
		style:width="{EDGE_BUTTON_WIDTH}%"
		style:height="{EDGE_BUTTON_HEIGHT}%"
		style:left="{x - EDGE_BUTTON_WIDTH / 2}%"
		style:top="{y - EDGE_BUTTON_HEIGHT / 2}%"
		style:rotate="{calculateEdgeRotation(pos)}rad"
		style:opacity="100%"
		style:background-color={piece.color}
	/>
{/if}

<style>
	button {
		position: absolute;
		opacity: 0%;
		z-index: 2;
	}

	button:hover {
		opacity: 50%;
	}
</style>
