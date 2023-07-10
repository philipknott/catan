<script lang="ts">
	import { Color, PieceType } from '$lib/util/enums';
	import { Piece } from '$lib/classes/Piece';

	export let color: Color;
	export let turnColor: Color;

	const handleColorIndicatorClick = () => (turnColor = color);

	const pieces: Piece[] = [
		new Piece(PieceType.Road, color),
		new Piece(PieceType.Settlement, color),
		new Piece(PieceType.City, color),
	];
</script>

<div class="container">
	<!-- Color indicator -->
	<button on:click={handleColorIndicatorClick}>
		<div class="color-indicator" style:background-color={color}>
			{#if color === turnColor}
				<div class="dot" />
			{/if}
		</div>
	</button>

	<!-- Pieces that can be dragged onto board -->
	{#each pieces as piece}
		<div draggable="true" on:dragstart on:dragend>
			<img
				src={piece.imgSrc}
				alt={piece.toString()}
				id={piece.toString()}
				data-piecestring={piece.toString()}
				style:width="30px"
				style:height="30px"
			/>
		</div>
	{/each}

	<!-- <DragBox /> -->
</div>

<style>
	.container {
		width: fit-content;
		display: flex;
		flex-direction: row;
		margin: 10px;
		gap: 10px;
		align-items: center;
	}

	button {
		padding: 0px;
		width: 75px;
		height: 75px;
		border-radius: 50%;
		border: 2px solid black;
	}

	button:active {
		border: 2px solid gray;
	}

	.color-indicator {
		height: 100%;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: black;
	}
</style>
