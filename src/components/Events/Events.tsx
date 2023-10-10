import React from 'react'
import cn from 'classnames'
import 'keen-slider/keen-slider.min.css'

import styles from './Events.module.scss'
import { gql } from '../../graphql/client'
import useSlider from '../../utils/useSlider'
import Skeleton from '../Skeleton/Skeleton'
import { SliderArrow } from '../Slider/SliderArrows'
import stylesSlider from '../Slider/Slider.module.scss'
import convertMonthName from '../../utils/convertMonthName'
import { GetAllEventsQuery } from '../../graphql/__generated__'
import { FancyboxGallery } from '../FancyboxGallery/FancyboxGallery'
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

export const Events = () => {
  const { activeSlide, loaded, sliderRef, instanceRef } = useSlider()
  const { sliderRef: preloadSliderRef } = useSlider()

  const [events, setEvents] = React.useState<GetAllEventsQuery>()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await gql.GetAllEvents()
      setEvents(data)
    }
    fetchData()
  }, [])

  return (
    <div className={styles['events']}>
      {events ? (
        <h2 className={cn(styles['events__title'], 'section-title')}>Події</h2>
      ) : (
        <Skeleton width="300" height="60" radius="10" className={'section-title-center'} styles={{ marginBottom: 0 }} />
      )}

      {events ? (
        <FancyboxGallery>
          <div ref={sliderRef} className={cn(stylesSlider['slider__wrapper'], 'keen-slider')}>
            {events?.events?.data.map((el, index) => {
              const { day, month, year } = convertMonthName(el.attributes.date)

              return (
                <a
                  className={cn(styles['events__item'], 'keen-slider__slide')}
                  key={el.id}
                  data-fancybox="gallery"
                  href={`${import.meta.env.VITE_API_URL}${el.attributes.image.data.attributes.url}`}
                >
                  <div
                    className={cn(stylesSlider['slide--inner'], {
                      [stylesSlider['active--slide']]: activeSlide === index,
                    })}
                  >
                    <div className={cn(styles['events__item'])}>
                      <div className={styles['events__photo']}>
                        <img
                          src={`${import.meta.env.VITE_API_URL}${el.attributes.image.data.attributes.url}`}
                          width={el.attributes.image.data.attributes.width}
                          height={el.attributes.image.data.attributes.height}
                          alt={el.attributes.image.data.attributes.name}
                        />
                      </div>
                      <div className={styles['events__content']}>
                        <div className={styles['events__date']}>{`${day} ${month} ${year}`}</div>
                        <h5 className={styles['events__slider-title']}>{el.attributes.title}</h5>
                      </div>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </FancyboxGallery>
      ) : (
        <FancyboxGallery>
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
                  className={cn(styles['events__item'], styles['events__item-skeleton'], 'keen-slider__slide')}
                />
              ))}
          </div>
        </FancyboxGallery>
      )}

      {events && loaded && instanceRef.current && (
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
  )
}
