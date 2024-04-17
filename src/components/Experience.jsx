import { Environment, OrbitControls } from '@react-three/drei'
import { myPlayer } from 'playroomkit'
import { useGameState } from '../hooks/useGameState'
import { CharacterController } from './CharacterController'
import GameArena from './GameArena'
import { Podium } from './Podium'

export const Experience = () => {
	const { players, stage } = useGameState()
	const me = myPlayer()
	return (
		<>
			<OrbitControls />
			<Environment files={'hdrs/medieval_cafe_1k.hdr'} />
			{stage === 'winner' ? (
				<Podium />
			) : (
				<>
					{stage !== 'lobby' && <GameArena />}
					{players.map(({ state, controls }) => (
						<CharacterController
							key={state.id}
							state={state}
							controls={controls}
							player={me.id === state.id}
							position-y={2}
						/>
					))}
				</>
			)}
		</>
	)
}
