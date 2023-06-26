<script lang="ts">
	import GameController from '$lib/legacy/GameController';

	import { Color } from '$lib/util/enums';
	import { getColorString } from '$lib/util/helpers';
	import type { Writable } from 'svelte/store';
	import GameState from './GameState';
	import Player from './Player';

	export let gameState: Writable<GameState>;
	export let gameController: GameController;

	let turn: number;
	let currentColorString: string;
	let players: Player[];

	gameState.subscribe((state) => {
		turn = state.turn;
		currentColorString = getColorString(state.currentColor);
		players = state.players;
	});
</script>

<div>
	<p>Turn: {turn} ({currentColorString})</p>
	<button on:click={() => gameController.incrementTurn()}>Next Turn</button>
	<p>{players}</p>
</div>

<div>
	<table>
		<tr>
			<th>Player Color</th>
			<th>Resources</th>
		</tr>
		{#each players as player, i (i)}
			<tr>
				<td>{i}</td>
				<td>{player.hand}</td>
			</tr>
		{/each}
	</table>
</div>

<style>
</style>
