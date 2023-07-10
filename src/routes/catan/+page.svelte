<script lang="ts">
	import { onMount } from 'svelte';
	import { CornerPosition, EdgePosition, HexPosition, Position } from '$lib/classes/Position';
	import { Hex } from '$lib/classes/Hex';
	import HexView from '$lib/components/Hex.svelte';
	import PieceView from '$lib/components/Piece.svelte';
	import { Color, PieceType } from '$lib/util/enums';
	import { generateRandomHexLayout } from '$lib/util/helpers';
	import AvailablePiecePosition from '$lib/components/AvailablePiecePosition.svelte';
	import PlayerInfoView from '$lib/components/hud/PlayerInfo.svelte';
	import { Piece } from '$lib/classes/Piece';

	/* --- Sources of Truth --- */

	// board hex tiles
	let hexes = new Map<HexPosition, Hex>();

	// boardValues
	let boardValues = new Map<EdgePosition | CornerPosition, Piece | null>();

	// turn state
	let turnColor: Color = Color.Red;

	/* --- Derived Variables --- */

	// // positions where pieces can be placed
	let availablePositions: Position[] = [];

	/* --- Game Functionality --- */

	const updateAvailablePositions = (piece: Piece) => {
		// TODO logic that decides where pieces can be legally placed
		if (piece.isEdgePiece) {
			availablePositions = Array.from(boardValues.keys()).filter(
				(pos) => pos instanceof EdgePosition
			);
		} else {
			availablePositions = Array.from(boardValues.keys()).filter(
				(pos) => pos instanceof CornerPosition
			);
		}
	};

	const handleDragStart = (e: DragEvent) => {
		console.log('drag start');

		// TODO maybe move these event handlers into PlayerInfo.svelte

		// create the piece from the element being dragged
		const dataset = (e.target as HTMLElement).dataset as { piecestring: string };
		const piece = Piece.createFromString(dataset.piecestring);

		// attach the piece to the event
		e.dataTransfer!.setData('text/plain', dataset.piecestring);

		// show the available positions on the board
		updateAvailablePositions(piece);
	};

	const handleDragEnd = (e: DragEvent) => {
		console.log('drag end');

		availablePositions = [];
	};

	const handleDragEnter = (e: DragEvent) => {
		console.log('drag enter!');
	};

	const handleDragLeave = (e: DragEvent) => {
		console.log('drag leave!');
	};

	const handleDrop = (e: DragEvent) => {
		console.log('drop');
	};

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
	};

	onMount(() => {
		// init hexes
		hexes = generateRandomHexLayout();

		// init board values
		const _boardValues = new Map<CornerPosition | EdgePosition, Piece | null>();
		for (const pos of CornerPosition.ALL_POSSIBLE_POSITIONS) _boardValues.set(pos, null);
		for (const pos of EdgePosition.ALL_POSSIBLE_POSITIONS) _boardValues.set(pos, null);
		boardValues = _boardValues;

		/* --- TESTING (adds some pieces to the board) --- */
		const allBoardPositions = Array.from(boardValues.keys());
		// city
		const p1 = allBoardPositions[0];
		boardValues.set(p1, new Piece(PieceType.City, Color.Blue));
		// settlement
		const p2 = allBoardPositions[1];
		boardValues.set(p2, new Piece(PieceType.Settlement, Color.Red));
		// road
		const p3 = allBoardPositions[allBoardPositions.length - 1];
		boardValues.set(p3, new Piece(PieceType.Road, Color.Orange));
		boardValues = boardValues;
	});
</script>

<main>
	<div class="game">
		<!-- Heads Up Display (HUD) -->
		<div class="hud-wrapper">
			<!-- TODO this code could probably be condensed with an each loop and a different display mode -->
			<div style:display="flex" style:justify-content="space-between">
				<PlayerInfoView
					color={Color.Red}
					bind:turnColor
					on:dragstart={handleDragStart}
					on:dragend={handleDragEnd}
				/>
				<PlayerInfoView
					color={Color.Orange}
					bind:turnColor
					on:dragstart={handleDragStart}
					on:dragend={handleDragEnd}
				/>
			</div>
			<div style:display="flex" style:justify-content="space-between">
				<PlayerInfoView
					color={Color.White}
					bind:turnColor
					on:dragstart={handleDragStart}
					on:dragend={handleDragEnd}
				/>
				<PlayerInfoView
					color={Color.Blue}
					bind:turnColor
					on:dragstart={handleDragStart}
					on:dragend={handleDragEnd}
				/>
			</div>
		</div>

		<!-- Board -->
		<div class="board-wrapper">
			<div class="board">
				<!-- Hexes -->
				{#each [...hexes] as [pos, hex] (pos.toString() + hex.toString())}
					<HexView {pos} {hex} />
				{/each}

				<!-- Pieces -->
				{#each [...boardValues] as [pos, piece] (pos.toString() + piece?.toString() ?? 'null')}
					{#if piece !== null}
						<PieceView {pos} {piece} />
					{/if}
				{/each}

				<!-- Available piece positions  -->
				{#each availablePositions as pos (pos.toString())}
					<AvailablePiecePosition
						{pos}
						on:dragenter={handleDragEnter}
						on:dragleave={handleDragLeave}
						on:dragover={handleDragOver}
						bind:boardValues
					/>
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
	.game {
		display: flex;
		position: relative;
		width: 100%;
		height: 100vh;
	}

	.board-wrapper {
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		margin: auto;
		position: absolute;
		width: 100%;
		max-width: 700px;
		aspect-ratio: 25/27;
	}

	.board {
		width: 100%;
		position: relative;
		border: 2px solid blue;
		padding-bottom: 108%; /* for aspect ratio */
	}

	.hud-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
