import React from 'react'

import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { Fancybox as NativeFancybox } from '@fancyapps/ui'

export const FancyboxGallery = (props: any) => {
  const containerRef = React.useRef(null)

  React.useEffect(() => {
    const container = containerRef.current

    const delegate = props.delegate || '[data-fancybox]'
    const options = props.options || {}

    NativeFancybox.bind(container, delegate, options)

    return () => {
      NativeFancybox.unbind(container)
      NativeFancybox.close()
    }
  })

  return (
    <div ref={containerRef} className={props.className}>
      {props.children}
    </div>
  )
}
