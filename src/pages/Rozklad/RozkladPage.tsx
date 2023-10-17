import React from 'react'

import GroupSchedule from '../../components/GroupSchedule/GroupSchedule'
import TeachersSchedule from '../../components/TeachersSchedule/TeachersSchedule'
import { GetAllCycleCommissionsTeachersQuery, GetAllGroupsQuery, gql } from '../../graphql/client'
import Skeleton from '../../components/Skeleton/Skeleton'
import { scrollToTop } from '../../utils/scrollToTop'

export const RozkladPage: React.FC = () => {
  const [groups, setGroups] = React.useState<GetAllGroupsQuery>()
  const [cycleCommissions, setCycleCommissions] = React.useState<GetAllCycleCommissionsTeachersQuery>()

  React.useEffect(() => {
    document.title = `Розклад | ЖБФФК`
    const fetchData = async () => {
      try {
        scrollToTop()

        const cycleCommissions = await gql.GetAllCycleCommissionsTeachers()
        const groups = await gql.GetAllGroups()

        setGroups(groups)
        setCycleCommissions(cycleCommissions)
      } catch (err) {
        console.log(err, 'rozklad page error')
        window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="container">
        {groups ? (
          <div className={`section-title`} style={{ marginBottom: '40px' }}>
            Групи
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

        <GroupSchedule groups={groups} />

        {cycleCommissions ? (
          <div className={`section-title`} style={{ margin: '60px 0 40px' }}>
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
