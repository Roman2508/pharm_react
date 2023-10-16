import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import styles from './PageCard.module.scss'

interface IPageCardProps {
  id: string
  slug: string
  name: string
  photo: string
  department?: string
}

const PageCard: React.FC<IPageCardProps> = ({ id, slug, photo, name }) => {
  // const link = department ? `${department}/${slug}` : `${slug}`

  return (
    <Link key={id} className={styles['item']} to={slug}>
      <div className={cn(styles['photo'], 'scale-photo-hover', 'hand-pointer')}>
        <img src={`${import.meta.env.VITE_API_URL}${photo}`} width={350} height={350} alt="subdivisions" />
      </div>
      <div className={styles['text-box']}>
        <p className={styles['text']}>{name}</p>
      </div>
    </Link>
  )
}

export default PageCard
