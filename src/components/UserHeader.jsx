import { Avatar, Box, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from "@chakra-ui/react"
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'

const UserHeader = () => {
  const toast = useToast()

  const copyURL = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        description: "Profile link copied",
        isClosable: true,
        status: 'success',
        duration: 3000,
      })
    })
  }

  return (
    <VStack gap={4} alignItems={'start'}>
      <Flex justifyContent={'space-between'} w={'full'}>
        <Box>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Primph
          </Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={'small'}>primph</Text>
            <Text
              fontSize={'x-small'}
              bg={'gray.dark'}
              color={'gray.light'}
              p={1}
              borderRadius={'full'}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="primph"
            src="/zuck-avatar.png"
            size={{
              base: 'md',
              md: 'xl'
            }}
          />
        </Box>
      </Flex>
      <Text>A developer building this project</Text>
      <Flex w={'full'} justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text color={'gray.light'}>100K followers</Text>
          <Box w='1' h='1' bg={'gray.light'} borderRadius={'full'}></Box>
          <Link color={'gray.light'}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className={'icon-container'}>
            <BsInstagram size={24} cursor={'pointer'}/>
          </Box>
          <Box className={'icon-container'}>
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={'pointer'}/>
              </MenuButton>
              <Portal>
                <MenuList bg={'dark.grey'}>
                  <MenuItem bg={'dark.grey'} onClick={copyURL}>Copy Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={'full'}>
        <Flex
          flex={1}
          borderBottom={'1.5px solid white'}
          pb='3'
          justifyContent={'center'}
          cursor={'pointer'}
        >
          <Text fontWeight={'bold'}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={'1px solid gray'}
          pb='3'
          justifyContent={'center'}
          cursor={'pointer'}
          color={'gray.light'}
        >
          <Text fontWeight={'bold'}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeader