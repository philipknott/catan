export enum Resource {
	Brick = 'brick',
	Desert = 'desert',
	Grain = 'grain',
	Lumber = 'lumber',
	Ore = 'ore',
	Wool = 'wool',
}

export enum Color {
	Blue = 'blue',
	Orange = 'orange',
	Red = 'red',
	White = 'white',
}

export type AxialCoords = {
	q: number;
	r: number;
};

export type SquareCoords = {
	x: number;
	y: number;
};
