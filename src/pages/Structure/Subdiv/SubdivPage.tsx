import React from 'react'

import styles from '../Structure.module.scss'
import PageCard from '../../../components/PageCard/PageCard'
import Skeleton from '../../../components/Skeleton/Skeleton'
import { GetAllSubdivisionQuery, gql } from '../../../graphql/client'
import pageCardStyles from '../../../components/PageCard/PageCard.module.scss'
import { scrollToTop } from '../../../utils/scrollToTop'

const SubdivPage = () => {
  const [subdivList, setSubdivList] = React.useState<GetAllSubdivisionQuery>()

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        document.title = `Підрозділи | ЖБФФК`
        const subdivList = await gql.GetAllSubdivision()
        setSubdivList(subdivList)
      } catch (err) {
        console.log(err, 'subdiv page error')
        window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {subdivList ? (
        <h1 className={`${styles['main-title']} section-title`}>Підрозділи</h1>
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
        {subdivList ? (
          <div className={styles['smk-list']}>
            {subdivList.subdivisions.data.map((el) => (
              <PageCard
                key={el.id}
                id={el.id}
                department={'subdiv'}
                slug={el.attributes.slug}
                photo={el.attributes.main_photo.data[0].attributes.url}
                name={el.attributes.name}
              />
            ))}
          </div>
        ) : (
          Array(4)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} width="100%" height="250px" radius="0" className={pageCardStyles['item']} />
            ))
        )}
      </div>
    </>
  )
}

export default SubdivPage
