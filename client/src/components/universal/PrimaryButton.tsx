import React from 'react'
import { ScaleLoader } from 'react-spinners';

interface Prop {
  icon: any,
  text: string,
  styles: string
  handleClick: () => void;
  isLoading: boolean
  type: "submit" | "reset" | "button" | undefined
}

const PrimaryButton: React.FC<Prop> = ({ text, styles, icon, handleClick, isLoading, type }) => {
  return (
    <>
      <button
        type={type}
        onClick={handleClick}
        className={`${styles} ${isLoading ? "cursor-not-allowed" : "cursor-pointer "} bg-primary text-white p-3.5 font-semibold ${isLoading ? "" : "hover:bg-white hover:text-primary"} border-2 transition duration-200 border-primary hover:border-primary`}
        disabled={isLoading}
      >
        {isLoading ? <ScaleLoader color='white' height={12} width={4} /> : (<>{icon}{text}</>)}
      </button>
    </>
  )
}

export default PrimaryButton