# Project Planning

## Board Layout

The game board consists of three main components:

- Tiles
- Corners
- Edges

The following relationships need to exist:

- Corners should know what tiles, corners, and edges they are connected to
- Edges should know what corners and edges they are connected to

Ideas for improving efficiency:

- Pre-compute a map connecting rolled values to corner positions

## Random notes

For all turns, the pieces placed on the board should be visible.

For each color's turn, their available vacant positions should be displayed. These vacant positions should be cached for each color. When a piece is placed, it should be appended to the pieces, and each color's available vacant positions should be updated accordingly.

- Available vacant positions should be of type `AxialCoord[]`
- Pieces should be separated into two arrays, one for corner pieces and one for edge pieces.
  - Corner pieces should be of type `{pos: AxialCoord, color: Color, isCity: boolean}`
  - Edge pieces should be of type `{pos: AxialCoord, color: Color}`

## Pre-Computation

- Corners should be mapped to the tiles that they are connected to, so that

## Game Start

Each player rolls. The player with the highest roll begins by placing a settlement and road, following clockwise, then looping back around.

> This differs from how we usually play, but it's how the rules describe it in the [Catan Almanac](https://www.catan.com/sites/default/files/2021-06/catan_base_rules_2020_200707.pdf).

## Turns

On each turn, the player begins by rolling dice and having each player collect their respective resources. They then can build and trade in any order.

# Programmatic Design

`BoardPosition` (formerly `AxialCoords`) will denote a position on the board using `p` and `q` values. More information about this coordinate system can be found [here](https://www.redblobgames.com/grids/hexagons/).

`Hex` (formerly `Tile`) referrs to a terrain hex. They will each contain their respective `Resource` and number value (except for the desert). They will be randomly initialized at the beginning of the game.

`Players` contain a unique `Color`, an inventory of `Resources`, list of available `Moves`,

`Players` will contain the following:

- `Color`
- Inventory of `Resource` cards
- List of available `Moves`
- Map connecting roll values to resources collected on that number
- `VictoryPoints`
