import React from 'react'
import cn from 'classnames'
import { useParams } from 'react-router-dom'

import styles from '../Structure.module.scss'
import { scrollToTop } from '../../../utils/scrollToTop'
import Skeleton from '../../../components/Skeleton/Skeleton'
import { gql, CycleCommissionEntity } from '../../../graphql/client'
import PageContnet from '../../../components/PageContent/PageContnet'
import StructureItemSkeleton from '../../../components/Skeleton/StructureItemSkeleton'

export const FullVidilenyaPage: React.FC = () => {
  const params = useParams()

  const [vidilenyaData, setVidilenyaData] = React.useState<CycleCommissionEntity>()
  const [isFetching, setIsFetching] = React.useState(false)

  React.useEffect(() => {
    scrollToTop()

    if (!params) return

    const fetchData = async () => {
      try {
        setIsFetching(true)
        const vidilenyaData = await gql.GetVidilenya({ vidilenyaSlug: `${params.vidilenya_slug}` })
        // @ts-ignore
        setVidilenyaData(vidilenyaData.vidilenyas.data[0])
      } catch (err) {
        console.log(err, 'vidilenya page error')
      } finally {
        setIsFetching(false)
      }
    }

    fetchData()
  }, [params])

  return (
    <>
      {!isFetching ? (
        vidilenyaData && <h1 className={`${styles['main-title']} section-title`}>{vidilenyaData?.attributes?.name}</h1>
      ) : (
        <Skeleton
          width="300"
          height="50"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: '40px' }}
        />
      )}

      {!isFetching ? (
        vidilenyaData && (
          <div className={cn(styles['page-conent'])}>
            {String(vidilenyaData.attributes.layout) === 'col_1_8_3' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet colSize="col-1-12" pageComponents={vidilenyaData.attributes.left_sidebar} />
                <PageContnet
                  colSize="col-8-12"
                  pageComponents={vidilenyaData.attributes.page_components}
                  mainPhotoCol={vidilenyaData.attributes.main_photo.data}
                />
                <PageContnet colSize="col-3-12" pageComponents={vidilenyaData.attributes.right_sidebar} />
              </div>
            ) : String(vidilenyaData.attributes.layout) === 'col_2_7_4' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet colSize="col-2-12" pageComponents={vidilenyaData.attributes.left_sidebar} />
                <PageContnet
                  colSize="col-7-12"
                  pageComponents={vidilenyaData.attributes.page_components}
                  mainPhotoCol={vidilenyaData.attributes.main_photo.data}
                />
                <PageContnet colSize="col-4-12" pageComponents={vidilenyaData.attributes.right_sidebar} />
              </div>
            ) : String(vidilenyaData.attributes.layout) === 'col_8_4' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet
                  colSize="col-8-12"
                  pageComponents={vidilenyaData.attributes.page_components}
                  mainPhotoCol={vidilenyaData.attributes.main_photo.data}
                />
                <PageContnet colSize="col-4-12" pageComponents={vidilenyaData.attributes.right_sidebar} />
              </div>
            ) : String(vidilenyaData.attributes.layout) === 'col_9_3' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet
                  colSize="col-9-12"
                  pageComponents={vidilenyaData.attributes.page_components}
                  mainPhotoCol={vidilenyaData.attributes.main_photo.data}
                />
                <PageContnet colSize="col-3-12" pageComponents={vidilenyaData.attributes.right_sidebar} />
              </div>
            ) : (
              <PageContnet colSize="col-12" pageComponents={vidilenyaData.attributes.page_components} />
            )}
          </div>
        )
      ) : (
        <StructureItemSkeleton />
      )}
    </>
  )
}
