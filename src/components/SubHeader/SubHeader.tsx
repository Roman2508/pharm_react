import React from 'react'

import styles from './SubHeader.module.scss'
import { Link } from 'react-router-dom'
import { GetMainScreenQuery } from '../../graphql/__generated__'

interface ISubHeaderProps {
  mainScreenData: GetMainScreenQuery
}

const SubHeader: React.FC<ISubHeaderProps> = ({ mainScreenData }) => {
  const logo = mainScreenData?.header?.data?.attributes?.Header?.logo?.data?.attributes?.url
    ? `${import.meta.env.VITE_API_URL}${mainScreenData.header?.data?.attributes?.Header?.logo?.data?.attributes?.url}`
    : ''

  return (
    <div className={styles['sub-header']}>
      <div className={styles['sub-header__video']}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            background: `transparent url('${import.meta.env.VITE_API_URL}${mainScreenData?.header?.data?.attributes
              ?.Header.secondaryVideoPoster.data.attributes.url}') 50% 50% / cover no-repeat`,
          }}
        >
          <source
            src={`${import.meta.env.VITE_API_URL}${mainScreenData?.header?.data?.attributes?.Header?.background?.data
              ?.attributes?.url}`}
            type="video/mp4"
          />
        </video>
      </div>

      <div className="container">
        <div className={styles['sub-header__inner']}>
          <Link className={styles['sub-header__logo-box']} to="/">
            {logo && (
              <img className={styles['sub-header__logo']} src={logo} alt="cloud icon" width={140} height={140} />
            )}
          </Link>
          <h1 className={styles['sub-header__title']}>{mainScreenData?.header?.data?.attributes?.Header?.title}</h1>
        </div>
      </div>
    </div>
  )
}

export default SubHeader
