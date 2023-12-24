import { FunctionComponent } from 'react'
import { Box, Container, Image } from '@chakra-ui/react'
import { topBanner } from '@/assets/image'
import NextImage, { StaticImageData } from 'next/image'

const styles = {
  container: {
    w: '100%',
    h: '100%'
  },
  topBannerWrapper: {
    w: '100%',
    bg: '#3139a1'
  },
  topBannerContainer: {
    maxW: '1320px'
  },
  topBannerImage: {}
}

const App: FunctionComponent<{}> = () => {
  const renderTopBanner: FunctionComponent<{
    src?: StaticImageData | string
  }> = props => {
    const { src = topBanner } = props || {}
    return (
      <Box {...styles.topBannerWrapper}>
        <Container {...styles.topBannerContainer}>
          <NextImage objectFit="cover" src={src} alt="top-banner" />
        </Container>
      </Box>
    )
  }

  return <Box {...styles.container}>{renderTopBanner({})}</Box>
}

export default App
