import React from 'react'

import { GetAllGroupsQuery, gql } from '../../graphql/client'
import GroupSchedule from '../../components/GroupSchedule/GroupSchedule'
import { scrollToTop } from '../../utils/scrollToTop'

export const AllGroupsPage: React.FC = () => {
  const [groups, setGroups] = React.useState<GetAllGroupsQuery>()

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        document.title = `Групи | ЖБФФК`
        const groups = await gql.GetAllGroups()
        setGroups(groups)
      } catch (err) {
        console.log(err, 'all groups page error')
        window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      <GroupSchedule groups={groups} />
    </div>
  )
}
