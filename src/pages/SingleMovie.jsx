import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Banner from "../components/Banner";
import ReviewCard from "../components/ReviewCard"
import ReviewForm from "../components/ReviewForm";
import GlobalContext from "../contexts/GlobalContext";
import Loader from "../components/Loader";


export default function SingleMovie() {

    const { id } = useParams();

    //grab the loading and setLoading  from the context
    const { loading, setLoading } = useContext(GlobalContext)

    const base_movie_api_url = `http://localhost:3001/api/movies/${id}`
    const [movie, setMovie] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {

        setLoading(true)
        // make a fetch request to the base api endpoint
        fetch(base_movie_api_url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Movie not found');
                }
                return res.json();
            })
            .then(data => {

                setMovie(data.movies);   // Set the movie state with the fetched data
                setLoading(false);   // Set loading to false after data is fetched
            })
            .catch(err => {
                setError(err.message);   // Set error state if something goes wrong
                setLoading(false);   // Set loading to false in case of an error
            });
    }, [success]);


    // If an error occurs (like movie not found), show the error message
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>

            {loading ? <Loader /> : (
                <>
                    <Banner title={movie?.title} subtitle={`By ${movie?.director}`} leadtext={movie?.abstract} genre={movie?.genre} />


                    <ReviewForm movie_id={id} success={success} handleSuccess={setSuccess} />

                    <section className="reviews">
                        <div className="container">
                            {/* All reviews here */}

                            {movie.reviews && movie.reviews.length > 0 ? (
                                movie.reviews.map(review => <ReviewCard key={review.id} review={review} />)
                            ) : (
                                <p>No reviews available for this movie.</p>
                            )}


                        </div>
                    </section>
                </>
            )}
        </>
    )
}