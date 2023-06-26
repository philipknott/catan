export class Position {
	q: number;
	r: number;

	constructor(q: number, r: number) {
		this.q = q;
		this.r = r;
	}

	toString = (): string => JSON.stringify(this);

	static parse = (s: string): Position => {
		const { q, r } = JSON.parse(s);
		return new Position(q, r);
	};

	static equals = (a: Position, b: Position) => JSON.stringify(a) == JSON.stringify(b);
}
