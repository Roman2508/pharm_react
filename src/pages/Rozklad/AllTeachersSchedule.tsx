import React from 'react'

import { scrollToTop } from '../../utils/scrollToTop'
import Skeleton from '../../components/Skeleton/Skeleton'
import { gql, GetAllCycleCommissionsTeachersQuery } from '../../graphql/client'
import TeachersSchedule from '../../components/TeachersSchedule/TeachersSchedule'

export const AllTeachersSchedulePage: React.FC = () => {
  const [cycleCommissions, setCycleCommissions] = React.useState<GetAllCycleCommissionsTeachersQuery>()

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        document.title = `Викладачі | ЖБФФК`
        const cycleCommissions = await gql.GetAllCycleCommissionsTeachers()
        setCycleCommissions(cycleCommissions)
      } catch (err) {
        console.log(err, 'all cycle commissions page error')
        window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="container">
        {cycleCommissions ? (
          <div className={`section-title`} style={{ marginBottom: '40px' }}>
            Викладачі
          </div>
        ) : (
          <Skeleton
            width="300"
            height="50"
            radius="10"
            className={'section-title-center'}
            styles={{ marginBottom: '40px' }}
          />
        )}

        <TeachersSchedule cycleCommissions={cycleCommissions} />
      </div>
    </>
  )
}
