import React from 'react'

interface Prop {
    text: string,
    styles: string
}

const PrimaryButton : React.FC<Prop> = ({ text, styles }) => {
  return (
    <button className={`${styles} bg-primary text-white p-3.5 font-semibold cursor-pointer`}>{text}</button>
  )
}

export default PrimaryButton