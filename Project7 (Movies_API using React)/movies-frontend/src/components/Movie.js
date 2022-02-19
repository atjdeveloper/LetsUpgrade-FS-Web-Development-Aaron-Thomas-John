import { useParams } from 'react-router-dom';
import { useEffect , useState } from 'react';


function Movie(){

    let {id} = useParams();

    let [movieInfo,setMovieInfo] = useState({});
    useEffect(()=>{
        fetch("http://localhost:8000/movies/actors/"+id)
        .then(response => response.json())
        .then((movieData)=>{
          console.log(movieData);
            setMovieInfo(movieData);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[])

    return(
      <div className="container_movie">
        <div className="Movie_detail">
          <h2 className="Movie_title">{movieInfo.movie?.name}</h2>
          <p className="Movie_date">{movieInfo.movie?.releaseDate}</p>
        </div>
        
        <div className="Movie_desc">
           <div className="Movie_img">
             <img src={movieInfo.movie?.poster}/>
           </div>
           <div className="Movie_description">
             <p>{movieInfo.movie?.description}</p>
             <p><b>Release Date:</b> {movieInfo.movie?.releaseDate}</p>
             <p><b>Box office:</b> {movieInfo.movie?.boxOffice}</p>
             <p><b>Rating:</b> {movieInfo.movie?.rating}</p>
             <button>{movieInfo.movie?.genre}</button>
             <div className="cast">
               {

                 movieInfo.actors?.length===0?
                 (<h3>No actors found</h3>)
                 :

                 movieInfo.actors?.map((actor,index)=>{
                   return (
                      <div className="actor" key={index}> 
                       <img src={actor.actor_id.pic} alt={actor.actor_id.name} />
                      </div>
                   )
                 })
               }
             </div>
           </div>

        </div> 
         
      </div>  
        
    )
}

export default Movie;