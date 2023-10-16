import React from 'react'

import styles from './AdministrationCard.module.scss'
import { FancyboxGallery } from '../FancyboxGallery/FancyboxGallery'

interface IAdministrationCardProps {
  photo: string
  position: string
  name: string
  phone: string
  mail: string
}

const AdministrationCard: React.FC<IAdministrationCardProps> = ({ photo, position, name, phone, mail }) => {
  return (
    <div className={styles['administration__item']}>
      <FancyboxGallery className={'page-gallery'}>
        <a
          className={styles['administration__item-top']}
          data-fancybox="gallery"
          href={`${import.meta.env.VITE_API_URL}${photo}`}
        >
          <img src={`${import.meta.env.VITE_API_URL}${photo}`} width={300} height={400} alt="administration" />
          <p className={styles['administration__item-position']}>{position}</p>
        </a>
      </FancyboxGallery>

      <div className={styles['administration__item-name']}>{name}</div>
      <a className={styles['administration__item-tel']} href="tel:0412242545">
        {phone}
      </a>
      <a className={styles['administration__item-mail']} href="mailto:boychuck.iryna@pharm.zt.ua">
        {mail}
      </a>
    </div>
  )
}

export default AdministrationCard
