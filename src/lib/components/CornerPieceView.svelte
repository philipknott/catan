<script lang="ts">
	import { CORNER_BUTTON_HEIGHT, CORNER_BUTTON_WIDTH } from '$lib/util/constants';
	import { CornerPieceType } from '$lib/util/enums';
	import { convertAxialToSquare } from '$lib/util/helpers';
	import type { AxialCoords, CornerPiece } from '$lib/util/types';
	import { setCorner } from '$lib/game';

	export let piece: CornerPiece | null;
	export let pos: AxialCoords;

	const { x, y } = convertAxialToSquare(pos);
</script>

{#if !piece}
	<button
		style:width="{CORNER_BUTTON_WIDTH}%"
		style:height="{CORNER_BUTTON_HEIGHT}%"
		style:left="{x - CORNER_BUTTON_WIDTH / 2}%"
		style:top="{y - CORNER_BUTTON_HEIGHT / 2}%"
		on:focus={() => setCorner(pos, CornerPieceType.Settlement)}
	/>
{:else}
	<button
		style:width="{CORNER_BUTTON_WIDTH}%"
		style:height="{CORNER_BUTTON_HEIGHT}%"
		style:left="{x - CORNER_BUTTON_WIDTH / 2}%"
		style:top="{y - CORNER_BUTTON_HEIGHT / 2}%"
		style:background-color={piece.color}
		style:opacity="100%"
	/>
{/if}

<style>
	button {
		position: absolute;
		border-radius: 50%;
		opacity: 0%;
	}

	button:hover {
		opacity: 50%;
	}
</style>
