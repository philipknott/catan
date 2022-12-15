import type { Color } from '$lib/global/Types';

export default class Player {
	readonly color: Color;

	constructor(color: Color) {
		this.color = color;
	}
}
