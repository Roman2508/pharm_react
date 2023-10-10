import React from 'react'
import cn from 'classnames'

import { gql } from '../../graphql/client'
import styles from './Gallery.module.scss'
import { GetHomePageGalleryQuery } from '../../graphql/__generated__'
import Skeleton from '../Skeleton/Skeleton'

export const Gallery: React.FC = () => {
  const [data, setData] = React.useState<GetHomePageGalleryQuery>()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await gql.GetHomePageGallery()
      setData(data)
    }
    fetchData()
  }, [])

  return (
    <div className={styles['gallery']}>
      <h2 className={cn(styles['gallery__title'], 'section-title')}>{data?.homePageGallery.data.attributes.title}</h2>

      <div className="container">
        <div className={styles['gallery__content']}>
          <div className={styles['gallery__col']}>
            {data
              ? data.homePageGallery.data.attributes.GalleryItems.slice(0, 2).map((el) => (
                  <a className={styles['gallery__item']} target="_blank" href={el.link} key={el.id}>
                    <img
                      width={400}
                      height={400}
                      className={styles['gallery__item-img']}
                      src={`${import.meta.env.VITE_API_URL}${
                        el.photo.data.attributes ? el.photo.data.attributes.url : ''
                      }`}
                      alt="event"
                    />
                    <h4 className={styles['gallery__item-title']}>{el.title}</h4>
                  </a>
                ))
              : Array(2)
                  .fill(null)
                  .map((_, index) => <Skeleton key={index} width="100%" height="300" radius="15" />)}
          </div>

          <div className={styles['gallery__col']}>
            {data
              ? data.homePageGallery.data.attributes.GalleryItems.slice(2, 4).map((el) => (
                  <a className={styles['gallery__item']} target="_blank" href={el.link} key={el.id}>
                    <img
                      width={400}
                      height={400}
                      className={styles['gallery__item-img']}
                      src={`${import.meta.env.VITE_API_URL}${
                        el.photo.data.attributes ? el.photo.data.attributes.url : ''
                      }`}
                      alt="event"
                    />
                    <h4 className={styles['gallery__item-title']}>{el.title}</h4>
                  </a>
                ))
              : Array(2)
                  .fill(null)
                  .map((_, index) => <Skeleton key={index} width="100%" height="300" radius="15" />)}
          </div>

          <div className={styles['gallery__col']}>
            {data ? (
              <a
                className={styles['gallery__item-large']}
                target="_blank"
                href={data.homePageGallery.data.attributes.GalleryItems[4].link}
              >
                <img
                  width={828}
                  height={466}
                  className={styles['gallery__item-img']}
                  src={`${import.meta.env.VITE_API_URL}${
                    data.homePageGallery.data.attributes.GalleryItems[4].photo.data.attributes.url
                  }`}
                  alt="event"
                />
                <h4 className={styles['gallery__item-title']}>
                  {data?.homePageGallery.data.attributes.GalleryItems[4].title}
                </h4>
              </a>
            ) : (
              <Skeleton width="100%" height="100%" radius="15" />
            )}
          </div>

          <div className={cn(styles['gallery__col'], 'gallery__col--last-col')}>
            {data
              ? data.homePageGallery.data.attributes.GalleryItems.slice(5, 7).map((el) => (
                  <a className={styles['gallery__item']} target="_blank" href={el.link} key={el.id}>
                    <img
                      width={400}
                      height={400}
                      className={styles['gallery__item-img']}
                      src={`${import.meta.env.VITE_API_URL}${
                        el.photo.data.attributes ? el.photo.data.attributes.url : ''
                      }`}
                      alt="event"
                    />
                    <h4 className={styles['gallery__item-title']}>{el.title}</h4>
                  </a>
                ))
              : Array(2)
                  .fill(null)
                  .map((_, index) => <Skeleton key={index} width="100%" height="300" radius="15" />)}
          </div>
        </div>
      </div>
    </div>
  )
}
