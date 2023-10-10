import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import styles from './About.module.scss'
import { gql } from '../../graphql/client'
import Skeleton from '../Skeleton/Skeleton'
// import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { GetHomePageAboutQuery } from '../../graphql/__generated__'

const About: React.FC = () => {
  const [data, setData] = React.useState<GetHomePageAboutQuery>()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await gql.GetHomePageAbout()
      setData(data)
    }

    fetchData()
  }, [])

  return (
    <div className={cn(styles['about'], styles['about--page'])}>
      <div className={'container'}>
        <div className={cn(styles['about__wrapper'], styles['vertical-center'])}>
          <div className={cn(styles['about__content'], styles['about--page'])}>
            {data ? (
              <h2>{data.homePageAbout.data.attributes.title}</h2>
            ) : (
              <Skeleton
                width="300"
                height="60"
                radius="10"
                className={styles['title-skeleton']}
                styles={{ marginBottom: 50 }}
              />
            )}

            {data ? (
              <div dangerouslySetInnerHTML={{ __html: data.homePageAbout.data.attributes.body }} />
            ) : (
              <>
                <Skeleton width="100%" height="60" radius="10" styles={{ marginBottom: 20 }} />
                <Skeleton width="100%" height="60" radius="10" styles={{ marginBottom: 20 }} />
                <Skeleton width="100%" height="60" radius="10" styles={{ marginBottom: 20 }} />
              </>
            )}

            {data ? (
              <Link className={styles['about__button']} to="/pro-zhbphc/istoria-col">
                {data.homePageAbout.data.attributes.buttonText}
              </Link>
            ) : (
              <Skeleton
                width="240"
                height="56"
                radius="10"
                className={styles['button-skeleton']}
                styles={{ marginTop: 20 }}
              />
            )}
          </div>

          <div className={styles['about__image']}>
            {data ? (
              <img
                src={`${import.meta.env.VITE_API_URL}${data.homePageAbout.data.attributes.photo.data.attributes.url}`}
                alt="about photo"
                width={620}
                height={400}
              />
            ) : (
              <Skeleton width="580" height="400" radius="10" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
