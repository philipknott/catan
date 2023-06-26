import { Resource } from '$lib/util/enums';

export class Hex {
	resource: Resource | null;
	value?: number;

	constructor(resource: Resource | null, value?: number) {
		this.resource = resource;
		this.value = value;
	}

	toString = (): string => {
		return `${this.resource}-${this.value}`;
	};
}
