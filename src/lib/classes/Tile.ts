import type { Resource } from '../global/Types';

export default class Tile {
	readonly resource: Resource;
	readonly value?: number;

	constructor(resource: Resource, value?: number) {
		this.resource = resource;
		this.value = value;
	}
}
