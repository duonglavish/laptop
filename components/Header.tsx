'use client'

import { FunctionComponent, ReactElement } from 'react'
import {
  Box,
  Container,
  Stack,
  Text,
  Center,
  keyframes,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  useDisclosure,
  Menu,
  MenuButton,
  IconButton
} from '@chakra-ui/react'
import { topBanner, logo } from '@/assets/image'
import { usePathname } from 'next/navigation'
import { HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { MdShoppingBasket } from 'react-icons/md'
import NextImage, { StaticImageData } from 'next/image'
import NextLink from 'next/link'

const mockSubmenu = ['Pha pass window', 'Bao tri may tinh', 'Ve sinh may tinh']

const animationKeyframes = keyframes`
  0% { transform: scale(0.9) }
  50% { transform: scale(1.1) }
  100% { transform: scale(0.9) }
`

const animation = `${animationKeyframes} 0.8s ease-in-out infinite`

const styles = {
  container: {
    w: '100%',
    h: '100%'
  },
  //top banner
  topBannerWrapper: {
    w: '100%',
    bg: '#3139a1'
  },
  topBannerContainer: {
    maxW: '1320px'
  },
  // menu
  navigationWrapper: {
    w: '100%',
    maxW: '1320px',
    m: 'auto',
    bg: 'white'
  },
  navigationContainer: {
    w: '100%',
    justify: 'space-between',
    wrap: 'wrap',
    maxW: 'container.xl',
    display: 'flex',
    p: 2
  },
  navigationLogo: {
    padding: '4px 24px'
  },
  navigationMenu: {
    direction: { base: 'column', md: 'row' },
    display: { base: 'none', md: 'flex' },
    width: { base: 'full', md: 'auto' },
    alignItems: 'center',
    flexGrow: 1,
    order: 2
  },
  popoverContent: {
    borderColor: '#EE9120',
    bg: 'white',
    color: '#024E91'
  },
  // responsive menu
  menuWrapper: {
    flex: 0,
    order: { base: 1, md: -1 }
  },
  menuContainer: {
    display: { base: 'inline-block', md: 'none' }
  },
  cartWrapper: {
    flex: 0,
    order: 3
  },
  orderButton: {
    order: 2,
    size: 'md',
    alignSelf: 'center',
    bg: 'red',
    colorScheme: 'white',
    mr: 8,
    animation,
    display: { base: 'none', md: 'block' },
    whiteSpace: 'normal'
  }
}

const LinkItem: FunctionComponent<{
  href: string
  path: string
  children: ReactElement | string
}> = props => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const { href, path, children } = props || {}
  const active = path === href
  const activeColor = '#EE9120'
  const inactiveColor = '#024E91'
  const linkStyle = {
    fontWeight: 'bold',
    color: active ? activeColor : inactiveColor
  }

  return (
    <Popover
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={onClose}
      trigger="hover"
      placement="bottom-start"
    >
      <PopoverTrigger>
        <NextLink
          href={href}
          style={{ display: 'flex', alignItems: 'center', marginRight: 4 }}
        >
          <Text {...linkStyle} color={isOpen ? activeColor : inactiveColor}>
            {children}
          </Text>
          <ChevronDownIcon
            boxSize={5}
            color={isOpen ? activeColor : inactiveColor}
          />
        </NextLink>
      </PopoverTrigger>
      <PopoverContent {...styles.popoverContent}>
        <PopoverArrow shadowColor="#EE9120" />
        {/* <PopoverHeader pt={4} fontWeight="bold" border="0"></PopoverHeader> */}
        <PopoverBody p={0}>
          {mockSubmenu?.map(s => (
            <NextLink key={s} href={'/'}>
              <Text
                color="#666666D9"
                my={2}
                px={4}
                py={2}
                _hover={{
                  background: '#00000008',
                  color: '#121212D9'
                }}
              >
                {s}
              </Text>
            </NextLink>
          ))}
        </PopoverBody>
        {/* <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        ></PopoverFooter> */}
      </PopoverContent>
    </Popover>
  )
}

const Header: FunctionComponent<{}> = () => {
  const pathname = usePathname()

  const renderTopBanner: FunctionComponent<{
    src?: StaticImageData | string
  }> = props => {
    const { src = topBanner } = props || {},
      topBannerProps = {
        objectFit: 'cover',
        alt: 'top-banner',
        src
      }

    return (
      <Box {...styles.topBannerWrapper}>
        <Container {...styles.topBannerContainer}>
          <NextImage {...topBannerProps} />
        </Container>
      </Box>
    )
  }

  const renderNavigationBar: FunctionComponent<{
    src?: StaticImageData | string
  }> = props => {
    const { src = logo } = props || {},
      logoProps = {
        objectFit: 'cover',
        alt: 'top-banner',
        src,
        unoptimized: true
      }
    return (
      <Box as="nav" {...styles.navigationWrapper}>
        <Container {...styles.navigationContainer}>
          <Box order={{ base: 2, md: 1 }} flex={{ base: 'auto', md: 'none' }}>
            <NextLink
              href="/"
              style={{
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <NextImage {...logoProps} style={styles.navigationLogo} />
            </NextLink>
          </Box>
          <Stack {...(styles.navigationMenu as any)}>
            <LinkItem href="/pc" path={pathname}>
              SỬA MÁY TÍNH
            </LinkItem>
            <LinkItem href="/laptop" path={pathname}>
              SỬA LAPTOP
            </LinkItem>
          </Stack>

          <Center {...styles.menuWrapper}>
            <Box {...styles.menuContainer}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="solid"
                  aria-label="Options"
                  bg="#0273BE"
                  color="white"
                  borderRadius="50%"
                />
              </Menu>
            </Box>
          </Center>

          <Button {...styles.orderButton}>Dat lich hen</Button>

          <Center {...styles.cartWrapper}>
            <Box display="inline-block">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MdShoppingBasket />}
                  variant="solid"
                  aria-label="Cart"
                  bg="#0273BE"
                  color="white"
                />
              </Menu>
            </Box>
          </Center>
        </Container>
      </Box>
    )
  }

  return (
    <Box {...styles.container}>
      {renderTopBanner({})}
      {renderNavigationBar({})}
    </Box>
  )
}

export default Header
