import React from 'react'
import styles from './MainScreen.module.scss'
import { GetMainScreenQuery } from '../../graphql/__generated__'

interface IMainScreenProps {
  mainScreenData: GetMainScreenQuery
}

const MainScreen: React.FC<IMainScreenProps> = ({ mainScreenData }) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current?.play()
    }
  }, [])

  return (
    <div className={styles['main-screen']}>
      <div className={styles['main-screen__video']}>
        <video
          ref={videoRef}
          preload="none"
          autoPlay
          muted
          loop
          playsInline
          style={{
            background: `transparent url('${import.meta.env.VITE_API_URL}${mainScreenData?.header.data.attributes.Header
              .primaryVideoPoster.data.attributes.url}') 50% 50% / cover no-repeat`,
          }}
        >
          <source
            src={`${import.meta.env.VITE_API_URL}${mainScreenData?.header.data.attributes.Header.background.data
              .attributes.url}`}
            type="video/mp4"
          />
        </video>
      </div>

      <div className={styles['main-screen__content']}>
        <h1 className={styles['main-screen__title']}>{mainScreenData?.header.data.attributes.Header.title}</h1>
        <img
          className={styles['main-screen__logo']}
          src={`${import.meta.env.VITE_API_URL}${mainScreenData?.header.data.attributes.Header.logo.data.attributes
            .url}`}
          width={160 || mainScreenData?.header.data.attributes.Header.logo.data.attributes.width}
          height={160 || mainScreenData?.header.data.attributes.Header.logo.data.attributes.height}
          alt="logo"
        />
      </div>
    </div>
  )
}

export default MainScreen
