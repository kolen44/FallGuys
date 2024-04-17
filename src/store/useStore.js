import { create } from 'zustand'

export const useStores = create((set, get) => ({
	BGMusic: true,
	setBGMusic: boolean => {
		set(state => ({
			BGMusic: boolean,
		}))
	},
}))
