import { Flex, Image, useColorMode } from '@chakra-ui/react'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={'center'} mt={6} mb={12}>
      <Image
        cursor={'pointer'}
        alt='logo'
        width={6}
        onClick={toggleColorMode}
        src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
      />
    </Flex>
  )
}

export default Header