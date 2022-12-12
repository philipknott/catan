export const AXIAL_POSITIONS = [
	[-2, 0],
	[-2, 1],
	[-2, 2],
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[-1, 2],
	[0, -2],
	[0, -1],
	[0, 0],
	[0, 1],
	[0, 2],
	[1, -2],
	[1, -1],
	[1, 0],
	[1, 1],
	[2, -2],
	[2, -1],
	[2, 0]
];

export const EDGE_CONNECTIONS: [number, number][] = [
	[0, 3],
	[0, 4],
	[1, 4],
	[1, 5],
	[2, 5],
	[2, 6],
	[3, 7],
	[4, 8],
	[5, 9],
	[10, 6],
	[11, 7],
	[12, 7],
	[12, 8],
	[13, 8],
	[13, 9],
	[14, 9],
	[10, 14],
	[10, 15],
	[11, 16],
	[12, 17],
	[13, 18],
	[14, 19],
	[15, 20],
	[16, 21],
	[16, 22],
	[17, 22],
	[17, 23],
	[18, 23],
	[18, 24],
	[19, 24],
	[19, 25],
	[20, 25],
	[20, 26],
	[21, 27],
	[22, 28],
	[23, 29],
	[24, 30],
	[25, 31],
	[26, 32],
	[27, 33],
	[28, 33],
	[28, 34],
	[29, 34],
	[29, 35],
	[30, 35],
	[30, 36],
	[31, 36],
	[31, 37],
	[32, 37],
	[33, 38],
	[34, 39],
	[35, 40],
	[36, 41],
	[37, 42],
	[38, 43],
	[39, 43],
	[39, 44],
	[40, 44],
	[40, 45],
	[41, 45],
	[41, 46],
	[42, 46],
	[43, 47],
	[44, 48],
	[45, 49],
	[46, 50],
	[47, 51],
	[48, 51],
	[48, 52],
	[49, 52],
	[49, 53],
	[50, 53]
];

export const BOARD_WIDTH = 2000;
export const BOARD_HEIGHT = 2165;

export const TILE_WIDTH = 500;
export const TILE_HEIGHT = Math.floor(250 * Math.sqrt(3));

export const BUTTON_WIDTH = 100;
export const BUTTON_HEIGHT = 100;

export const TILE_X_OFFSET = (BOARD_WIDTH - TILE_WIDTH) / 2;
export const TILE_Y_OFFSET = (BOARD_HEIGHT - TILE_HEIGHT) / 2;

export const BUTTON_X_OFFSET = (BOARD_WIDTH - BUTTON_WIDTH) / 2;
export const BUTTON_y_OFFSET = (BOARD_HEIGHT - BUTTON_HEIGHT) / 2;

// Conversion factor for isometric unit -> pixels (half width of tile)
export const ALPHA = 250;
