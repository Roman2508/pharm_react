import React from 'react'

import { gql } from '../../../graphql/client'
import styles from './VideoAnd3d.module.scss'
import { scrollToTop } from '../../../utils/scrollToTop'
import { Videos } from '../../../components/Videos/Videos'
import Skeleton from '../../../components/Skeleton/Skeleton'
import FullScreenFrame from '../../../components/FullScreenFrame/FullScreenFrame'
import { /* GetAllVideosQuery, */ GetPanoramsQuery } from '../../../graphql/__generated__'

export const VideoAnd3d: React.FC = () => {
  const [panoramas, setPanoramas] = React.useState<GetPanoramsQuery>()

  const [isOpenFullScreen, setOpenFullScreen] = React.useState(false)
  const [frameUrl, setFrameUrl] = React.useState('')

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        const panoramas = await gql.GetPanorams()

        setPanoramas(panoramas)
        document.title = `Відео та 3D-панорами | ЖБФФК`
      } catch (err) {
        console.log(err, 'video and 3d page')
        window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  const handleOpenFullScreenFrame = (url: string) => {
    console.log(url)
    setFrameUrl(url)
    setOpenFullScreen(true)
  }

  return (
    <>
      <FullScreenFrame isOpenFullScreen={isOpenFullScreen} setOpenFullScreen={setOpenFullScreen}>
        <iframe frameBorder="0" width="90%" height="90%" src={frameUrl} allowFullScreen />
      </FullScreenFrame>

      <div className={styles['subdivisions']}>
        {panoramas ? (
          <h1 className="section-title" style={{ marginBottom: '50px' }}>
            Відео і 3D-панорами
          </h1>
        ) : (
          <Skeleton
            width="300"
            height="50"
            radius="10"
            className={'section-title-center'}
            styles={{ marginBottom: '50px' }}
          />
        )}

        <div className="container">
          <div className={styles['card__wrapper']}>
            {panoramas
              ? panoramas.panoramas.data.map((el) => (
                  <div
                    className={styles['card__item']}
                    key={el.id}
                    onClick={() => handleOpenFullScreenFrame(el.attributes.link)}
                  >
                    <div className="scale-photo-hover scale-icon">
                      <img
                        className={styles['photo-element']}
                        src={`${import.meta.env.VITE_API_URL}${el.attributes.poster.data.attributes.url}`}
                        alt={el.attributes.poster.data.attributes.name}
                        width={el.attributes.poster.data.attributes.width}
                        height={el.attributes.poster.data.attributes.height}
                      />
                    </div>
                    <div className={styles['card__text-box']}>
                      <p className={styles['card__text']}>{el.attributes.title}</p>
                    </div>
                  </div>
                ))
              : Array(8)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      width="200"
                      height="200"
                      radius="0"
                      className={styles['card__item-skeleton']}
                    />
                  ))}
          </div>
        </div>
      </div>

      <Videos test />
    </>
  )
}
