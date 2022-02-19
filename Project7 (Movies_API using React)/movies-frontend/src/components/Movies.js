import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';



function Movies(){

    let [movies,setMovie] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8000/movies")
        .then((response)=>response.json())
        .then((data)=>{
            setMovie(data)
            console.log(data);
        })
        .catch((error)=>{console.log(error);})
    },[])

    return(
        <section className="movies">
          <div className="container movies_container">
              <h1 className="title">Movies</h1>
              <div className="movies_parent">
                {
                    movies.map((movie,index)=>{
                        return(
                             <div className="movie" key={index}>
                                <img src={movie.poster}/>
                                <div className="movie_details">
                                    <h2 className="movie_title">{movie.name}</h2>
                                    <p>Release Date: {movie.releaseDate}</p>
                                    <p>Box office: {movie.boxOffice}</p>
                                    <p>Rating: {movie.rating}</p>
                                    <p>Genre: {movie.genre}</p>
                                    <Link to={`/movies/${movie._id}`}>View more</Link>
                                </div>
             
                             </div>
                       ) 
                    })
                   
                }
                
              </div>
          </div>
        </section>

    )
}

export default Movies;