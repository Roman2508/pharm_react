import React from 'react'
import cn from 'classnames'
import styles from './Videos.module.scss'
import { gql } from '../../graphql/client'
import useSlider from '../../utils/useSlider'
import { SliderArrow } from '../Slider/SliderArrows'
import { getVideoUrl } from '../../utils/getVideoUrl'
import stylesSlider from '../Slider/Slider.module.scss'
import { GetAllVideosQuery } from '../../graphql/__generated__'
import FullScreenFrame from '../FullScreenFrame/FullScreenFrame'
import playIcon from '../../assets/icons/video-play.svg'
import Skeleton from '../Skeleton/Skeleton'

interface IVideoProps {
  test?: boolean
}

export const Videos: React.FC<IVideoProps> = ({ test }) => {
  const iframeVideoRef = React.useRef<HTMLIFrameElement>(null)

  const { activeSlide, loaded, sliderRef, instanceRef } = useSlider()
  const { sliderRef: preloadSliderRef } = useSlider()

  const [videos, setVideos] = React.useState<GetAllVideosQuery>()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await gql.GetAllVideos()
      setVideos(data)
    }
    fetchData()
  }, [])

  const [activeVideoUrl, setActiveVideoUrl] = React.useState('')
  const [openFullScreenVideo, setOpenFullScreenVideo] = React.useState(false)

  React.useEffect(() => {
    if (!videos) return

    setActiveVideoUrl(videos.videos.data[0].attributes.video_url)
  }, [videos])

  const videoUrl = getVideoUrl(activeVideoUrl)

  const handleOpenVideo = (videoUrl: string) => {
    setActiveVideoUrl(videoUrl)
    setOpenFullScreenVideo(true)
  }

  return (
    <>
      <FullScreenFrame setOpenFullScreen={setOpenFullScreenVideo} isOpenFullScreen={openFullScreenVideo}>
        <iframe
          id="ytplayer"
          width="60%"
          height="70%"
          allow="fullscreen"
          ref={iframeVideoRef}
          src={`${videoUrl}?controls=2`}
          allowFullScreen
          frameBorder="0"
        />
      </FullScreenFrame>

      <div className={styles['videos']} style={!test ? { marginBottom: '140px' } : {}}>
        {videos ? (
          <h2 className={cn(styles['videos__title'], 'section-title')}>Відео</h2>
        ) : (
          <Skeleton
            width="300"
            height="60"
            radius="10"
            className={'section-title-center'}
            styles={{ marginBottom: '50px' }}
          />
        )}

        {videos ? (
          <div ref={sliderRef} className={cn(stylesSlider['slider__wrapper'], 'keen-slider')}>
            {videos.videos.data.map((video, index) => (
              <div key={video.id} className={cn(styles['slide-wrapper'], 'keen-slider__slide')}>
                <div
                  className={cn(styles['videos__slider-inner'], {
                    [styles['active--slide']]: index === activeSlide,
                  })}
                  style={{
                    backgroundImage: `url(${import.meta.env.VITE_API_URL}${
                      video.attributes.video_poster.data.attributes.url
                    })`,
                  }}
                >
                  <h3 className={styles['videos__slider-title']}>{video.attributes.title}</h3>
                  <img
                    className={styles['videos__slider-play']}
                    width={80}
                    height={80}
                    src={playIcon}
                    onClick={() => handleOpenVideo(video.attributes.video_url)}
                    alt="video-play"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={preloadSliderRef} className={cn(stylesSlider['slider__wrapper'], 'keen-slider')}>
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  width="400"
                  height="300"
                  radius="0"
                  key={index}
                  data-fancybox="gallery"
                  className={cn(styles['slide-wrapper'], styles['slider__item-skeleton'], 'keen-slider__slide')}
                />
              ))}
          </div>
        )}

        {loaded && instanceRef.current && (
          <>
            <SliderArrow
              left
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={activeSlide === 0}
            />

            <SliderArrow
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={activeSlide === instanceRef.current.track.details.slides.length - 1}
            />
          </>
        )}
      </div>
    </>
  )
}
