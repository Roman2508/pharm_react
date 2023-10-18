import React from 'react'

import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import HeaderNavigation from './HeaderNavigation'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { GetHeaderScheduleQuery, HeaderEntityResponse } from '../../graphql/__generated__'

interface IHeaderProps {
  headerData: HeaderEntityResponse
  headerSchedule: GetHeaderScheduleQuery
}

const Header: React.FC<IHeaderProps> = ({ headerData, headerSchedule }) => {
  const [stickyClass, setStickyClass] = React.useState<'header--static' | 'header--sticky'>('header--static')

  const isSticky = () => {
    const scrollTop = window.scrollY
    const stickyClass = scrollTop >= 82 ? 'header--sticky' : 'header--static'
    setStickyClass(stickyClass)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  }, [])

  if (!headerData || !headerSchedule) {
    return <LoadingSpinner />
  }

  return (
    <header className={styles['header']}>
      <div className={'container'}>
        <div className={styles['header__top']}>
          {/* HEADER ICONS */}

          <div className={styles['header__left-col']}>
            {headerData.data.attributes.Header.headerIcons.slice(0, 2).map((icon) => {
              return (
                <Link className={styles['header__top-link']} to={icon.link} key={icon.id} target="_blank">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${icon.icon.data.attributes.url}`}
                    width={20}
                    height={40}
                    alt="icon"
                  />
                  <span className={styles['header__top-link-title']}>{icon.text}</span>
                </Link>
              )
            })}
          </div>

          <Link
            className={styles['header__top-link']}
            to={headerData.data.attributes.Header.headerIcons[2].link}
            target="_blank"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}${
                headerData.data.attributes.Header.headerIcons[2].icon.data.attributes.url
              }`}
              alt="ENG icon"
              width={35}
              height={26}
            />
            <span className={styles['header__eng-title']}>{headerData.data.attributes.Header.headerIcons[2].text}</span>
          </Link>

          {/* HEADER SOCIAL */}

          <div className={styles['social__wrapper']}>
            <p>{headerData.data.attributes.Header.social.text}</p>
            <ul className={styles['social__list']}>
              {headerData.data.attributes.Header.social.icons.map((el) => (
                <li className={styles['social__list-item']} key={el.id}>
                  <Link to={el.link} target="_blank">
                    <img
                      className={styles['social__list-icon']}
                      src={`${import.meta.env.VITE_API_URL}${el.icon.data.attributes.url}`}
                      alt="social icon"
                      height={40}
                      width={20}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* HEADER NAVIGATION */}

        <HeaderNavigation headerData={headerData} stickyClass={stickyClass} headerSchedule={headerSchedule} />
      </div>
    </header>
  )
}

export default Header
