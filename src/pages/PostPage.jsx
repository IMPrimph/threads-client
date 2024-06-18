import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react"
import Actions from "../components/Actions"
import getUserProfile from "../hooks/getUserProfile"
import { useEffect, useState } from "react"
import showToast from "../hooks/showToast"
import { useNavigate, useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { DeleteIcon } from "@chakra-ui/icons"
import { useRecoilValue } from "recoil"
import { userAtom } from "../atoms/userAtom"
import deletePost from "../hooks/deletePost"
import Comment from "../components/Comment"

const PostPage = () => {
  const { user, loading } = getUserProfile();
  const [post, setPost] = useState(null);
  const toast = showToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();

        if (data.error) {
          toast('Error', data.error, 'error')
          return;
        }

        setPost(data);
      } catch (error) {
        toast('Error', error, 'error')
        setPost({});
      }
    };

    getPost();
  }, [pid, toast]);


  if (!user && loading) {
    return(
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }

  const handleDeletePost = async () => {
    await deletePost(post, toast);
    navigate(`/${user.username}`);
  }

  if (!post) return null;

  return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={'center'} gap={3}>
          <Avatar src={user.profilePic} size={'md'} name='primph'/>
          <Flex>
            <Text fontSize={'small'} fontWeight={'bold'}>{user.username}</Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"small"} width={36} textAlign={'right'} color={"gray.light"}>
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>

          {currentUser?._id === user._id && (
            <DeleteIcon cursor={'pointer'} onClick={handleDeletePost} size={20} />
          )}
        </Flex>
        </Flex>
      </Flex>

      <Text my='3'>{post.text}</Text>

      {post.img && (
        <Box
          borderRadius={6}
          overflow={'hidden'}
          border={'1px solid'}
          borderColor={'gray.light'}
        >
          <Image src={post.img} w={'full'} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={post} />
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

      {post.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={reply._id === post.replies[post.replies.length - 1]._id}
        />
      ))}
    </>
  )
}

export default PostPage