import React, { useState } from 'react'
import PrimaryButton from '../universal/PrimaryButton'
import ErrorComponent from '../universal/ErrorComponent'
import { useAlertContext } from '../../hooks/universal/useAlertContext'

const ReminderForm: React.FC = () => {
    const [deadline, setDeadline] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { dispatch } = useAlertContext()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const fetchData = async () => {
            const response = await fetch('/api/notifications/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deadline })
            })

            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            } else {
                setIsLoading(false)
                dispatch({ type: 'SET_ALERT', payload: 'Notifications sent successfully' })

                const timer = setTimeout(() => {
                    dispatch({ type: 'REMOVE_ALERT', payload: 'Notifications sent successfully' })
                }, 3000)

                return () => clearTimeout(timer)
            }
        }

        fetchData()
    }
    return (
        <div className='flex justify-end py-2'>
            <div className='bg-white p-4 border border-alt7 gap-4 flex flex-col w-max'>
                {error && <ErrorComponent error={error} />}
                <form onSubmit={(e) => handleSubmit(e)} className='bg-white flex gap-2'>
                    <input type="date" onChange={(e) => { setDeadline(e.target.value) }} className='input' />
                    <PrimaryButton text='Notify' isLoading={isLoading} styles='px-7' />
                </form>
            </div>
        </div>
    )
}

export default ReminderForm