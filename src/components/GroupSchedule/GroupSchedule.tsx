import React from 'react'

import styles from './GroupSchedule.module.scss'
import { GetAllGroupsQuery } from '../../graphql/__generated__'
import { sortGroupsByDepartments } from '../../utils/sortGroupsByDepartments'
import { Link } from 'react-router-dom'
import Skeleton from '../Skeleton/Skeleton'
import GroupScheduleSkeleton from '../Skeleton/GroupScheduleSkeleton'

interface IGroupScheduleProps {
  groups?: GetAllGroupsQuery
}

const educationalDegrees = [
  {
    slug: 'OPS_Fahovij_molodshij_bakalavr_na_bazi_9_klasiv',
    name: 'ОПС Фаховий молодший бакалавр (на базі 9 класів)',
  },
  {
    slug: 'OPS_Fahovij_molodshij_bakalavr_na_bazi_11_klasiv',
    name: 'ОПС Фаховий молодший бакалавр (на базі 11 класів)',
  },
  {
    slug: 'OR_pershij_bakalavrskij',
    name: 'ОР перший (бакалаврський)',
  },
]

const GroupSchedule: React.FC<IGroupScheduleProps> = ({ groups }) => {
  const { zaochnaForma, farmLab } = sortGroupsByDepartments(groups?.groups.data)

  return (
    <div className={styles['wrapper']}>
      {groups ? (
        <>
          <h2 className={`text-center ${styles['lg-title']}`}>Фармацевтично-лабораторне відділення</h2>
          <h3 className={`text-center ${styles['md-title']}`}>226 Фармація, промислова фармація</h3>
        </>
      ) : (
        <>
          <Skeleton
            width="700"
            height="44"
            radius="10"
            className={'section-title-center'}
            styles={{ marginBottom: '20px' }}
          />
          <Skeleton
            width="600"
            height="36"
            radius="10"
            className={'section-title-center'}
            styles={{ marginBottom: '20px' }}
          />
        </>
      )}

      {groups ? (
        educationalDegrees.map((degree) => {
          const currentDegreeGroups = farmLab.filter(
            (g) =>
              String(g.attributes.specialty) === 'Farmacziya_promislova_farmacziya_226' &&
              String(g.attributes.educationalDegree) === String(degree.slug)
          )

          if (currentDegreeGroups.length) {
            return (
              <>
                <div className={styles['section-name']}>{degree.name}</div>
                <div className={styles['groups-wrapper']}>
                  {currentDegreeGroups.map((group) => (
                    <Link className={styles['group-item']} to={`/rozklad/grupa/${group.attributes.name}`}>
                      {group.attributes.name}
                    </Link>
                  ))}
                </div>
              </>
            )
          }
        })
      ) : (
        <GroupScheduleSkeleton />
      )}

      {groups ? (
        <h3 className={`text-center ${styles['md-title']}`} style={{ marginTop: '50px' }}>
          224 Технології медичної діагностики та лікування
        </h3>
      ) : (
        <Skeleton
          width="600"
          height="36"
          radius="10"
          className={'section-title-center'}
          styles={{ margin: '50px auto 20px' }}
        />
      )}

      {groups ? (
        educationalDegrees.map((degree) => {
          const currentDegreeGroups = farmLab.filter(
            (g) =>
              String(g.attributes.specialty) === 'Tehnologiyi_medichnoyi_diagnostiki_ta_likuvannya_224' &&
              String(g.attributes.educationalDegree) === String(degree.slug)
          )

          if (currentDegreeGroups.length) {
            return (
              <>
                <div className={styles['section-name']}>{degree.name}</div>
                <div className={styles['groups-wrapper']}>
                  {currentDegreeGroups.map((group) => (
                    <Link className={styles['group-item']} to={`/rozklad/grupa/${group.attributes.name}`}>
                      {group.attributes.name}
                    </Link>
                  ))}
                </div>
              </>
            )
          }
        })
      ) : (
        <GroupScheduleSkeleton />
      )}

      {groups ? (
        <h2 className={`text-center ${styles['lg-title']}`} style={{ marginTop: '50px' }}>
          Відділення заочної форми навчання
        </h2>
      ) : (
        <Skeleton
          width="600"
          height="36"
          radius="10"
          className={'section-title-center'}
          styles={{ margin: '50px auto 20px' }}
        />
      )}

      {groups ? (
        educationalDegrees.map((degree) => {
          const currentDegreeGroups = zaochnaForma.filter(
            (g) =>
              String(g.attributes.specialty) === 'Farmacziya_promislova_farmacziya_226' &&
              String(g.attributes.educationalDegree) === String(degree.slug)
          )

          if (currentDegreeGroups.length) {
            return (
              <>
                <div className={styles['section-name']}>{degree.name}</div>
                <div className={styles['groups-wrapper']}>
                  {currentDegreeGroups.map((group) => (
                    <Link className={styles['group-item']} to={`/rozklad/grupa/${group.attributes.name}`}>
                      {group.attributes.name}
                    </Link>
                  ))}
                </div>
              </>
            )
          }
        })
      ) : (
        <GroupScheduleSkeleton />
      )}
    </div>
  )
}

export default GroupSchedule
