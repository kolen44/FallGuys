import { Hexagon } from './Hexagon'

export const HEX_X_SPACING = 2.25
export const HEX_Z_SPACING = 1.95
export const NB_ROWS = 7
export const NB_COLUMNS = 7
export const FLOOR_HEIGHT = 10
export const FLOORS = [
	{ color: 'red' },
	{ color: 'blue' },
	{ color: 'green' },
	{ color: 'yellow' },
	{ color: 'purple' },
]

export default function GameArena() {
	return (
		<group
			position-x={-((NB_COLUMNS - 1) / 2) * HEX_X_SPACING}
			position-z={-((NB_ROWS - 1) / 2) * HEX_Z_SPACING}
		>
			{FLOORS.map((floor, floorIndex) => (
				<group key={floorIndex} position-y={floorIndex * -FLOOR_HEIGHT}>
					{[...Array(NB_ROWS)].map((_, rowIndex) => (
						<group
							key={rowIndex}
							position-z={rowIndex * HEX_Z_SPACING}
							position-x={rowIndex % 2 ? HEX_X_SPACING / 2 : 0}
						>
							{[...Array(NB_COLUMNS)].map((_, columnIndex) => (
								<Hexagon
									key={columnIndex}
									position-x={columnIndex * HEX_X_SPACING}
									color={floor.color}
								/>
							))}
						</group>
					))}
				</group>
			))}
		</group>
	)
}
