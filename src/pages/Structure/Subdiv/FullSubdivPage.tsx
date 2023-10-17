import React from 'react'
import cn from 'classnames'
import { useParams } from 'react-router-dom'

import styles from '../Structure.module.scss'
import { SubdivisionEntity, gql } from '../../../graphql/client'
import PageContnet from '../../../components/PageContent/PageContnet'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'
import { scrollToTop } from '../../../utils/scrollToTop'
import StructureItemSkeleton from '../../../components/Skeleton/StructureItemSkeleton'
import Skeleton from '../../../components/Skeleton/Skeleton'

export const FullSubdivPage = () => {
  const params = useParams()

  const [subdivData, setDubdivData] = React.useState<SubdivisionEntity>()
  const [isFetching, setIsFetching] = React.useState(false)

  React.useEffect(() => {
    scrollToTop()

    if (!params) return

    const fetchData = async () => {
      try {
        setIsFetching(true)
        const subdivData = await gql.GetSubdiv({
          subdivSlug: `${params.subdiv_slug}`,
        })
        // @ts-ignore
        setDubdivData(subdivData.subdivisions.data[0])
        document.title = `${subdivData.subdivisions.data[0].attributes.SEO.title} | ЖБФФК`
      } catch (err) {
        console.log(err, 'subdiv page error')
        window.location.replace('/404')
      } finally {
        setIsFetching(false)
      }
    }

    fetchData()
  }, [params])

  return (
    <>
      {!isFetching ? (
        subdivData && <h1 className={`${styles['main-title']} section-title`}>{subdivData.attributes.name}</h1>
      ) : (
        <Skeleton
          width="400"
          height="50"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: '40px' }}
        />
      )}

      {!isFetching ? (
        subdivData && (
          <div className={cn(styles['page-conent'])}>
            {String(subdivData.attributes.layout) === 'col_1_8_3' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet colSize="col-1-12" pageComponents={subdivData.attributes.left_sidebar} />
                <PageContnet
                  colSize="col-8-12"
                  pageComponents={subdivData.attributes.page_components}
                  mainPhotoCol={subdivData.attributes.main_photo.data}
                />
                <PageContnet colSize="col-3-12" pageComponents={subdivData.attributes.right_sidebar} />
              </div>
            ) : String(subdivData.attributes.layout) === 'col_2_7_4' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet colSize="col-2-12" pageComponents={subdivData.attributes.left_sidebar} />
                <PageContnet
                  colSize="col-7-12"
                  pageComponents={subdivData.attributes.page_components}
                  mainPhotoCol={subdivData.attributes.main_photo.data}
                />
                <PageContnet colSize="col-4-12" pageComponents={subdivData.attributes.right_sidebar} />
              </div>
            ) : String(subdivData.attributes.layout) === 'col_8_4' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet
                  colSize="col-8-12"
                  pageComponents={subdivData.attributes.page_components}
                  mainPhotoCol={subdivData.attributes.main_photo.data}
                />
                <PageContnet colSize="col-4-12" pageComponents={subdivData.attributes.right_sidebar} />
              </div>
            ) : String(subdivData.attributes.layout) === 'col_9_3' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet
                  colSize="col-9-12"
                  pageComponents={subdivData.attributes.page_components}
                  mainPhotoCol={subdivData.attributes.main_photo.data}
                />
                <PageContnet colSize="col-3-12" pageComponents={subdivData.attributes.right_sidebar} />
              </div>
            ) : (
              <PageContnet colSize="col-12" pageComponents={subdivData.attributes.page_components} />
            )}
          </div>
        )
      ) : (
        <StructureItemSkeleton />
      )}
    </>
  )
}
