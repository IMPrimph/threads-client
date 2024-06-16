import { Button } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil"
import { userAtom } from "../atoms/userAtom"
import showToast from "../hooks/showToast";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const setUserState = useSetRecoilState(userAtom);
  const toast = showToast();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      const data = await res.json();
      console.log(data)

      if (data.error) {
        toast('Error', data.error, 'error');
        console.log(data.error)
        return;
      }

      localStorage.removeItem('user-threads')
      setUserState(null);
    } catch (error) {
      console.log(error)
      toast('Error', error, 'error');
    }
  }

  return (
    <Button
      position={'fixed'}
      top={'30px'}
      right={'30px'}
      size={'sm'}
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
    </Button>
  )
}

export default LogoutButton