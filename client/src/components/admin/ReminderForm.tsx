import React, { useState } from 'react'
import PrimaryButton from '../universal/PrimaryButton'

const ReminderForm: React.FC = () => {
    const [date, setDate] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const fetchData = async () => {
            const response = await fetch('/api/notifications/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date })
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }
        }

        fetchData()
    }
    return (
        <div className='flex justify-end py-2'>
            <form onSubmit={(e) => handleSubmit(e)} className='bg-white p-4 border border-alt7 flex gap-2 w-max'>
                <input type="date" className='input' />
                {date}
                <PrimaryButton text='Notify' styles='px-7' />
            </form>
        </div>
    )
}

export default ReminderForm