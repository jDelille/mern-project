import { create } from 'zustand';

type CommentModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useCommentModal = create<CommentModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCommentModal;
