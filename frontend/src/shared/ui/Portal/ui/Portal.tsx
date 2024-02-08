import { FC, PropsWithChildren } from 'react'

import { createPortal } from 'react-dom'

interface PortalProps extends PropsWithChildren {
  element?: HTMLElement
}


export const Portal: FC<PortalProps> = (props) => {
  const {
    children,
    element = document.body
  } = props

  return createPortal(children, element)
}
