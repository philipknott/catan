<script lang="ts">
	import { Piece } from '$lib/classes/Piece';
	import { CornerPosition, EdgePosition } from '$lib/classes/Position';

	export let piece: Piece;
	export let pos: CornerPosition | EdgePosition;

	const { x, y } = pos.getCoords();

	// if it's a road, calculate it's rotation angle on the board (radians)
	const rotate = piece.isEdgePiece ? (pos as EdgePosition).rotate : 0;
</script>

<img
	src={piece.imgSrc}
	alt={piece.toString()}
	style:width="{piece.width}%"
	style:height="{piece.height}%"
	style:left="{x - piece.width / 2}%"
	style:top="{y - piece.height / 2}%"
	style:rotate="{rotate}rad"
/>

<style>
	img {
		position: absolute;
	}
</style>
