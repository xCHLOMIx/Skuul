import { useEffect, useState } from "react"

export const useFetch = (url: string) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await fetch(url)
            const data = await response.json()

            setData(data)
            setIsLoading(false)
        }

        fetchData()
    }, [])

    return { data, isLoading }
}