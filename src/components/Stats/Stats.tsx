import React from 'react'
import styles from './Stats.module.scss'
import { gql } from '../../graphql/client'
import Skeleton from '../Skeleton/Skeleton'
import { GetHomePageStatQuery } from '../../graphql/__generated__'

const Stats: React.FC = () => {
  const [data, setData] = React.useState<GetHomePageStatQuery>()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await gql.GetHomePageStat()
      setData(data)
    }

    fetchData()
  }, [])

  return (
    <>
      {data ? (
        <div className={styles['stats']}>
          <div className={'container'}>
            <div className={styles['stats__inner']}>
              {data.homePageStat.data.attributes.stats.map((el) => (
                <div className={styles['stats__item']} key={el.id}>
                  <div className={styles['stats__item-inner']}>
                    <h3 className={styles['stats__number']}>{el.num}</h3>
                    <p className={styles['stats__text']}>{el.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Skeleton width="100%" height="180" radius="0" className={styles['skeleton-stats']} />
      )}
    </>
  )
}

export default Stats
