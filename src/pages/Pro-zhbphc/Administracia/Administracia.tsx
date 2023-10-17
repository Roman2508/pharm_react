import React from 'react'

import styles from '../ProZhbphc.module.scss'
import Skeleton from '../../../components/Skeleton/Skeleton'
import { GetAdministrationQuery, gql } from '../../../graphql/client'
import AdministrationCard from '../../../components/AdministrationCard/AdministrationCard'
import administrationStyles from '../../../components/AdministrationCard/AdministrationCard.module.scss'
import { scrollToTop } from '../../../utils/scrollToTop'

export const Administration: React.FC = () => {
  const [administration, setAdministration] = React.useState<GetAdministrationQuery>()

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        const administration = await gql.GetAdministration()
        setAdministration(administration)
        document.title = `Адміністрація | ЖБФФК`
      } catch (err) {
        console.log(err, 'administration page error')
        window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className={styles['administration']}>
        <div className="container">
          {administration ? (
            <h1 className={`${styles['administration__title']} section-title`}>Адміністрація</h1>
          ) : (
            <Skeleton
              width="300"
              height="50"
              radius="10"
              className={'section-title-center'}
              styles={{ marginBottom: '40px' }}
            />
          )}
          <div className={styles['administration__list']}>
            {administration ? (
              administration.workers.data.map((el, index) => (
                <AdministrationCard
                  key={index}
                  photo={el.attributes.photo.data.attributes.url}
                  position={el.attributes.position}
                  name={el.attributes.name}
                  phone={el.attributes.phone}
                  mail={el.attributes.email}
                />
              ))
            ) : (
              <>
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div className={administrationStyles['administration__item']} key={index}>
                      <Skeleton
                        width="300"
                        height="400"
                        radius="0"
                        styles={{ margin: '0 10px 25px 10px' }}
                        className={administrationStyles['item-skeleton']}
                      />
                      <Skeleton
                        width="270"
                        height="25"
                        radius="0"
                        styles={{ margin: '0 10px 10px 10px' }}
                        className={administrationStyles['item-skeleton-name']}
                      />
                      <Skeleton
                        width="180"
                        height="20"
                        radius="0"
                        styles={{ margin: '0 10px 10px 10px' }}
                        className={administrationStyles['item-skeleton-email']}
                      />
                      <Skeleton
                        width="240"
                        height="20"
                        radius="0"
                        styles={{ margin: '0 10px 50px 10px' }}
                        className={administrationStyles['item-skeleton-tel']}
                      />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
