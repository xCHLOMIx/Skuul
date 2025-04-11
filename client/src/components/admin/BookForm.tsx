import { useState } from "react"
import PrimaryButton from "../universal/PrimaryButton"
import { LuSave } from "react-icons/lu"

export const BookForm = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [quantity, setQuantity] = useState<number>(1)
    const [error, setError] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("YES")
        const book = { title, author, quantity }
        setLoading(true)

        const postData = async () => {
            const response = await fetch('http://localhost:4000/books/add-book', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
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
            }
        }
        postData()
    }
    return (
        <div className={`flex flex-col gap-2.5 w-full mt-3 bg-white p-4 border border-alt5`}>
            {error && <div className='bg-red-50 p-3 border-2 border-red-300 text-red-400'>{error}</div>}
            <form className='w-full flex flex-col gap-2.5' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex flex-col gap-2.5 w-full'>
                    <label htmlFor="" className='font-light'>Book title:</label>
                    <input type="text" className='input w-full' placeholder='Rich Dad Poor Dad' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2.5 w-full'>
                    <label htmlFor="" className='font-light'>Book title:</label>
                    <input type="text" className='input w-full' placeholder='Rich Dad Poor Dad' onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2.5 w-full'>
                    <label htmlFor="" className='font-light'>Book author:</label>
                    <input type="text" className='input w-full' placeholder='Robert Kiyosaki' onChange={(e) => setQuantity(parseInt(e.target.value))} />
                </div>
                <PrimaryButton text='Save' styles='mt-2 w-max px-10' handleClick={() => { }} type='submit' icon={<LuSave size={22} />} isLoading={loading} />
            </form>
        </div>
    )
}