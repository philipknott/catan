<script lang="ts">
	import { CornerPiece, EdgePiece, Piece } from '$lib/classes/Piece';
	import { CornerPosition, EdgePosition } from '$lib/classes/Position';

	export let piece: Piece;
	export let pos: CornerPosition | EdgePosition;

	const { x, y } = pos.getCoords();

	const [width, height, rotate] =
		piece instanceof CornerPiece
			? [CornerPiece.WIDTH, CornerPiece.HEIGHT, 0]
			: [EdgePiece.WIDTH, EdgePiece.HEIGHT, (pos as EdgePosition).rotate];
</script>

<img
	src={piece.imgSrc}
	alt={piece.toString()}
	style:width="{width}%"
	style:height="{height}%"
	style:left="{x - width / 2}%"
	style:top="{y - height / 2}%"
	style:rotate="{rotate}rad"
/>

<style>
	img {
		position: absolute;
	}
</style>
