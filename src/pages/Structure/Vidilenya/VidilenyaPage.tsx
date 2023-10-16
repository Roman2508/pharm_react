import React from 'react'

import styles from '../Structure.module.scss'
import PageCard from '../../../components/PageCard/PageCard'
import Skeleton from '../../../components/Skeleton/Skeleton'
import { VidilenyaEntity, gql } from '../../../graphql/client'
import pageCardStyles from '../../../components/PageCard/PageCard.module.scss'
import { scrollToTop } from '../../../utils/scrollToTop'

export const ViddilenyaPage: React.FC = () => {
  const [vidilenyaList, setVidilenyaList] = React.useState<VidilenyaEntity[]>([])

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        const vidilenyaList = await gql.GetAllVidilenyas()
        // @ts-ignore
        setVidilenyaList(vidilenyaList.vidilenyas.data)
      } catch (err) {
        console.log(err, 'vidilenya page error')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      {vidilenyaList.length ? (
        <h1 className={`${styles['main-title']} section-title`}>Відділення</h1>
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
          {vidilenyaList.length
            ? vidilenyaList.map((el) => (
                <PageCard
                  id={el.id}
                  department={'vidilenya'}
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
