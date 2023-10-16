import React from 'react'
import { Link } from 'react-router-dom'

import Skeleton from '../Skeleton/Skeleton'
import styles from './TeachersSchedule.module.scss'
import { GetAllCycleCommissionsTeachersQuery } from '../../graphql/__generated__'

interface ITeachersScheduleProps {
  cycleCommissions?: GetAllCycleCommissionsTeachersQuery
}

const TeachersSchedule: React.FC<ITeachersScheduleProps> = ({ cycleCommissions }) => {
  return (
    <div>
      {cycleCommissions ? (
        cycleCommissions.cycleCommissions.data.map((cmk) => (
          <div>
            <div className={styles['section-name']}>{cmk.attributes.name}</div>
            <div className={styles['section-items']}>
              {cmk.attributes.workers.data.map((teacher) => {
                const teacherName = teacher.attributes.name.split(' ')

                return (
                  <div className={styles['teacher']}>
                    <Link className={`underlined-link`} to={`/rozklad/vikladach/${teacher.attributes.slug}`}>
                      {`${teacherName[0]} ${teacherName[1][0]}.${teacherName[2][0]}.`}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      ) : (
        <React.Fragment>
          {Array(3)
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
                  {Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton key={index} width="166" height="45" radius="0" styles={{ margin: '10px' }} />
                    ))}
                </div>
              </React.Fragment>
            ))}
        </React.Fragment>
      )}
    </div>
  )
}

export default TeachersSchedule
