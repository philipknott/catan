<script lang="ts">
	import { initGame } from '$lib/game';
	import BoardView from './BoardView.svelte';

	initGame();
</script>

<div>
	<BoardView />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
	}
</style>
