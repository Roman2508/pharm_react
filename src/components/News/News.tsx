import React from 'react'
import cn from 'classnames'

import { NewsItem } from './NewsItem'
import Pagination from './Pagination'
import { gql } from '../../graphql/client'
import styles from './News.module.scss'
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { GetNewsByMonthQuery, NovinaEntity } from '../../graphql/__generated__'
import Skeleton from '../Skeleton/Skeleton'

interface INewsProps {
  showTitle?: boolean
  pageSize?: number
  addMarginBottom?: boolean
  newsData?: GetNewsByMonthQuery
  isFilter?: boolean
}

export const News: React.FC<INewsProps> = ({
  showTitle,
  newsData,
  pageSize = 3,
  isFilter = false,
  addMarginBottom = false,
}) => {
  const firstRender = React.useRef(false)

  // @ts-ignore
  const [news, setNews] = React.useState<NovinaEntity[]>(newsData ? newsData.novinas.data : [])
  const [pagesCount, setPagesCount] = React.useState(1)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (isFilter) {
      return
    }

    try {
      const fetchData = async () => {
        const newsData = await gql.GetNews()
        // @ts-ignore
        setNews(newsData.novinas.data)
        setPagesCount(newsData.novinas.meta.pagination.pageCount)
      }

      fetchData()
    } catch (err) {
      console.log('news error')
      window.location.replace('/404')
    }
  }, [])

  React.useEffect(() => {
    if (firstRender.current) {
      const fetchNewsItems = async () => {
        try {
          setIsLoading(true)
          const data = await gql.GetNews({ currentPage, pageSize })
          // @ts-ignore
          setNews(data.novinas.data)
        } catch (error) {
          alert('Помилка при отриманні даних!')
        } finally {
          setIsLoading(false)
        }
      }
      fetchNewsItems()
    } else {
      firstRender.current = true
    }
  }, [currentPage])

  return (
    <div
      className={cn(styles['news'], {
        [styles['news--indent']]: addMarginBottom,
      })}
    >
      <div className={styles['news__inner']}>
        {news && showTitle ? (
          <h2 className={cn(styles['news__title'], 'section-title')}>Новини</h2>
        ) : (
          <Skeleton
            width="300"
            height="60"
            radius="10"
            className={'section-title-center'}
            styles={{ marginBottom: 40 }}
          />
        )}
        <div
          className={cn(styles['news__items'], {
            [styles['news__items--loading']]: isLoading,
          })}
        >
          {news.length
            ? news.map((news) => (
                <NewsItem
                  key={news.id}
                  id={news.id}
                  title={news.attributes.title}
                  body={news.attributes.body}
                  date={news.attributes.date}
                  mainPhoto={news.attributes.main_photo.data.attributes.url}
                  photosForCollage={news.attributes.collage_photos.data}
                  videoUrl={news.attributes.video_url}
                />
              ))
            : Array(3)
                .fill(null)
                .map((_, i) => (
                  <div className={styles['news__item-skeleton']} key={i}>
                    <Skeleton width="400" height="500" radius="0" className={styles['news__item-skeleton-inner']} />
                  </div>
                ))}
        </div>

        {/* {isLoading && <LoadingSpinner />} */}

        {news.length ? (
          <Pagination pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        ) : (
          <Skeleton width="600" height="26" radius="0" className={styles['pagination-skeleton']} />
        )}
      </div>
    </div>
  )
}
