import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'

import { UI } from './components/UI'
import { AudioManagerProvider } from './hooks/useAudioManager'
import { GameStateProvider } from './hooks/useGameState'

function App() {
	return (
		<AudioManagerProvider>
			<GameStateProvider>
				<Canvas shadows camera={{ position: [0, 16, 10], fov: 42 }}>
					<color attach='background' args={['#041c0b']} />
					<Experience />
				</Canvas>
				<UI />
			</GameStateProvider>
		</AudioManagerProvider>
	)
}

export default App
