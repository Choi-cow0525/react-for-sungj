import {useState, useEffect } from "react";
import {useParams} from "react-router-dom";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const {id} = useParams();
    const getMovieDetail = async() => {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        const json = await response.json();
        setDetail(json.data.movie);
        setLoading(false);
        //console.log(json);
    };
    useEffect(() => {
        getMovieDetail();
    }, []);
    //console.log(detail);
    return(
        <div>
        {loading ? <h1>Loading</h1> : 
            (
            <div>
                <h1>Title : {detail.title}</h1>
                <img src={detail.medium_cover_image} alt={detail.title} />
                <h3>
                    <p>Year : {detail.year}</p>
                    <p>Rating : {detail.rating}</p>
                    <p>Runtime : {detail.runtime}</p>
                    <p></p>
                    Genres : <ul>
                    {detail.genres.map((genre) => (
                        <li key={genre}>{genre}</li>
                    ))}
                </ul></h3>
            </div>
            )
        }  
        </div>
    );
};

export default Detail;