import { useParams } from "react-router-dom"

export default function SingleMovie() {

    const { id } = useParams()

    return (
        <>
            <h1> Single Movie id: {id}</h1>
        </>
    )
}