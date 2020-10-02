import React from 'react'

function Button (props) {
  const { name, onClick, className } = props

  return (
    <button
      type='button'
      className={className}
      onClick={onClick}
    >
      <span>{name}</span>
    </button>
  )
}

export default Button
