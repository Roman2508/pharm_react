import React from 'react'
import { useParams } from 'react-router-dom'

import styles from './Rozklad.module.scss'
import { scrollToTop } from '../../utils/scrollToTop'
import { WorkerEntity, gql } from '../../graphql/client'
import Skeleton from '../../components/Skeleton/Skeleton'

export const OneTeacherSchedulePage: React.FC = () => {
  const params = useParams()

  const [teacherData, setTeacherData] = React.useState<WorkerEntity>()
  const [isFetching, setIsFetching] = React.useState(false)

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        if (!params || !params.teacher_slug) return
        setIsFetching(true)
        const teacherData = await gql.GetTeacherSchedule({ teacherSlug: params.teacher_slug })
        // @ts-ignore
        setTeacherData(teacherData.workers.data[0])
        document.title = `${teacherData.workers.data[0].attributes.name} | ЖБФФК`
      } catch (err) {
        console.log(err, 'all groups page error')
        window.location.replace('/404')
      } finally {
        setIsFetching(false)
      }
    }

    fetchData()
  }, [params])

  const calendarUrl = teacherData
    ? `https://calendar.google.com/calendar/embed?showTitle=0&showTz=0&mode=AGENDA&height=600&wkst=2&hl=uk_UA&bgcolor=%23FFFFFF&src=${teacherData.attributes.calendar_id}&ctz=Europe%2FKiev`
    : ''

  return (
    <div className="container">
      {!isFetching ? (
        teacherData && (
          <div className={`section-title`} style={{ marginBottom: '40px' }}>
            {teacherData.attributes.name}
          </div>
        )
      ) : (
        <Skeleton
          width="300"
          height="50"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: '40px' }}
        />
      )}

      <div className={styles['schedule-box']}>
        {!isFetching ? (
          calendarUrl && (
            <iframe
              frameBorder="0"
              height="800"
              scrolling="auto"
              src={calendarUrl}
              style={{ borderWidth: 0 }}
              width="90%"
            ></iframe>
          )
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }} className={styles['rozklad-skeleton']}>
            <Skeleton width="90%" height="400" radius="0" />
          </div>
        )}
      </div>
    </div>
  )
}
