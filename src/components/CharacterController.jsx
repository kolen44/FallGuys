import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { Character } from './Character'

export const CharacterController = ({
	player = false,
	controls,
	state,
	...props
}) => {
	return (
		<RigidBody {...props} colliders={false}>
			<Character
				scale={0.42}
				color={state.state.profile.color}
				name={state.state.profile.name}
				position-y={0.2}
			/>
			<CapsuleCollider args={[0.1, 0.38]} position={[0, 0.68, 0]} />
		</RigidBody>
	)
}
