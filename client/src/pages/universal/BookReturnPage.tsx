import React, { useState } from 'react'
import Student from '../../components/universal/Student'
import PrimaryButton from '../../components/universal/PrimaryButton'
import { useFetch } from '../../hooks/universal/useFetch'
import BookBorrow from '../../components/universal/BookBorrow'
import { PiCaretCircleLeftLight } from 'react-icons/pi'
import { GoCheckCircleFill } from 'react-icons/go'
import MainNavbar from '../../components/universal/MainNavbar'
import { useNavigate } from 'react-router-dom'

interface StudentInterface {
  _id: string,
  firstName: string,
  lastName: string,
  theClass: string,
  email: string,
  password: string,
  books: BookInterface[]
  createdAt: Date
  updatedAt: Date
}

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
  // Form one variables
  const { data: students }: { data: StudentInterface[] } = useFetch("/api/books/borrowers")
  const [searchStudent, setStudentSearch] = useState<string>('');

  const studentResults: StudentInterface[] = students.filter((student) => `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchStudent.toLowerCase()));
  const [theStudent, setTheStudent] = useState<StudentInterface>();

  // Form two variables
  const [searchBook, setBookSearch] = useState<string>('');
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [summary, setSummary] = useState<boolean>(false);
  const router = useNavigate()
  // Form two functions
  const handleOnClick = (book: BookInterface) => {
    const isSelected = books.some((b) => b._id === book._id);

    if (isSelected) {
      setBooks(books.filter((b) => b._id !== book._id));
    } else {
      setBooks([...books, book]);
    }
  }

  // Error, Loading and success
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Changing form variables
  const [form, setForm] = useState<number>(1);

  const handleSubmit = () => {
    console.log("Yes")
    const theBooks = books.map((book) => book._id);
    const borrow = { student: theStudent?._id, returns: theBooks, summary: summary }
    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetch("http://localhost:4000/api/books/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrow)
      })
      const json = await response.json()

      if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
      } else {
        setIsLoading(false)
        setSuccess(true)
        setBookSearch('')
        setStudentSearch('')
        setTheStudent(undefined)
        setBooks([])
        setForm(1)

        const timer = setTimeout(() => {
          router('/book/return')
        }, 4000)

        return () => clearTimeout(timer)
      }
    }

    fetchData();
  }
  return (
    <div className='bg-white h-screen overflow-hidden w-full flex justify-center relative'>
      <MainNavbar theLink="/book/borrow" text='Borrow book' />
      <div className={`absolute ${form == 2 || form == 3 ? "-translate-y-full" : ""} ${success ? "hidden" : "flex"} transition duration-500 w-full max-w-[1000px] h-screen items-start flex-col gap-10 justify-center`}>
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
            <p className='text-primary font-bold'>{theStudent && theStudent.firstName + " ? Click Next"}</p>
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
              <label htmlFor={student._id} key={student._id} onClick={() => setTheStudent(student)}>
                <input type="radio" id={student._id} className='peer sr-only' name='student' />
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
      <div className={`${form == 1 ? "translate-y-full" : ""} ${form == 2 ? "translate-y-0" : ""} ${success ? "hidden" : "flex"} ${form == 3 ? "-translate-y-full" : ""} transition max-w-[900px] duration-500 absolute w-full h-screen items-start flex-col gap-10 justify-center`}>
        {
          !searchBook &&
          <div className='w-full'>
            <h1 className='font-bold text-6xl'>Nice 👌</h1>
          </div>
        }
        <div onClick={() => setForm(1)} className='p-2 border-2 border-primary hover:bg-primary flex items-center gap-2 hover:text-white transition duration-300 cursor-pointer w-max'>
          <PiCaretCircleLeftLight size={18} />
          <span className='text-sm'>Back</span>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-col gap-2'>
            <h3>What books do you want to return for {theStudent && `${theStudent.firstName} ${theStudent.lastName}`} 😁?</h3>
            <p className='text-alt3'>Select all the books that {theStudent?.lastName} returned</p>
          </div>
          <div className={`bar w-full end bg-white flex overflow-y-scroll max-h-96 flex-col justify-between p-3 gap-2 border border-alt5`}>
            <div>{error}</div>
            <div className='grid grid-cols-4 gap-3'>
              {theStudent?.books.map((book) => (
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
          <div className='w-full flex justify-between gap-3'>
            <div>
              <p className='text-alt3'>Did he provide a summary ?</p>
              <div className='flex gap-2'>
                <button
                  type="button"
                  onClick={() => setSummary(true)}
                  className={`cursor-pointer p-3.5 font-semibold border-2 flex items-center gap-3 transition justify-center duration-200 border-primary ${summary ? "bg-primary text-white" : ""} `}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setSummary(false)}
                  className={`cursor-pointer p-3.5 font-semibold border-2 flex items-center gap-3 transition justify-center duration-200 border-primary ${!summary ? "bg-primary text-white" : ""} `}
                >
                  No
                </button>
              </div>
            </div>
            {books.length > 0 &&
              <div>
                <p className="text-sm text-white select-none">a</p>
                <PrimaryButton text='Return books' handleClick={handleSubmit} isLoading={isLoading} styles='px-10 flex' />
              </div>
            }
          </div>
        </div>
      </div>
      <div className={`h-screen ${!success ? "hidden" : "flex"} flex-col items-center gap-5 justify-center`}>
        <GoCheckCircleFill className='text-green-400' size="140px" />
        <div className='flex flex-col items-center'>
          <p className="text-lg font-bold max-w-[400px] text-center">Successfully return the books</p>
          <p className='text-lg'>Thanks for using Skuul 🙂</p>
        </div>
      </div>
    </div>
  )
}

export default BorrowBookPage