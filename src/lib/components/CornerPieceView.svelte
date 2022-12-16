<script lang="ts">
	import type CornerPiece from '$lib/classes/pieces/CornerPiece';
	import { CORNER_BUTTON_HEIGHT, CORNER_BUTTON_WIDTH } from '$lib/global/Constants';
	import { convertAxialToSquare } from '$lib/global/Helpers';
	import type { AxialCoords } from '$lib/global/Types';

	export let cornerPiece: CornerPiece | null;
	export let pos: AxialCoords;

	const { x, y } = convertAxialToSquare(pos);

	const width = CORNER_BUTTON_WIDTH;
	const height = CORNER_BUTTON_HEIGHT;
	const left = x - width / 2;
	const top = y - height / 2;
</script>

{#if cornerPiece == null}
	<button style:width="{width}%" style:height="{height}%" style:left="{left}%" style:top="{top}%" />
{:else}
	<button
		style:width="{width}%"
		style:height="{height}%"
		style:left="{left}%"
		style:top="{top}%"
		style:color={cornerPiece.color}
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
