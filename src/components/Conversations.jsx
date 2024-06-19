import { Avatar, AvatarBadge, Flex, Image, Stack, Text, WrapItem, useColorModeValue } from "@chakra-ui/react";

const Conversations = () => {
    return (
        <Flex
            gap={4}
            alignItems={'center'}
            p={1}
            _hover={{
                cursor: 'pointer',
                bg: useColorModeValue('gray.600', 'gray.dark'),
                color: 'white'
            }}
            borderRadius={'md'}
        >
            <WrapItem>
                <Avatar
                    size={{
                        base: 'xs',
                        md: 'md',
                        sm: 'sm',
                    }}
                    src="https://bit.ly/broken-link"
                >
                    <AvatarBadge boxSize={'1em'} bg={'green.500'} />
                </Avatar>
            </WrapItem>

            <Stack direction={'column'} fontSize={'small'}>
                <Text fontWeight={700} display={'flex'} alignItems={'center'}>
                    primph <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={'x-small'} display={'flex'} alignItems={'center'} gap={1}>
                    message
                </Text>
            </Stack>
        </Flex>
    );
};

export default Conversations;
