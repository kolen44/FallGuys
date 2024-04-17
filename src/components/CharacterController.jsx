import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, euler, quat } from '@react-three/rapier'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { Controls } from '../App'
import { useGameState } from '../hooks/useGameState'
import { Character } from './Character'

const MOVEMENT_SPEED = 4.2
const JUMP_FORCE = 8
const ROTATION_SPEED = 2.5
const vel = new Vector3()
export const CharacterController = ({
	player = false,
	controls,
	state,
	...props
}) => {
	const { stage } = useGameState()
	const rb = useRef()
	const inTheAir = useRef(true)
	const landed = useRef(false)
	const [_, get] = useKeyboardControls()

	useFrame(({ camera }) => {
		if (stage === 'lobby' || stage !== 'game') {
			return
		}

		if (!player) {
			const pos = state.getState('pos')
			if (pos) {
				rb.current.setTranslation(pos)
			}
			const rot = state.getState('rot')
			if (rot) {
				rb.current.setRotation(rot)
			}
			const anim = state.getState('animation')
			setAnimation(anim)
			return
		}

		const rotVel = {
			x: 0,
			y: 0,
			z: 0,
		}

		const curVel = rb.current.linvel()
		vel.x = 0
		vel.y = 0
		vel.z = 0

		const angle = controls.angle()
		const joystickX = Math.sin(angle)
		const joystickY = Math.cos(angle)

		if (
			get()[Controls.forward] ||
			(controls.isJoystickPressed() && joystickY < -0.1)
		) {
			vel.z += MOVEMENT_SPEED
		}

		if (
			get()[Controls.back] ||
			(controls.isJoystickPressed() && joystickY > 0.1)
		) {
			vel.z -= MOVEMENT_SPEED
		}

		if (
			get()[Controls.right] ||
			(controls.isJoystickPressed() && joystickX < -0.1)
		) {
			rotVel.y += ROTATION_SPEED
		}

		if (
			get()[Controls.left] ||
			(controls.isJoystickPressed() && joystickX > 0.1)
		) {
			rotVel.y -= ROTATION_SPEED
		}

		rb.current.setAngvel(rotVel)
		//Добавляем перемещение по оси X и Z
		const eulerRoot = euler().setFromQuaternion(quat(rb.current.rotation()))
		vel.applyEuler(eulerRoot)
		//ПРОВЕРКА НАЖАЛ ЛИ ПОЛЬЗОВАТЕЛЬ ПРЫЖОК ПО КЛАВИШЕ (+ ПО КОНТРОЛЛЕРУ)
		if (
			(get()[controls.jump] || controls.isPressed('JUMP')) &&
			!inTheAir.current &&
			landed.current
		) {
			vel.y += JUMP_FORCE
			inTheAir.current = true
			landed.current = false
		} else {
			vel.y = curVel.y
		}
		//ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ЯВЛЯЕТСЯ ЛИ ПЕРСОНАЖ В ВОЗДУХЕ
		if (Math.abs(vel.y) > 1) {
			inTheAir.current = true
			landed.current = false
		} else {
			inTheAir.current = false
		}
		rb.current.setLinvel(vel)
		state.setState('pos', rb.current.translation())
		state.setState('rot', rb.current.rotation())
	})
	return (
		<RigidBody
			{...props}
			colliders={false}
			canSleep={false}
			enabledRotations={[false, true, false]}
			ref={rb}
			onCollisionEnter={e => {
				if (e.other.rigidBodyObject.name === 'hexagon') {
					inTheAir.current = false
					landed.current = true
					const curVel = rb.current.linvel()
					curVel.y = 0
					rb.current.setLinvel(curVel)
				}
			}}
			name={player ? 'player' : 'other'}
			gravityScale={stage === 'game' ? 2.5 : 0}
		>
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
