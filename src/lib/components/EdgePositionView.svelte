<script lang="ts">
	import type EdgePiece from '$lib/classes/pieces/EdgePiece';
	import { EDGE_HEIGHT, EDGE_WIDTH } from '$lib/global/Constants';
	import { calculateEdgeRotation, convertAxialToSquare } from '$lib/global/Helpers';
	import type { AxialCoords } from '$lib/global/Types';

	export let edgePiece: EdgePiece | null;
	export let pos: AxialCoords;

	const { x, y } = convertAxialToSquare(pos);
	const rotate = `${calculateEdgeRotation(pos)}rad`;
	const width = `${EDGE_WIDTH}px`;
	const height = `${EDGE_HEIGHT}px`;
	const left = `${x - EDGE_WIDTH / 2}px`;
	const top = `${y - EDGE_HEIGHT / 2}px`;

	if (edgePiece != null) {
	}
</script>

{#if edgePiece == null}
	<button style:width style:height style:left style:top style:rotate />
{:else}
	<button
		style:width
		style:height
		style:left
		style:top
		style:rotate
		style:opacity="100%"
		style:color={edgePiece.color}
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
