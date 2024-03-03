import React, { memo } from 'react'

const Icon = memo(({ paths, icoName, size, color, className }) =>{
  return (
    <>
      <i className={`va-${icoName} fs--${size} ${color ? `color--${color}` : ''} ${className ? className : ''}`}>
        {Array.apply(null, { length: parseInt(paths) }).map((e, i) => 
          <span className={'path' + (i + 1)} key={i}></span>
        )}
      </i>

    </>
  )
})
export default Icon;