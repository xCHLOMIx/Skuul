import React from 'react'

interface Prop {
    error: string
}

const ErrorComponent: React.FC<Prop> = ({ error }) => {
    return (
        <>
            <div className='bg-red-50 p-3 border-2 border-red-300 text-red-400'>
                {error}
            </div>
        </>
    )
}

export default ErrorComponent