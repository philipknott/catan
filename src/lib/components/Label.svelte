<script lang="ts">
	import { convertAxialToSquare } from '$lib/util/helpers';
	import type { Position } from '$lib/util/types';

	export let content: string;
	export let pos: Position;

	const { x, y } = convertAxialToSquare(pos);

	const width = 7;
	const height = 2;
</script>

<code
	style:left="{x - width / 2}%"
	style:top="{y - height / 2}%"
	style:width="{width}%"
	style:height="{height}%">{content}</code
>

<style>
	code {
		position: absolute;
		font-size: smaller;
	}
</style>
