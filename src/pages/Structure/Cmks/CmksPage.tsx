import React from 'react'

import styles from '../Structure.module.scss'
import { scrollToTop } from '../../../utils/scrollToTop'
import Skeleton from '../../../components/Skeleton/Skeleton'
import PageCard from '../../../components/PageCard/PageCard'
import { GetAllCycleCommissionsQuery, gql } from '../../../graphql/client'
import pageCardStyles from '../../../components/PageCard/PageCard.module.scss'

export const SmksPage = () => {
  const [cmkList, setCmkList] = React.useState<GetAllCycleCommissionsQuery>()

  React.useEffect(() => {
    scrollToTop()
    const fetchData = async () => {
      try {
        const cmkList = await gql.GetAllCycleCommissions()
        setCmkList(cmkList)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {cmkList ? (
        <h1 className={`${styles['main-title']} section-title`}>Циклові комісії</h1>
      ) : (
        <Skeleton
          width="300"
          height="50"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: '40px' }}
        />
      )}

      <div className="container">
        <div className={styles['smk-list']}>
          {cmkList
            ? cmkList.cycleCommissions.data.map((el) => (
                <PageCard
                  id={el.id}
                  key={el.id}
                  department={'cmks'}
                  slug={el.attributes.slug}
                  photo={el.attributes.main_photo.data[0].attributes.url}
                  name={el.attributes.name}
                />
              ))
            : Array(4)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} width="100%" height="250px" radius="0" className={pageCardStyles['item']} />
                ))}
        </div>
      </div>
    </>
  )
}
