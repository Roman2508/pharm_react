import React from 'react'

import { gql } from '../graphql/client'
import { News } from '../components/News/News'
import Skeleton from '../components/Skeleton/Skeleton'
import NewsArchive from '../components/News/NewsArchive'
import { GetAllNewsDatesQuery, GetNewsQuery } from '../graphql/__generated__'
import { scrollToTop } from '../utils/scrollToTop'

export const NewsPage: React.FC = () => {
  const [newsData, setNewsData] = React.useState<GetNewsQuery>()
  const [newsDates, setNewsDates] = React.useState<GetAllNewsDatesQuery>()

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      const newsData = await gql.GetNews({ pageSize: 6 })
      const newsDates = await gql.GetAllNewsDates()

      setNewsDates(newsDates)
      setNewsData(newsData)
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      {newsData ? (
        <div className={`section-title`} style={{ marginBottom: '40px' }}>
          Всі новини
        </div>
      ) : (
        <Skeleton
          width="300"
          height="50"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: '40px' }}
        />
      )}

      <div className="page-row">
        <div className="col-news-9-12">
          <News newsData={newsData} pageSize={6} />
        </div>
        <div className="col-news-3-12">
          <NewsArchive newsDates={newsDates} />
        </div>
      </div>
    </div>
  )
}
