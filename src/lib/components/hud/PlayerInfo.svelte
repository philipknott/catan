<script lang="ts">
	import { Color } from '$lib/util/enums';
	import { getColorString } from '$lib/util/helpers';

	export let color: Color;
	export let turnColor: Color;

	const onClick = () => (turnColor = color);

	const colorName = getColorString(color);
</script>

<button on:click={onClick}>
	<div class="color-indicator" style:background-color={colorName}>
		{#if color === turnColor}
			<div class="dot" />
		{/if}
	</div>
</button>

<style>
	button {
		margin: 10px;
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
