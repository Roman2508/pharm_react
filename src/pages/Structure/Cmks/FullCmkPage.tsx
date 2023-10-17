import React from 'react'
import cn from 'classnames'
import { useParams } from 'react-router-dom'

import styles from '../Structure.module.scss'
import { scrollToTop } from '../../../utils/scrollToTop'
import Skeleton from '../../../components/Skeleton/Skeleton'
import { gql, CycleCommissionEntity } from '../../../graphql/client'
import PageContnet from '../../../components/PageContent/PageContnet'
import StructureItemSkeleton from '../../../components/Skeleton/StructureItemSkeleton'

export const FullSmksPage = () => {
  const params = useParams()

  const [cmkData, setCmkData] = React.useState<CycleCommissionEntity>()
  const [isFetching, setIsFetching] = React.useState(false)

  React.useEffect(() => {
    scrollToTop()

    if (!params.cmks_slug) return

    const fetchData = async () => {
      try {
        setIsFetching(true)
        const cmkData = await gql.GetCycleCommission({ pageUrl: `/${params.cmks_slug}` })
        // @ts-ignore
        setCmkData(cmkData.cycleCommissions.data[0])
        document.title = `${cmkData.cycleCommissions.data[0].attributes.SEO.title} | ЖБФФК`
      } catch (err) {
        console.log(err, 'cmk error')
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
        cmkData && <h1 className={`${styles['main-title']} section-title`}>{cmkData.attributes.name}</h1>
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
        cmkData && (
          <div className={cn(styles['page-conent'])}>
            {String(cmkData.attributes.layout) === 'col_1_8_3' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet colSize="col-1-12" pageComponents={cmkData.attributes.left_sidebar} />
                <PageContnet
                  colSize="col-8-12"
                  pageComponents={cmkData.attributes.page_components}
                  mainPhotoCol={cmkData.attributes.main_photo.data}
                  cmkHead={cmkData.attributes.headOfCommission.data.attributes}
                  cmkTeachers={cmkData.attributes.workers.data}
                  cmkSlug={cmkData.attributes.slug}
                />
                <PageContnet colSize="col-3-12" pageComponents={cmkData.attributes.right_sidebar} />
              </div>
            ) : String(cmkData.attributes.layout) === 'col_2_7_4' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet colSize="col-2-12" pageComponents={cmkData.attributes.left_sidebar} />
                <PageContnet
                  colSize="col-7-12"
                  pageComponents={cmkData.attributes.page_components}
                  mainPhotoCol={cmkData.attributes.main_photo.data}
                />
                <PageContnet
                  colSize="col-4-12"
                  pageComponents={cmkData.attributes.right_sidebar}
                  cmkHead={cmkData.attributes.headOfCommission.data.attributes}
                  cmkTeachers={cmkData.attributes.workers.data}
                  cmkSlug={cmkData.attributes.slug}
                />
              </div>
            ) : String(cmkData.attributes.layout) === 'col_8_4' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet
                  colSize="col-8-12"
                  pageComponents={cmkData.attributes.page_components}
                  mainPhotoCol={cmkData.attributes.main_photo.data}
                />
                <PageContnet
                  colSize="col-4-12"
                  pageComponents={cmkData.attributes.right_sidebar}
                  cmkHead={cmkData.attributes.headOfCommission.data.attributes}
                  cmkTeachers={cmkData.attributes.workers.data}
                  cmkSlug={cmkData.attributes.slug}
                />
              </div>
            ) : String(cmkData.attributes.layout) === 'col_9_3' ? (
              <div className={cn('page-row', 'container')}>
                <PageContnet
                  colSize="col-9-12"
                  pageComponents={cmkData.attributes.page_components}
                  mainPhotoCol={cmkData.attributes.main_photo.data}
                />
                <PageContnet
                  colSize="col-3-12"
                  pageComponents={cmkData.attributes.right_sidebar}
                  cmkHead={cmkData.attributes.headOfCommission.data.attributes}
                  cmkTeachers={cmkData.attributes.workers.data}
                  cmkSlug={cmkData.attributes.slug}
                />
              </div>
            ) : (
              <PageContnet colSize="col-12" pageComponents={cmkData.attributes.page_components} />
            )}
          </div>
        )
      ) : (
        <StructureItemSkeleton />
      )}
    </>
  )
}
