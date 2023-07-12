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
	let availablePositions: (EdgePosition | CornerPosition)[] = [];

	/* --- Game Functionality --- */

	const calculateAvailablePositions = (piece: Piece): (CornerPosition | EdgePosition)[] => {
		const allPositions = Array.from(boardValues.keys());
		const allEdgePositions = allPositions
			.filter((pos) => pos instanceof EdgePosition)
			.map((pos) => pos as EdgePosition);
		const allCornerPositions = allPositions
			.filter((pos) => pos instanceof CornerPosition)
			.map((pos) => pos as CornerPosition);

		const result: (EdgePosition | CornerPosition)[] = [];
		switch (piece.pieceType) {
			case PieceType.Road:
				for (const edgePos of allEdgePositions) {
					// make sure the position is vacant
					if (boardValues.get(edgePos) !== null) {
						continue;
					}

					// make sure the pos is adjacent to at least one same-colored piece
					const adjacentPositions = edgePos.getAdjacentPositions(
						allCornerPositions,
						allEdgePositions
					);
					if (
						!adjacentPositions.some((adjPos) => {
							const adjPiece = boardValues.get(adjPos);
							if (!adjPiece) return false;
							if (adjPiece.color !== piece.color) return false;
							return true;
						})
					) {
						continue;
					}

					// by this point, the position is valid
					result.push(edgePos);
				}
				break;

			case PieceType.Settlement:
				for (const cornerPos of allCornerPositions) {
					// make sure position is vacant
					if (boardValues.get(cornerPos) !== null) {
						continue;
					}

					// make sure it's adjacent to a road of the same color
					const adjacentEdgePositions = cornerPos.getAdjacentEdgePositions(allEdgePositions);
					if (
						!adjacentEdgePositions.some((adjEdgePos) => {
							const adjEdgePiece = boardValues.get(adjEdgePos);
							if (!adjEdgePiece) return false;
							if (adjEdgePiece.color !== piece.color) return false;
							return true;
						})
					) {
						continue;
					}

					// make sure it's NOT adjacent to any corner pieces
					const adjacentCornerPositions = cornerPos.getAdjacentCornerPositions(allCornerPositions);
					if (
						adjacentCornerPositions.some((adjCornerPos) => {
							if (!!boardValues.get(adjCornerPos)) return true;
							return false;
						})
					) {
						continue;
					}

					// position is valid
					result.push(cornerPos);
				}
				break;

			case PieceType.City:
				for (const cornerPos of allCornerPositions) {
					// make sure corner pos contains settlement of the same color
					const cornerPiece = boardValues.get(cornerPos);
					if (!cornerPiece) continue;
					if (cornerPiece.pieceType !== PieceType.Settlement) continue;
					if (cornerPiece.color !== piece.color) continue;
					result.push(cornerPos);
				}
				break;
		}

		return result;
	};

	const handleDragStart = (e: DragEvent) => {
		// TODO maybe move these event handlers into PlayerInfo.svelte

		// create the piece from the element being dragged
		const dataset = (e.target as HTMLElement).dataset as { piecestring: string };
		const piece = Piece.createFromString(dataset.piecestring);

		// attach the piece to the event
		e.dataTransfer!.setData('text/plain', dataset.piecestring);

		// show the available positions on the board
		availablePositions = calculateAvailablePositions(piece);
	};

	const handleDragEnd = (e: DragEvent) => {
		// remove available positions from the board
		availablePositions = [];
	};

	const handleDragEnter = (e: DragEvent) => {};

	const handleDragLeave = (e: DragEvent) => {};

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
