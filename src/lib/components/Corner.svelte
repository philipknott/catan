<script lang="ts">
	import { CORNER_BUTTON_HEIGHT, CORNER_BUTTON_WIDTH } from '$lib/util/constants';
	import { PieceType } from '$lib/util/enums';
	import { convertAxialToSquare } from '$lib/util/helpers';
	import type { Piece, Position } from '$lib/util/types';

	export let piece: Piece | undefined = undefined;
	export let pos: Position;
	export let onClick: () => void = () => {};

	const isCity = piece?.type == PieceType.City;

	const { x, y } = convertAxialToSquare(pos);
</script>

{#if !piece}
	<button
		class="vacant"
		style:width="{CORNER_BUTTON_WIDTH}%"
		style:height="{CORNER_BUTTON_HEIGHT}%"
		style:left="{x - CORNER_BUTTON_WIDTH / 2}%"
		style:top="{y - CORNER_BUTTON_HEIGHT / 2}%"
		on:focus={onClick}
	/>
{:else}
	<img
		src="pieces/{isCity ? 'city' : 'settlement'}_{piece.color}.svg"
		alt=""
		style:width="{CORNER_BUTTON_WIDTH}%"
		style:height="{CORNER_BUTTON_HEIGHT}%"
		style:left="{x - CORNER_BUTTON_WIDTH / 2}%"
		style:top="{y - CORNER_BUTTON_HEIGHT / 2}%"
		style:color={piece.color}
		on:focus={onClick}
	/>
{/if}

<style>
	img {
		position: absolute;
	}

	button {
		position: absolute;
		border-radius: 50%;
	}

	button.vacant {
		opacity: 25%;
	}

	button.vacant:hover {
		opacity: 50%;
	}
</style>
