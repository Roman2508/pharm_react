import React from 'react'
import cn from 'classnames'

import styles from './PanoramasComponent.module.scss'
import FullScreenFrame from '../../FullScreenFrame/FullScreenFrame'

interface IPanoramsComponentProps {
  component: any
  colSize: string
}

const PanoramsComponent: React.FC<IPanoramsComponentProps> = ({ component, colSize }) => {
  const isBg = component.withBackground

  const [isOpenFullScreen, setOpenFullScreen] = React.useState(false)
  const [frameUrl, setFrameUrl] = React.useState('')

  const handleOpenFullScreenFrame = (url: string) => {
    setFrameUrl(url)
    setOpenFullScreen(true)
  }

  return (
    <React.Fragment key={component.id}>
      <FullScreenFrame isOpenFullScreen={isOpenFullScreen} setOpenFullScreen={setOpenFullScreen}>
        <iframe frameBorder="0" width="90%" height="90%" src={frameUrl} allowFullScreen />
      </FullScreenFrame>

      <div className={styles['wrapper']} style={isBg ? { backgroundColor: '#1d5d9b' } : {}} key={component.id}>
        <div className={cn({ ['container']: colSize === 'col-12' })}>
          {component.title && (
            <h3
              className={cn(styles['title'], {
                [styles['with-backgrount']]: isBg,
              })}
            >
              {component.title}
            </h3>
          )}

          <div className={styles['items']}>
            {component.panoramas.data.map((el: any) => (
              <a
                key={el.id}
                className={cn(styles['item'], 'scale-photo-hover', 'scale-icon')}
                onClick={() => handleOpenFullScreenFrame(el.attributes.link)}
              >
                <img
                  className={styles['panorama-img']}
                  src={`${import.meta.env.VITE_API_URL}${el.attributes.poster.data.attributes.url}`}
                  width={el.attributes.poster.data.attributes.width || 250}
                  height={el.attributes.poster.data.attributes.height || 250}
                  alt="panorama"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PanoramsComponent
