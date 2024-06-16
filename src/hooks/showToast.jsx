/* eslint-disable react-hooks/rules-of-hooks */
import { useToast } from "@chakra-ui/react"

const showToast = () => {
    const toast = useToast();
    const showToast = (title, description, status) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 3000,
            isClosable: true,
        })
    }
    return showToast;
}

export default showToast