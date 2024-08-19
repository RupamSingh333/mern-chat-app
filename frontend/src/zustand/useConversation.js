import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	isUserOnline: false,
	setIsUserOnline: (isUserOnline) => set({ isUserOnline }),
}));

export default useConversation;
