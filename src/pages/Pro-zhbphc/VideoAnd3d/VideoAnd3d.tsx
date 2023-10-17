import React from 'react'

import { gql } from '../../../graphql/client'
import styles from './VideoAnd3d.module.scss'
import { Videos } from '../../../components/Videos/Videos'
import FullScreenFrame from '../../../components/FullScreenFrame/FullScreenFrame'
import { /* GetAllVideosQuery, */ GetPanoramsQuery } from '../../../graphql/__generated__'
import { scrollToTop } from '../../../utils/scrollToTop'
import Skeleton from '../../../components/Skeleton/Skeleton'

export const VideoAnd3d: React.FC = () => {
  // const [videos, setVideos] = React.useState<GetAllVideosQuery>()
  const [panoramas, setPanoramas] = React.useState<GetPanoramsQuery>()

  const [isOpenFullScreen, setOpenFullScreen] = React.useState(false)
  const [frameUrl, setFrameUrl] = React.useState('')

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        // const videos = await gql.GetAllVideos()
        const panoramas = await gql.GetPanorams()

        setPanoramas(panoramas)
        // setVideos(videos)
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

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const SEO = await gql.GetSEO()
//     const headerData = await gql.GetHeader()
//     const footerData = await gql.GetFooter()
//     const mainScreenData = await gql.GetMainScreen()
//     const headerSchedule = await gql.GetHeaderSchedule()

//     const videos = await gql.GetAllVideos()
//     const panoramas = await gql.GetPanorams()

//     return {
//       props: {
//         SEO,
//         videos,
//         panoramas,
//         headerData,
//         footerData,
//         headerSchedule,
//         mainScreenData,
//       },
//       revalidate: 10,
//     }
//   } catch (error) {
//     console.log(error, 'about page error')
//     return {
//       props: {
//         SEO: {},
//         videos: {},
//         panoramas: {},
//         headerData: {},
//         footerData: {},
//         mainScreenData: {},
//         headerSchedule: {},
//       },
//     }
//   }
// }
