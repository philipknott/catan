import { Resource } from '$lib/util/enums';

export class Hex {
	static WIDTH = 25;
	static HEIGHT = 20;

	get imgSrc() {
		return 'hexes/hex_desert.png';
	}
}

export class ResourceHex extends Hex {
	resource: Resource;
	numValue: number;

	constructor(resource: Resource, numValue: number) {
		super();
		this.resource = resource;
		this.numValue = numValue;
	}

	get imgSrc() {
		return `hexes/hex_${this.resource}.png`;
	}

	toString = () => `${this.resource}-${this.numValue}`;
}
