import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const Rules = () => {
	const [scroll, setScroll] = useState('hidden')
	const [confidenceVisibleBoolean, setConfidenceVisibleBoolean] = useState(true)

	useEffect(() => {
		if (localStorage.getItem('confidenceVisibleBoolean') == null) {
			setConfidenceVisibleBoolean(true)
			setScroll('hidden')
		} else {
			setConfidenceVisibleBoolean(false)
			setScroll('auto')
		}
		document.body.style.overflowY = scroll
	}, [scroll])

	return (
		<AnimatePresence>
			{confidenceVisibleBoolean && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setIsOpen(false)}
					className='bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer'
				>
					<motion.div
						initial={{ scale: 0, rotate: '12.5deg' }}
						animate={{ scale: 1, rotate: '0deg' }}
						exit={{ scale: 0, rotate: '0deg' }}
						onClick={e => e.stopPropagation()}
						className='bg-gradient-to-br from-#74c39e-600 to-#3b73b0-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden'
					>
						<div className='relative z-10'>
							<h3 className='text-3xl md:text-5xl font-bold text-center mb-2'>
								Начало игры
							</h3>
							<p className='text-center mb-6'>
								Для того что бы играть с десктопа можно пользоваться раскладкой
								кнопок WASD или посредством джостика. Так же в правом углу
								можете включить музыку для лучшей игры.
							</p>
							<div className='flex gap-2'>
								<button
									onClick={() => {
										setConfidenceVisibleBoolean(false),
											setScroll('auto'),
											localStorage.setItem('confidenceVisibleBoolean', 'false')
									}}
									className='bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full  py-2 rounded pointer-events-auto'
								>
									Понятно
								</button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
