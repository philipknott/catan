<script lang="ts">
	import Game from '$lib/classes/Game';
	import BoardView from './BoardView.svelte';

	const game = new Game();
</script>

<div>
	<BoardView {game} />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
	}
</style>
