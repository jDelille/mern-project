import { create } from 'zustand';

type RetweetPopupStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useRetweetPopup = create<RetweetPopupStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useRetweetPopup;
