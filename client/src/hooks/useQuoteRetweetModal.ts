import { create } from 'zustand';

type QuoteRetweetModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useQuoteRetweetModal = create<QuoteRetweetModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useQuoteRetweetModal;
