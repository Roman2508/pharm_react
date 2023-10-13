import React from 'react'
import cn from 'classnames'

import styles from '../PageContent/Page.module.scss'
import { FancyboxGallery } from '../FancyboxGallery/FancyboxGallery'
import replaceDataInBodyComponent from '../../utils/replaceDataInBodyComponent'

interface IFullSizePersonProps {
  component: any
}

const FullSizePerson: React.FC<IFullSizePersonProps> = ({ component }) => {
  const componentBody = replaceDataInBodyComponent(component?.body)

  return (
    <div className="container">
      <div className={styles['full-size__wrapper']}>
        <FancyboxGallery className={'page-gallery'}>
          <a
            data-fancybox="gallery"
            href={`${import.meta.env.VITE_API_URL}${component.photo.data.attributes.url}`}
            className={cn(styles['full-size__img'], 'gallery-item', 'hand-pointer', 'scale-icon')}
            style={{ maxWidth: '200px' }}
          >
            <img
              src={`${import.meta.env.VITE_API_URL}${component.photo.data.attributes.url}`}
              alt="gallery photo"
              width={200}
              height={250}
            />
          </a>
        </FancyboxGallery>
        <div className={styles['full-size__content']}>
          <h3 className={styles['full-size__title']}>{component.name}</h3>
          <div className={styles['full-size__text']} dangerouslySetInnerHTML={{ __html: componentBody }} />
        </div>
      </div>
    </div>
  )
}

export default FullSizePerson
