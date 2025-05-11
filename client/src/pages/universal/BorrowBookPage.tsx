import React, { useRef, useState } from 'react'
import Student from '../../components/universal/Student'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { useFetch } from '../../hooks/universal/useFetch'
import BookBorrow from '../../components/universal/BookBorrow'

interface StudentInterface {
    id: number,
    name: string,
    theClass: string
}

const students: StudentInterface[] = [
    { id: 1, name: "Gutabarwa Chlomi", theClass: "L5 SOD" },
    { id: 2, name: "Mugisha Arsene Wenger", theClass: "L5 SOD" },
    { id: 3, name: "Habiyambere Isonga Hilton", theClass: "L3 SOD" },
    { id: 4, name: "Birimwimana Jireh Faith", theClass: "L5 SOD" },
]

interface BookInterface {
    _id: string,
    title: string,
    author: string,
    quantity: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

const BorrowBookPage: React.FC = () => {
    const { data }: { data: BookInterface[], isLoading: boolean } = useFetch("/api/books")

    const [searchStudent, setStudentSearch] = useState<string>('');
    const [searchBook, setBookSearch] = useState<string>('');

    const studentResults: StudentInterface[] = students.filter((student) => student.name.toLowerCase().includes(searchStudent.toLowerCase()));
    const bookResults: BookInterface[] = data.filter((book) => book.title.toLowerCase().includes(searchBook.toLowerCase()));

    const [theStudent, setTheStudent] = useState<StudentInterface>();
    const [books, setBooks] = useState<BookInterface[]>([]);

    const inputRefs = useRef<HTMLInputElement[]>([])


    const handleOnClick = (book: BookInterface) => {
        const isSelected = books.some((b) => b._id === book._id);

        if (isSelected) {
            setBooks(books.filter((b) => b._id !== book._id)); // Deselect the book
        } else {
            setBooks([...books, book]); // Select the book
        }
    };

    const handleChange = (e: any, index: number) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) inputRefs.current[index + 1].focus()
    }

    const handleKeyDown = (e: any, index: number) => {
        if (e.key === "Backspace" && e.target.value === '' && index > 0) inputRefs.current[index - 1].focus()
    }
    const [form, setForm] = useState<number>(1);
    return (
        <div className='bg-white h-screen overflow-hidden w-full flex justify-center relative'>
            <div className={`absolute ${form == 2 || form == 3 ? "-translate-y-full" : ""} transition duration-500 flex w-full max-w-[1000px] h-screen items-start flex-col gap-10 justify-center`}>
                {
                    !searchStudent &&
                    <div className='w-full'>
                        <h1 className='font-bold text-6xl'>Hello 👋</h1>
                        <p className='text-alt3'>Welcome to WMHS Library</p>
                    </div>
                }
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex gap-2'>
                        <h3>Who are you 🤔?</h3>
                        <p className='text-primary font-bold'>{theStudent && theStudent.name + " ? Click Next"}</p>
                    </div>
                    <form action="" className='w-full'>
                        <input
                            type="text"
                            placeholder='Search by student name...'
                            onChange={(e) => setStudentSearch(e.target.value)}
                            className='bg-white p-4 border-8 outline-0 border-black/10 w-full'
                        />
                    </form>
                    <div className={`${studentResults && searchStudent ? "" : "hidden"}  bar w-full end bg-white flex overflow-y-scroll max-h-96 flex-col justify-between p-3 gap-2 border border-alt5`}>
                        {studentResults && searchStudent &&
                            <div className='font-bold'>Results for "{searchStudent}"</div>
                        }
                        {studentResults && searchStudent && studentResults.map((student) => (
                            <label htmlFor={student.id.toString()} onClick={() => setTheStudent(student)}>
                                <input type="radio" id={student.id.toString()} className='peer sr-only' name='student' />
                                <Student student={student} />
                            </label>
                        ))}
                    </div>
                    {theStudent &&
                        <div className='w-full flex justify-end' onClick={() => setForm(2)}>
                            <PrimaryButton text='Next' styles='px-10 flex' />
                        </div>
                    }
                </div>
            </div>
            <div className={`${form == 1 ? "translate-y-full" : ""} ${form == 2 ? "translate-y-0" : ""} ${form == 3 ? "-translate-y-full" : ""} transition max-w-[900px] duration-500 absolute w-full h-screen flex items-start flex-col gap-10 justify-center`}>
                {
                    !searchBook &&
                    <div className='w-full'>
                        <h1 className='font-bold text-6xl'>Nice 👌</h1>
                    </div>
                }
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <h3>Gutabarwa Chlomi, What books do you want to borrow 😁?</h3>
                        <p className='text-alt3'>Select all the books you would like to borrow</p>
                    </div>
                    <form action="" className='w-full'>
                        <input
                            type="text"
                            placeholder='Search by student name...'
                            onChange={(e) => setBookSearch(e.target.value)}
                            className='bg-white p-4 border-8 outline-0 border-black/10 w-full'
                        />
                    </form>
                    <div className={`${bookResults && searchBook ? "" : "hidden"} bar w-full end bg-white flex overflow-y-scroll max-h-96 flex-col justify-between p-3 gap-2 border border-alt5`}>
                        {bookResults && searchBook &&
                            <div className='font-bold'>Results for "{searchBook}"</div>
                        }
                        <div className='grid grid-cols-4 gap-3'>
                            {bookResults.map((book) => (
                                <label htmlFor={book._id} key={book._id} className='' >
                                    <input
                                        type="checkbox"
                                        id={book._id}
                                        className='peer sr-only'
                                        onChange={() => handleOnClick(book)}
                                    />
                                    <BookBorrow book={book} />
                                </label>
                            ))}
                        </div>
                    </div>
                    {books.length > 0 &&
                        <div className='w-full flex justify-end gap-3' onClick={() => setForm(3)}>
                            <p className="text-sm text-gray-500">Are you sure you want to borrow {books.map(b => b.title).join(', ')}</p>
                            <PrimaryButton text='Next' styles='px-10 flex' />
                        </div>
                    }
                </div>
            </div>
            <div className={`${form == 1 || form == 2 ? "translate-y-full" : ""} absolute w-full transition max-w-[900px] duration-500 h-screen flex items-start flex-col gap-10 justify-center`}>
                {
                    <div className='w-full'>
                        <h1 className='font-bold text-6xl'>Safety first 👀</h1>
                    </div>
                }
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col gap-2'>
                        <h3>To verify it’s you, we’ll need your PIN 😐</h3>
                        <p className='text-alt3'>Type your PIN below so we know that it’s you borrowing the book</p>
                    </div>
                    <div className='grid grid-cols-6 gap-3 w-[400px]'>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                ref={(el) => { if (el) inputRefs.current[index] = el }}
                                key={index}
                                type="text"
                                maxLength={1}
                                className='input text-center pwd'
                                onChange={(e) => {
                                    handleChange(e, index)
                                }}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <div className='w-full flex flex-col gap-2 mt-5'>
                        <p className="text-sm text-gray-500">To confirm you want to borrow {books.map(b => b.title).join(', ')} click below</p>
                        <PrimaryButton text='Borrow books' styles='px-5 flex w-max' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowBookPage