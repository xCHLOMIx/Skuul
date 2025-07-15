import { useState } from "react"
import PrimaryButton from "../universal/PrimaryButton"
import { LuSave } from "react-icons/lu"
import { useAlertContext } from "../../hooks/universal/useAlertContext"
import { useBookContext } from "../../hooks/universal/useBookContext"
import Book from "../universal/Book"
import { useAdminAuthContext } from "../../hooks/admin/useAdminAuthContext"
import ErrorComponent from "../universal/ErrorComponent"

export const BookForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [quantity, setQuantity] = useState<number>(0)
    const [error, setError] = useState<string>('')
    const { dispatch: alert } = useAlertContext()
    const { dispatch } = useBookContext()
    const { state } = useAdminAuthContext()
    const book = { title, author, quantity, status: "Available" }
    // console.log(state.admin.title)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const postData = async () => {
            const response = await fetch('/api/books/add', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${state.admin.token}`
                },
                body: JSON.stringify(book)
            })

            const json = await response.json()

            if (!response.ok) {
                setLoading(false)
                setError(json.error)
            }
            if (response.ok) {
                setLoading(false)
                setError('')
                dispatch({ type: 'ADD_BOOK', payload: json })
                alert({ type: 'SET_ALERT', payload: 'Book successfuly saved' })
                const timer = setTimeout(() => {
                    alert({ type: 'REMOVE_ALERT' })
                }, 3000)
                setTitle('')
                setAuthor('')
                setQuantity(0)
                return () => clearTimeout(timer)
            }
        }
        postData()
    }
    return (
        <div className={`grid grid-cols-4 max-lg:grid-cols-1 gap-2.5 w-full mt-3 bg-white p-4 border border-alt5`}>
            <div className="col-span-3">
                {error && <ErrorComponent error={error} />}
                <form className='w-full flex flex-col gap-2.5' onSubmit={(e) => handleSubmit(e)}>
                    <div className='flex flex-col gap-2.5 w-full'>
                        <label htmlFor="" className='font-light'>Book title:</label>
                        <input
                            type="text"
                            className='input w-full'
                            placeholder='Rich Dad Poor Dad'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className='flex flex-col gap-2.5 w-full'>
                        <label htmlFor="" className='font-light'>Book author:</label>
                        <input type="text"
                            className='input w-full'
                            placeholder='Robert Kiyosaki'
                            onChange={(e) => setAuthor(e.target.value)}
                            value={author}
                        />
                    </div>
                    <div className='flex flex-col gap-2.5 w-full'>
                        <label htmlFor="" className='font-light'>Book quantity:</label>
                        <input type="text"
                            className='input w-full'
                            placeholder='1'
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                    </div>
                    <PrimaryButton text='Save' styles='mt-2 w-max px-10' handleClick={() => { }} type='submit' icon={<LuSave size={22} />} isLoading={loading} />
                </form>
            </div>
            <div className="max-lg:hidden h-full bg-red-100">
                <Book book={book} styles="h-full" />
            </div>
        </div>
    )
}