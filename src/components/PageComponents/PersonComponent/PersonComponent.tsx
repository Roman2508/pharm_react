import React from 'react'

import { Link } from 'react-router-dom'
import styles from './PersonComponent.module.scss'

interface IPersonComponentProps {
  component: any
}

const PersonComponent: React.FC<IPersonComponentProps> = ({ component }) => {
  const phone = component.worker.data.attributes.phone
  const phoneWithoutSymbols = phone ? phone.replace('(', '').replace(')', '').replace('-', '').replace('_', '') : ''

  const personLink = component.worker.data.attributes.cycle_commission.data
    ? `/structure/cmks/${component.worker.data.attributes.cycle_commission.data.attributes.slug}/${component.worker.data.attributes.slug}`
    : '/'

  return (
    <div className={styles['wrapper']}>
      <Link to={personLink} target="_blank">
        <div className={styles['photo']}>
          <img
            src={`${import.meta.env.VITE_API_URL}${component.worker.data.attributes.photo.data.attributes.url}`}
            width={400 || component.worker.data.attributes.photo.data.attributes.width}
            height={400 || component.worker.data.attributes.photo.data.attributes.height}
            alt={`worker photo`}
          />
        </div>
      </Link>

      <div className={styles['info']}>
        <Link to={personLink} target="_blank">
          <h5 className={styles['name']}>{component.worker.data.attributes.name}</h5>
        </Link>

        <p className={styles['position']}>{component.worker.data.attributes.position}</p>
        {component.worker.data.attributes.phone && (
          <div>
            <a className={styles['tel']} href={`tel:${phoneWithoutSymbols}`}>
              {component.worker.data.attributes.phone}
            </a>
          </div>
        )}
        <div>
          <a className={styles['email']} href={`mailto:${component.worker.data.attributes.email}`}>
            {component.worker.data.attributes.email}
          </a>
        </div>
      </div>
    </div>
  )
}

export default PersonComponent
