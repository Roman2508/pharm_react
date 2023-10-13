import React from 'react'

import styles from '../PageContent/Page.module.scss'

interface IPartnersProps {
  component: any
}

const Partners: React.FC<IPartnersProps> = ({ component }) => {
  return (
    <div>
      <div className={styles['section-name']}>{component.title}</div>
      <div className={styles['partners-wrapper']}>
        {component.partners.data.map((el: any) => {
          const partnerLink = el.attributes.presentation_link ? el.attributes.presentation_link : el.attributes.link

          return (
            <a
              key={el.id}
              className={styles['partner-item']}
              title={el.attributes.name}
              href={partnerLink}
              target="_blank"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${el.attributes.logo.data.attributes.url}`}
                width={el.attributes.logo.data.attributes.width}
                height={el.attributes.logo.data.attributes.height}
                alt={el.attributes.logo.data.attributes.name}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Partners
