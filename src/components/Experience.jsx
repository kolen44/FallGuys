import { Environment, OrbitControls } from '@react-three/drei'
import { Character } from './Character'
import GameArena from './GameArena'

export const Experience = () => {
	return (
		<>
			<OrbitControls />
			<Environment files={'hdrs/medieval_cafe_1k.hdr'} />
			<Character />
			<GameArena />
		</>
	)
}
