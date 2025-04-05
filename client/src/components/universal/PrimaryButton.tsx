import React from 'react'

interface Prop {
  icon: any,
  text: string,
  styles: string
  handleClick: () => void;
}

const PrimaryButton: React.FC<Prop> = ({ text, styles, icon, handleClick }) => {
  return (
    <button onClick={handleClick} className={`${styles} bg-primary text-white p-3.5 font-semibold cursor-pointer hover:bg-white hover:text-primary border-2 transition duration-200 border-primary hover:border-primary`}>{icon}{text}</button>
  )
}

export default PrimaryButton