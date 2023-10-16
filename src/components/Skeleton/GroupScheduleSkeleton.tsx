import React from 'react'
import Skeleton from './Skeleton'

interface IGroupScheduleSkeletonProps {
  degreesCount?: number
  groupsCount?: number
}

const GroupScheduleSkeleton = ({ degreesCount = 1, groupsCount = 6 }: IGroupScheduleSkeletonProps) => {
  return (
    <>
      {Array(degreesCount)
        .fill(null)
        .map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton
              width="100%"
              height="48"
              radius="0"
              className={'section-title-center'}
              styles={{ marginBottom: '20px' }}
            />
            <div>
              {Array(groupsCount)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} width="66" height="45" radius="0" styles={{ margin: '10px' }} />
                ))}
            </div>
          </React.Fragment>
        ))}
    </>
  )
}

export default GroupScheduleSkeleton
