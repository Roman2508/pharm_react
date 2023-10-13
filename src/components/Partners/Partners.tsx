import React from 'react'
import cn from 'classnames'

import PartnerItems from './PartnerItems'
import { gql } from '../../graphql/client'
import styles from './Partners.module.scss'
import { GetPartnersQuery } from '../../graphql/__generated__'
import Skeleton from '../Skeleton/Skeleton'

export const Partners: React.FC = () => {
  const [partners, setPartners] = React.useState<GetPartnersQuery>()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await gql.GetPartners()
      setPartners(data)
    }

    fetchData()
  }, [])

  return (
    <div className={styles['partners']}>
      {partners ? (
        <h2 className={cn(styles['partners__title'], 'section-title')}>Наші партнери</h2>
      ) : (
        <Skeleton
          width="300"
          height="50"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: 10 }}
        />
      )}
      {partners ? (
        <p className={styles['partners__descr']}>
          Ми співпрацюємо з багатьма закладами освіти та роботодавцями. Завжди відкриті для нових пропозицій
        </p>
      ) : (
        <Skeleton
          width="600"
          height="60"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: 40 }}
        />
      )}

      {partners ? (
        <PartnerItems partners={partners} />
      ) : (
        <div>
          <div className={cn(styles['partners__skeleton-wrapper'], styles['partners__skeleton-wrapper--first'])}>
            <Skeleton
              width="150"
              height="100"
              radius="10"
              className={'section-title-center'}
              styles={{ marginBottom: 10 }}
            />
            <Skeleton
              width="150"
              height="100"
              radius="10"
              className={'section-title-center'}
              styles={{ marginBottom: 10 }}
            />
            <Skeleton
              width="150"
              height="100"
              radius="10"
              className={'section-title-center'}
              styles={{ marginBottom: 10 }}
            />
            <Skeleton
              width="150"
              height="100"
              radius="10"
              className={'section-title-center'}
              styles={{ marginBottom: 10 }}
            />
          </div>
          <div className={cn(styles['partners__skeleton-wrapper'], styles['partners__skeleton-wrapper--second'])}>
            <Skeleton
              width="150"
              height="100"
              radius="10"
              className={'section-title-center'}
              styles={{ marginBottom: 10 }}
            />
            <Skeleton
              width="150"
              height="100"
              radius="10"
              className={'section-title-center'}
              styles={{ marginBottom: 10 }}
            />
            <Skeleton
              width="150"
              height="100"
              radius="10"
              className={'section-title-center'}
              styles={{ marginBottom: 10 }}
            />
            <Skeleton
              width="150"
              height="100"
              radius="10"
              className={'section-title-center'}
              styles={{ marginBottom: 10 }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
