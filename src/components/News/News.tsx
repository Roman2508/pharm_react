import React from 'react'
import cn from 'classnames'

import { NewsItem } from './NewsItem'
import Pagination from './Pagination'
import styles from './News.module.scss'
import { gql } from '../../graphql/client'
import Skeleton from '../Skeleton/Skeleton'
import { GetNewsByMonthQuery, NovinaEntity } from '../../graphql/__generated__'
import { scrollToTop } from '../../utils/scrollToTop'
import { useParams } from 'react-router-dom'
import determineMaxDaysInMonth from '../../utils/determineMaxDaysInMonth'

interface INewsProps {
  showTitle?: boolean
  pageSize?: number
  addMarginBottom?: boolean
  newsData?: GetNewsByMonthQuery
  isFilter?: boolean
}

export const News: React.FC<INewsProps> = ({ showTitle, newsData, pageSize = 3, addMarginBottom = false }) => {
  const params = useParams()

  // @ts-ignore
  const [news, setNews] = React.useState<NovinaEntity[]>(newsData ? newsData.novinas.data : [])
  const [pagesCount, setPagesCount] = React.useState(1)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)

  /* GET ALL NEWS */
  React.useEffect(() => {
    if (Object.keys(params).length) {
      return
    }

    scrollToTop()

    const fetchData = async () => {
      try {
        setIsLoading(true)
        const newsData = await gql.GetNews({ pageSize })
        
        setCurrentPage(1)
        // @ts-ignore
        setNews(newsData.novinas.data)
        setPagesCount(newsData.novinas.meta.pagination.pageCount)
      } catch (err) {
        console.log('news error')
        window.location.replace('/404')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params, pageSize])

  /* PAGINATION */
  React.useEffect(() => {
    scrollToTop()

    if (!Object.keys(params).length) {
      const fetchNewsItems = async () => {
        try {
          setIsLoading(true)
          const data = await gql.GetNews({ currentPage, pageSize })
          // @ts-ignore
          setNews(data.novinas.data)
          /*  */
        } catch (err) {
          console.log(err, 'news page error')
          window.location.replace('/404')
          /*  */
        } finally {
          setIsLoading(false)
        }
      }

      fetchNewsItems()
    } else {
      const fetchNewsItems = async () => {
        try {
          setIsLoading(true)

          const month = typeof params.month === 'string' ? params.month : ''
          const maxDayInMonth = determineMaxDaysInMonth(month)

          const newsData = await gql.GetNewsByMonth({
            startDate: `${params.year}-${params.month}-01`,
            endDate: `${params.year}-${params.month}-${maxDayInMonth}`,
            pageSize: 6,
            currentPage,
          })
          // @ts-ignore
          setNews(newsData.novinas.data)
          /*  */
        } catch (err) {
          console.log(err, 'news page error')
          window.location.replace('/404')
          /*  */
        } finally {
          setIsLoading(false)
        }
      }

      fetchNewsItems()
    }
  }, [currentPage, pageSize])

  /* FILTER */
  React.useEffect(() => {
    if (Object.keys(params).length !== 2) return

    scrollToTop()

    const fetchData = async () => {
      try {
        setIsLoading(true)

        const month = typeof params.month === 'string' ? params.month : ''
        const maxDayInMonth = determineMaxDaysInMonth(month)

        const newsData = await gql.GetNewsByMonth({
          startDate: `${params.year}-${params.month}-01`,
          endDate: `${params.year}-${params.month}-${maxDayInMonth}`,
          pageSize: 6,
        })

        // @ts-ignore
        setNews(newsData.novinas.data)
        setCurrentPage(1)
        setPagesCount(newsData.novinas.meta.pagination.pageCount)
      } catch (err) {
        console.log(err, 'filter news page error')
        window.location.replace('/404')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params])

  return (
    <div
      className={cn(styles['news'], {
        [styles['news--indent']]: addMarginBottom,
      })}
    >
      <div className={styles['news__inner']}>
        {news && showTitle ? (
          <h2 className={cn(styles['news__title'], 'section-title')}>Новини</h2>
        ) : showTitle ? (
          <Skeleton
            width="300"
            height="60"
            radius="10"
            className={'section-title-center'}
            styles={{ marginBottom: 40 }}
          />
        ) : null}

        <div
          className={cn(styles['news__items'], {
            [styles['news__items--loading']]: isLoading,
          })}
        >
          {!isLoading
            ? (news.length ? news : []).map((news) => (
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

        {news.length ? (
          <Pagination pagesCount={pagesCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        ) : (
          <Skeleton width="600" height="26" radius="0" className={styles['pagination-skeleton']} />
        )}
      </div>
    </div>
  )
}
