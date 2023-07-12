<script lang="ts">
	import { Piece } from '$lib/classes/Piece';
	import { CornerPosition, EdgePosition } from '$lib/classes/Position';

	export let pos: EdgePosition | CornerPosition;
	export let boardValues: Map<CornerPosition | EdgePosition, Piece | null>;

	const { x, y } = pos.getCoords();

	const handleDrop = (e: DragEvent) => {
		// create the piece from the data stored in the event
		const strPiece = e.dataTransfer!.getData('text/plain');
		const piece = Piece.createFromString(strPiece);

		// add piece to the position on the board
		boardValues.set(pos, piece);
		boardValues = boardValues;
	};
</script>

<div
	style:left="{x - 2.5}%"
	style:top="{y - 2.5}%"
	on:dragenter
	on:dragleave
	on:drop={handleDrop}
	on:dragover={(e) => e.preventDefault()}
/>

<style>
	div {
		width: 5%;
		height: 5%;
		background-color: black;
		opacity: 50%;
		border-radius: 50%;
		position: absolute;
	}
</style>
