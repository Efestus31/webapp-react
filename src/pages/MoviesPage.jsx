import { useEffect, useState } from "react"
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard"

const base_movie_api_url = 'http://localhost:3001/api/movies'
const [movies, setMovies] = useState([])

useEffect(() => {
    fetch(base_movie_api_url)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            setMovies(data.movies)
            console.log(movies);


        }).catch(err => console.error(err))
}, [])

export default function MoviesPaga() {


    return (
        <>
            <Banner title="Biagio's Movie List" subtitle="The most awesome movie list" leadtext="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur adipisci magni ducimus minima quas alias obcaecati qui dolorum exercitationem iure, itaque nisi quod commodi vel iste, repellendus optio maiores tempora!" />


            <section className="py-5">
                <div className="container">

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
                        {
                            movies.map(movie => (
                                <div className="col" key={movie.id}>
                                    <MovieCard movie={movie} />
                                </div>

                            ))
                        }

                    </div>
                </div>

            </section>
        </>
    )
}