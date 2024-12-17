import { useState } from "react";

export default function ReviewForm({ movie_id, success, handleSuccess }) {
    const [name, setName] = useState('');
    const [textReview, setTextReview] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null);
    //const [success, setSuccess] = useState(null);

    function HandleToggleForm() {
        document.getElementById('form-card').classList.toggle('d-none');
    }

    // handle form submit
    function handleFormSubmit(e) {
        e.preventDefault(); // Prevent default form behavior

        if (name.length < 2 || textReview.length < 8 || rating === 0) {
            setError('Please write at least 8 words, 2 characters, and choose a rating, thanks!');
        } else {
            setError(null);

            const formData = {
                name,
                text: textReview,
                vote: rating,
            };
            console.log(formData);

            const movie_api_url = `http://localhost:3001/api/movies/${movie_id}/review`;

            fetch(movie_api_url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);

                    if (data.success) {
                        handleSuccess('Thanks for the review');

                        // Reset the fields
                        setName('');
                        setTextReview('');
                        setRating(0);

                        setTimeout(HandleToggleForm, 1000);

                        setTimeout(() => handleSuccess(null), 2000);
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <>
            <div className="container">
                {success && <div>{success}</div>}
                <button onClick={HandleToggleForm} className="btn btn-dark mb-2" >Write a review</button>
                <div id="form-card" className="card mb-4 d-none">
                    <div className="card-body">
                        <h3>Leave your review</h3>
                        <form onSubmit={handleFormSubmit}>
                            {/* input username */}
                            <div className="mb-3">
                                <label htmlFor="name">User name</label>
                                <input name="name" id="name" type="text" className="form-control" placeholder="mario" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            {/* rating stars */}
                            <div className="rating mb-3 text-warning">
                                {[1, 2, 3, 4, 5].map(n => <i key={n} className={`bi bi-star${n <= rating ? '-fill' : ''} `} onClick={() => setRating(n)}></i>)}
                            </div>
                            {/* textarea review */}
                            <div className="mb-3">
                                <label htmlFor="textReview">Your textReview</label>
                                <textarea className="form-control" name="textReview" id="textReview" placeholder="leave your textReview here " value={textReview} onChange={(e) => setTextReview(e.target.value)} required></textarea>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">Send</button>
                                {error && <span className="text-danger"> <i className="bi bi-x"></i> {error}</span>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
