import React from 'react'

import { gql } from '../graphql/client'
import { News } from '../components/News/News'
import { scrollToTop } from '../utils/scrollToTop'
import Skeleton from '../components/Skeleton/Skeleton'
import NewsArchive from '../components/News/NewsArchive'
import { GetAllNewsDatesQuery } from '../graphql/__generated__'

export const NewsPage: React.FC = () => {
  const [newsDates, setNewsDates] = React.useState<GetAllNewsDatesQuery>()

  React.useEffect(() => {
    scrollToTop()
    document.title = `Новини | ЖБФФК`
    const fetchData = async () => {
      try {
        const newsDates = await gql.GetAllNewsDates()

        setNewsDates(newsDates)
      } catch (err) {
        console.log(err, 'filter news page error')
        window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      {newsDates ? (
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
          <News pageSize={6} isFilter />
        </div>
        <div className="col-news-3-12">
          <NewsArchive newsDates={newsDates} />
        </div>
      </div>
    </div>
  )
}
