import React from 'react'
import cn from 'classnames'
import { useParams, Link } from 'react-router-dom'

import styles from './Teacher.module.scss'
import { gql, GetOneTeacherQuery } from '../../../graphql/client'
import pageStyles from '../../../components/PageContent/Page.module.scss'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'
import { FancyboxGallery } from '../../../components/FancyboxGallery/FancyboxGallery'
import Skeleton from '../../../components/Skeleton/Skeleton'

const tabs = [
  { id: 1, text: 'Загальна інформація' },
  { id: 2, text: 'Додаткова інформація' },
  { id: 3, text: 'Друковані праці' },
]

export const TeacherPage: React.FC = () => {
  const params = useParams()

  const [activeTab, setActiveTab] = React.useState(1)
  const [teacher, setTeacher] = React.useState<GetOneTeacherQuery>()

  React.useEffect(() => {
    if (!params.teacher_slug) return

    const fetchData = async () => {
      const teacher = await gql.GetOneTeacher({
        teacherSlug: `${params.teacher_slug}`,
      })
      setTeacher(teacher)
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      {teacher ? (
        <h1 className="section-title">{teacher.workers.data[0].attributes.name}</h1>
      ) : (
        <Skeleton
          width="400"
          height="50"
          radius="10"
          className={'section-title-center'}
          styles={{ marginBottom: '40px' }}
        />
      )}

      <div className={styles.wrapper}>
        <div className={styles['tabs-wrapper']}>
          <div className={styles.tabs}>
            {teacher
              ? tabs.map((el) => (
                  <div
                    key={el.id}
                    className={cn(styles.tab, {
                      [styles['active-tab']]: activeTab === el.id,
                    })}
                    onClick={() => setActiveTab(el.id)}
                  >
                    {el.text}
                  </div>
                ))
              : Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} width="220" height="60" radius="0" className={styles['skeleton-tab']} />
                  ))}
          </div>
        </div>

        {teacher ? (
          <>
            {activeTab === 1 && (
              <div className={`${styles.content} ${styles['general-information']}`}>
                <div className={styles.img}>
                  <FancyboxGallery>
                    <a
                      data-fancybox="gallery"
                      href={`${import.meta.env.VITE_API_URL}${
                        teacher.workers.data[0].attributes.photo.data.attributes.url
                      }`}
                      style={{ maxWidth: '200px' }}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}${
                          teacher.workers.data[0].attributes.photo.data.attributes.url
                        }`}
                        alt={'teacher photo'}
                        width={150}
                        height={200}
                      />
                    </a>
                  </FancyboxGallery>
                </div>
                <div className={pageStyles['page-conent']}>
                  <Link
                    className={styles['mb-10']}
                    to={`/structure/cmks/${teacher.workers.data[0].attributes.cycle_commission.data.attributes.slug}`}
                  >
                    {teacher.workers.data[0].attributes.cycle_commission.data.attributes.name}
                  </Link>

                  {teacher.workers.data[0].attributes.email && (
                    <>
                      <span className={styles['mb-10']}>
                        <b>Електронна пошта:</b>
                      </span>
                      <Link className={styles['mb-10']} to={`mailto:${teacher.workers.data[0].attributes.email}`}>
                        {teacher.workers.data[0].attributes.email}
                      </Link>
                    </>
                  )}

                  <span className={styles['mb-10']}>
                    <b>Навчальні предмети, які викладає:</b>
                  </span>

                  <ul className={styles['lessons']}>
                    {teacher.workers.data[0].attributes.lessons.data.map((lesson) => (
                      /* @ts-ignore */
                      <li key={lesson.id}>«{lesson.attributes.name}»</li>
                    ))}
                  </ul>

                  <span className={styles['mb-10']}>
                    <b>Посада, науковий ступінь, вчене звання, кваліфікаційна категорія:</b>
                  </span>
                  <p>
                    {/* @ts-ignore  */}
                    {teacher.workers.data[0].attributes.status
                      ? /* @ts-ignore  */
                        teacher.workers.data[0].attributes.status
                      : teacher.workers.data[0].attributes.position}
                  </p>

                  <Link to={`/rozklad/vikladach/${teacher.workers.data[0].attributes.slug}`}>
                    Переглянути розклад викладача
                  </Link>
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className={cn(styles.content, pageStyles['page-conent'])}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: teacher.workers.data[0].attributes.additional_information,
                  }}
                />
              </div>
            )}
            {activeTab === 3 && (
              <div className={cn(styles.content, pageStyles['page-conent'])}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: teacher.workers.data[0].attributes.printed_works,
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className={styles['teacher-skeleton-wrapper']} style={{ display: 'flex' }}>
            <div className={styles['teacher-skeleton-left']}>
              <Skeleton width="200" height="300" radius="0" />
            </div>
            <div className={styles['teacher-skeleton-right']}>
              <Skeleton width="300" height="28" radius="0" styles={{ marginBottom: '10px' }} />
              <Skeleton width="260" height="28" radius="0" styles={{ marginBottom: '10px' }} />
              <Skeleton width="340" height="28" radius="0" styles={{ marginBottom: '10px' }} />
              <Skeleton width="400" height="28" radius="0" styles={{ marginBottom: '10px' }} />
              <Skeleton width="350" height="28" radius="0" styles={{ marginBottom: '10px' }} />
              <Skeleton width="600" height="28" radius="0" styles={{ marginBottom: '10px' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
