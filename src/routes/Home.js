import { useState, useEffect } from "react"; 
import Movie from "../components/Movie";

function Home(){
    const [typing, setTyping] = useState("");
  const [todos, setTodos] = useState([]);
  const fonChange = (event) => {
    setTyping(event.target.value);
  };
  const fonSubmit = (event) => {
    event.preventDefault();
    if (typing == ""){
      return;
    }
    console.log(typing);
    setTodos(currentArray => [typing, ...currentArray]);
    setTyping("");
  };
  console.log(todos);

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async() => {
  const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=9.3&sort_by=year`
  );
  const json = await response.json();
  setMovies(json.data.movies);
  setLoading(false);
  };
  useEffect(() => {
      getMovies();
  }, []);
  console.log(movies);
  return( 
    <div>
      <div>
        <h1 style={{ fontFamily: 'Georgia, serif' }}>My To Dos {todos.length}</h1>
        <form onSubmit={fonSubmit}>
          <input 
            onChange={fonChange}
            value = {typing}
            type = "text" 
            placeholder="Write your to do..." />
          <button>Add To Do</button>
        </form>
        <hr />
        <ul>
          {todos.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>

      <div>
          {loading ? <h1>Loading...</h1> : (<div>{movies.map((movie) => 
          <Movie 
            key = {movie.id}
            id = {movie.id}
            medium_cover_image={movie.medium_cover_image} 
            title={movie.title} 
            summary={movie.summary} 
            genres={movie.genres}/>
          )}
        </div>)}
      </div>
    </div>
)};

export default Home;