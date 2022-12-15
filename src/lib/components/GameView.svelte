<script lang="ts">
	import Board from '$lib/classes/Board';
	import BoardView from './BoardView.svelte';

	const board = new Board();
</script>

<div>
	<BoardView {board} />
</div>
