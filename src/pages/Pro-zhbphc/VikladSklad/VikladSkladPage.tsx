import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import styles from './VidladSklad.module.scss'
import { scrollToTop } from '../../../utils/scrollToTop'
import Select from '../../../components/ui/Select/Select'
import Skeleton from '../../../components/Skeleton/Skeleton'
import SelectItem from '../../../components/ui/Select/SelectItem'
import { GetAllCycleCommissionsQuery, WorkerEntity, gql } from '../../../graphql/client'

export const VikladSkladPage: React.FC = () => {
  const [selectedCmk, setSelectedCmk] = React.useState('- Всі -')
  const [cmkTeachers, setCmkTeachers] = React.useState<readonly WorkerEntity[]>([])
  const [allTeachers, setAllTeachers] = React.useState<readonly WorkerEntity[]>([])
  const [cycleCommissions, setCycleCommissions] = React.useState<GetAllCycleCommissionsQuery>()

  React.useEffect(() => {
    scrollToTop()

    const fetchData = async () => {
      try {
        const teachers = await gql.GetAllTeachersFullInfo()
        const cycleCommissions = await gql.GetAllCycleCommissions()

        setCycleCommissions(cycleCommissions)

        //@ts-ignore
        setCmkTeachers(teachers.workers.data)
        //@ts-ignore
        setAllTeachers(teachers.workers.data)
      } catch (err) {
        console.log(err, 'viklad sklad page error')
        window.location.replace('/404')
      }
    }

    fetchData()
  }, [])

  React.useEffect(() => {
    if (!selectedCmk) return

    setCmkTeachers(() => {
      const filtred = allTeachers.filter((el) => {
        return el.attributes.cycle_commission.data.attributes.name === selectedCmk
      })

      if (filtred.length === 0) {
        return allTeachers
      }

      return filtred
    })
  }, [selectedCmk])

  return (
    <>
      <div className="container">
        {allTeachers.length ? (
          <div className={cn(styles['teachers__title'], 'section-title')}>Викладацький склад</div>
        ) : (
          <Skeleton
            width="300"
            height="50"
            radius="10"
            className={'section-title-center'}
            styles={{ marginBottom: '40px' }}
          />
        )}

        <div className={styles['teachers__filter']}>
          {cycleCommissions ? (
            <>
              <span className={styles['teachers__filter-text']}>ЦМК:</span>
              <Select width="360px" activeItem={selectedCmk}>
                <>
                  <SelectItem key={'- Всі -'} value="- Всі -" onClick={() => setSelectedCmk('- Всі -')} />

                  {cycleCommissions.cycleCommissions.data.map((el) => (
                    <SelectItem
                      key={el.attributes.name}
                      onClick={() => setSelectedCmk(el.attributes.name)}
                      value={el.attributes.name}
                    />
                  ))}
                </>
              </Select>
            </>
          ) : (
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <Skeleton width="50" height="26" radius="0" styles={{ margin: '0 24px 0 0' }} />
              <Skeleton width="360" height="44" radius="0" className={styles['select-skeleton']} />
            </div>
          )}
        </div>

        <div className={styles['teachers__list']}>
          {/* <!-- teachers --> */}
          {allTeachers.length > 0
            ? (cmkTeachers ? cmkTeachers : allTeachers).map((teacher) => {
                return (
                  <Link
                    className={styles['teachers__item']}
                    to={`/structure/cmks/${teacher.attributes.cycle_commission.data.attributes.slug}/${teacher.attributes.slug}`}
                    key={teacher.attributes.slug}
                  >
                    <div className={styles['teachers__image-box']}>
                      <img
                        src={`${import.meta.env.VITE_API_URL}${teacher.attributes.photo.data.attributes.url}`}
                        width={200}
                        height={300}
                        alt="teachers"
                      />
                    </div>
                    <div className={styles['teachers__item-info']}>
                      <a className={styles['teachers__item-name']} href="#">
                        {teacher.attributes.name}
                      </a>
                      <a className={styles['teachers__item-division']} href="#">
                        {teacher.attributes.cycle_commission.data.attributes.name}
                      </a>
                      <p className={styles['teachers__item-subjects']}>
                        {teacher.attributes.lessons.data.map((lesson, index) => (
                          <React.Fragment key={lesson.attributes.name}>
                            «{lesson.attributes.name}»
                            {teacher.attributes.lessons.data.length === index + 1 ? '. ' : ', '}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </Link>
                )
              })
            : Array(6)
                .fill(null)
                .map((_, index) => (
                  <div className={styles['teachers__item']} key={index}>
                    <div>
                      <Skeleton key={index} width="150" height="200" radius="0" styles={{ margin: '0 10px' }} />
                    </div>
                    <div className={styles['teachers__item-info']}>
                      <div>
                        <Skeleton key={index} width="100%" height="40" radius="0" styles={{ marginBottom: '10px' }} />
                      </div>
                      <div>
                        <Skeleton key={index} width="140" height="30" radius="0" styles={{ marginBottom: '10px' }} />
                      </div>
                      <div>
                        <Skeleton key={index} width="100" height="20" radius="0" styles={{ marginBottom: '5px' }} />
                      </div>
                      <div>
                        <Skeleton key={index} width="100" height="20" radius="0" styles={{ marginBottom: '5px' }} />
                      </div>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </>
  )
}
