import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import showToast from '../hooks/showToast';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const toast = showToast()

  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        if (data.error) {
          toast('Error', data.error, 'error')
          return;
        }
        setUser(data);
      } catch (error) {
        toast('Error', error, 'error')
      }
    }

    getUser();
  }, [username, toast])

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <UserPost likes={1200} replies={488} postImg='/post1.png' postTitle='Talk about threads' />
      <UserPost likes={200} replies={3} postImg='/post2.png' postTitle='Talk about insta' />
      <UserPost likes={45} replies={4} postImg='/post3.png' postTitle='Bye bye' />
    </>
  )
}

export default UserPage