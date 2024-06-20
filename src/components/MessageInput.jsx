import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { IoSendSharp } from 'react-icons/io5'
import showToast from "../hooks/showToast"
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationsAtom, selectedConversationsAtom } from "../atoms/messagesAtom";
import { useState } from "react";

const MessageInput = ({ setMessages }) => {
    const toast = showToast();
    const [messageText, setMessageText] = useState('');
    const selectedConversation = useRecoilValue(selectedConversationsAtom);
    const [conversations, setConversations] = useRecoilState(conversationsAtom);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!messageText) {
            return;
        }

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: messageText,
                    recipientId: selectedConversation.userId
                })
            })

            const data = await res.json();

            if (data.error) {
                toast('Error', data.error, 'error');
                return;
            }

            setMessages((messages) => [...messages, data]);
            setConversations((prevConvs) => {
				const updatedConversations = prevConvs.map((conversation) => {
					if (conversation._id === selectedConversation._id) {
						return {
							...conversation,
							lastMessage: {
								text: messageText,
								sender: data.sender,
							},
						};
					}
					return conversation;
				});
				return updatedConversations;
			});
            setMessageText('');

        } catch (error) {
            toast('Error', error, 'error');
            return;
        }
    }

    return (
        <form onSubmit={handleSendMessage}>
            <InputGroup>
            <Input
                w={'full'}
                placeholder='Type a message'
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
            />
                <InputRightElement onClick={handleSendMessage} cursor={'pointer'}>
                    <IoSendSharp  />
                </InputRightElement>
            </InputGroup>
        </form>
    )
}

export default MessageInput