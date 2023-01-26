//import {useState, useEffect} from "react";
import PropTypes, { string } from "prop-types";
import {Link} from "react-router-dom";

function Movie({id, medium_cover_image, title, summary, genres}){
    return (
        <div>
            <div>
                <h2>
                    <Link to={`/movie/${id}`}>{title}</Link></h2>
                <img src={medium_cover_image} alt={title}/>
                <p>{summary}</p>
                <ul>
                    {genres.map((genre) => (
                        <li key={genre}>{genre}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    medium_cover_image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(string).isRequired,
}

export default Movie