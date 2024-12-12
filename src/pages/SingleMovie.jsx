import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Banner from "../components/Banner";
import ReviewCard from "../components/ReviewCard"
export default function SingleMovie() {

    const { id } = useParams()

    const base_movie_api_url = `http://localhost:3001/api/movies/${id}`
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {

        // make a fetch request to the base api endpoint
        fetch(base_movie_api_url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Movie not found');
                }
                return res.json();
            })
            .then(data => {
                setMovie(data);  // Set the movie state with the fetched data
                setLoading(false);  // Set loading to false after data is fetched
            })
            .catch(err => {
                setError(err.message);  // Set error state if something goes wrong
                setLoading(false);  // Set loading to false in case of an error
            });
    }, [id]);

    // If the movie is still loading, show a loading message
    if (loading) {
        return <div>Loading...</div>;
    }
    // If an error occurs (like movie not found), show the error message
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Banner title={movie?.title} subtitle={`By ${movie?.director}`} leadtext={movie?.abstract} />

            <section className="reviews">
                <div className="container">
                    {/* All reviews here */}

                    {movie?.reviews && movie.reviews.length > 0 ? (
                        movie.reviews.map((review) => <ReviewCard key={review.id} review={review} />)
                    ) : (
                        <p>No reviews available for this movie.</p>
                    )}


                </div>
            </section>

        </>
    )
}