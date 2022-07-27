import cn from 'clsx'
import {  Children } from 'react'
import { default as FastMarquee } from 'react-fast-marquee'



const Marquee = ({
  children,
  
}) => {
  

  return (
    <FastMarquee gradient={false} className='w-full min-w-full relative flex flex-row items-center overflow-hidden py-0 h-48 '>
      {Children.map(children, (child) => ({
        ...child,
        props: {
          ...child.props,
          className: cn(child.props.className, ),
        },
      }))}
    </FastMarquee>
  )
}

export default Marquee
