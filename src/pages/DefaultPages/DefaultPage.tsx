import React from 'react'
import cn from 'classnames'
import { useParams } from 'react-router-dom'

import styles from './Page.module.scss'
import { scrollToTop } from '../../utils/scrollToTop'
import { gql, PageEntity } from '../../graphql/client'
import PageContnet from '../../components/PageContent/PageContnet'
import Skeleton from '../../components/Skeleton/Skeleton'

export const DefaultPage: React.FC = () => {
  const params = useParams()

  const [pageData, setPageData] = React.useState<PageEntity>()
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        setIsLoading(true)
        if (params && params.first_lvl_url && params.second_lvl_url && params.third_lvl_url) {
          const pageData = await gql.GetPage({
            pageUrl: `/${params.first_lvl_url}/${params.second_lvl_url}/${params.third_lvl_url}`,
          })

          if (!pageData.pages.data[0]) {
            window.location.replace('/404')
          }

          // @ts-ignore
          setPageData(pageData.pages.data[0])
          return
        }
        if (params && params.first_lvl_url && params.second_lvl_url) {
          const pageData = await gql.GetPage({
            pageUrl: `/${params.first_lvl_url}/${params.second_lvl_url}`,
          })

          if (!pageData.pages.data[0]) {
            window.location.replace('/404')
          }

          // @ts-ignore
          setPageData(pageData.pages.data[0])
          return
        }
        if (params && params.first_lvl_url) {
          const pageData = await gql.GetPage({ pageUrl: `/${params.first_lvl_url}` })

          if (!pageData.pages.data[0]) {
            window.location.replace('/404')
          }

          // @ts-ignore
          setPageData(pageData.pages.data[0])
          return
        }
      } catch (err) {
        console.log(err, 'viklad sklad page error')
        window.location.replace('/404')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params])

  return (
    <div className={styles['---']}>
      {!isLoading ? (
        pageData && <h1 className={`${styles['page-title']} section-title`}>{pageData.attributes.title}</h1>
      ) : (
        <Skeleton
          width="300"
          height="50"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: '40px' }}
        />
      )}

      {!isLoading ? (
        pageData && (
          <>
            {!!pageData.attributes.main_photo.data && (
              <div className="container">
                <div className={'main-photo-page'}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${pageData.attributes.main_photo.data.attributes.url}`}
                    width={pageData.attributes.main_photo.data.attributes.width || 800}
                    height={pageData.attributes.main_photo.data.attributes.height || 400}
                    alt="main page photo"
                  />
                </div>
              </div>
            )}

            <div className={cn(styles['page-conent'])}>
              {String(pageData.attributes.layout) === 'col_1_8_3' ? (
                <div className={cn('page-row', 'container')}>
                  <PageContnet colSize="col-1-12" pageComponents={pageData.attributes.left_sidebar} />
                  <PageContnet colSize="col-8-12" pageComponents={pageData.attributes.page_components} />
                  <PageContnet colSize="col-3-12" pageComponents={pageData.attributes.right_sidebar} />
                </div>
              ) : String(pageData.attributes.layout) === 'col_2_7_3' ? (
                <div className={cn('page-row', 'container')}>
                  <PageContnet colSize="col-2-12" pageComponents={pageData.attributes.left_sidebar} />
                  <PageContnet colSize="col-7-12" pageComponents={pageData.attributes.page_components} />
                  <PageContnet colSize="col-4-12" pageComponents={pageData.attributes.right_sidebar} />
                </div>
              ) : String(pageData.attributes.layout) === 'col_2_8_2' ? (
                <div className={cn('page-row', 'container')}>
                  <PageContnet colSize="col-2-12" pageComponents={pageData.attributes.left_sidebar} />
                  <PageContnet colSize="col-8-12" pageComponents={pageData.attributes.page_components} />
                  <PageContnet colSize="col-2-12" pageComponents={pageData.attributes.right_sidebar} />
                </div>
              ) : String(pageData.attributes.layout) === 'col_8_4' ? (
                <div className={cn('page-row', 'container')}>
                  <PageContnet colSize="col-8-12" pageComponents={pageData.attributes.page_components} />
                  <PageContnet colSize="col-4-12" pageComponents={pageData.attributes.right_sidebar} />
                </div>
              ) : String(pageData.attributes.layout) === 'col_9_3' ? (
                <div className={cn('page-row', 'container')}>
                  <PageContnet colSize="col-9-12" pageComponents={pageData.attributes.page_components} />
                  <PageContnet colSize="col-3-12" pageComponents={pageData.attributes.right_sidebar} />
                </div>
              ) : (
                <PageContnet colSize="col-12" pageComponents={pageData.attributes.page_components} />
              )}
            </div>
          </>
        )
      ) : (
        <div className="container">
          <Skeleton width="100%" height="400" radius="10" className={'section-title-center'} />
        </div>
      )}
    </div>
  )
}
