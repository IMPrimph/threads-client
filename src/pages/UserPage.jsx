import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

const UserPage = () => {
  return (
    <>
    <UserHeader/>
    <UserPost likes={1200} replies={488} postImg='/post1.png' postTitle='Talk about threads' />
    <UserPost likes={200} replies={3} postImg='/post2.png' postTitle='Talk about insta' />
    <UserPost likes={45} replies={4} postImg='/post3.png' postTitle='Bye bye' />
    </>
  )
}

export default UserPage