<script lang="ts">
	import Board from '$lib/classes/Board';
	import BoardView from '$lib/components/BoardView.svelte';

	const board = new Board();
</script>

<main>
	<BoardView {board} />
</main>
