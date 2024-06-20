import { SearchIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react"
import Conversations from "../components/Conversations"
import MessageContainer from "../components/MessageContainer"
import { useEffect, useState } from "react"
import showToast from "../hooks/showToast"
import { useRecoilState } from "recoil"
import { conversationsAtom, selectedConversationsAtom } from "../atoms/messagesAtom"
import { GiConversation } from 'react-icons/gi'

const ChatPage = () => {
    const toast = showToast();
    const [loadingConversations, setLoadingConversations] = useState(true);
    const [conversations, setConversations] = useRecoilState(conversationsAtom);
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationsAtom);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await fetch('/api/messages/conversations');
                const data = await res.json();

                if (data.error) {
                    toast('Error', data.error, 'error');
                    return;
                }

                setConversations(data);

            } catch (error) {
                showToast('Error', error, 'error');
                return;
            } finally {
                setLoadingConversations(false);
            }
        };

        getConversations();
    }, [toast, setConversations]);

    return (
        <Box
            position={'absolute'}
            w={{
                lg: '750px',
                md: '80%',
                base: '90%'
            }}
            p={4}
            left={'50%'}
            transform={'translateX(-50%)'}
        >
            <Flex
                gap={4}
                flexDirection={{
                    base: 'column',
                    md: 'row',
                }}
                maxW={{
                    sm: '400px',
                    md: 'full'
                }}
                mx={'auto'}
            >
                <Flex
                    flex={30}
                    gap={2}
                    flexDirection={'column'}
                    maxW={{
                        sm: '250px',
                        md: 'full'
                    }}
                    mx={'auto'}
                >
                    <Text fontWeight={700} color={useColorModeValue('gray.600', 'gray.400')}>
                        Your Conversations
                    </Text>
                    <form>
                        <Flex alignItems={'center'} gap={2}>
                            <Input placeholder="Search for a user" />
                            <Button size={'sm'}>
                                <SearchIcon />
                            </Button>
                        </Flex>
                    </form>

                    {loadingConversations && (
                        [0, 1, 2, 3, 4, 5].map((_, i) => (
                            <Flex key={i} gap={4} alignItems={'center'} p={1} borderRadius={'md'}>
                                <Box>
                                    <SkeletonCircle size={10} />
                                </Box>
                                <Flex w={'full'} flexDirection={'column'} gap={3}>
                                    <Skeleton h={'10px'} w={'80px'} />
                                    <Skeleton h={'8px'} w={'90%'} />
                                </Flex>
                            </Flex>
                        ))
                    )}

                    {!loadingConversations && (
                        conversations.map((conversation) => (
                            <Conversations key={conversation._id} conversation={conversation} />
                        ))
                    )}
                </Flex>

                {!selectedConversation._id && (
                    <Flex
                        flex={70}
                        borderRadius={'md'}
                        p={2}
                        flexDir={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        height={'400px'}
                    >
                        <GiConversation size={100} />
                        <Text fontSize={20} >Select a conversation to start messaging</Text>
                    </Flex>
                )}

                {selectedConversation._id && (
                    <MessageContainer />
                )}

            </Flex>
        </Box>
    )
}

export default ChatPage