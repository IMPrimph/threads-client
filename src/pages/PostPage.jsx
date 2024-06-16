import { Avatar, Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { useState } from "react"
import Comment from "../components/Comment"

const PostPage = () => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={'center'} gap={3}>
          <Avatar src='/zuck-avatar.png' size={'md'} name='primph'/>
          <Flex>
            <Text fontSize={'small'} fontWeight={'bold'}>primph</Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text fontSize={'small'} color={'gray.light'}>1d</Text>
          <BsThreeDots cursor={'pointer'} />
        </Flex>
      </Flex>

      <Text my='3'>about threads</Text>
      <Box
        borderRadius={6}
        overflow={'hidden'}
        border={'1px solid'}
        borderColor={'gray.light'}
      >
        <Image src='/post1.png' w={'full'} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={'center'}>
        <Text color={'gray.light'} fontSize={'small'}>23 replies</Text>
        <Box w={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
        <Text color={'gray.light'} fontSize={'small'}>{ 20 + (liked ? 1 : 0) } likes</Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'2xl'}>👋🏻</Text>
          <Text color={'gray.light'}>Get the app to like and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comment
        comment='comment 1'
        createdAt='2d'
        likes={10}
        username='dan'
        userAvatar='https://bit.ly/dan-abramov'
      />
      <Comment
        comment='comment 2'
        createdAt='3d'
        likes={50}
        username='kola'
        userAvatar='https://bit.ly/kent-c-dodds'
      />
      <Comment
        comment='comment 3'
        createdAt='5d'
        likes={90}
        username='Prosper'
        userAvatar='https://bit.ly/prosper-baba'
      />
    </>
  )
}

export default PostPage