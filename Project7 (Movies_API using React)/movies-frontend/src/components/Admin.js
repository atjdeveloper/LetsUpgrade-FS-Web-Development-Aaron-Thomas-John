import {useState,useEffect} from 'react';


function Admin(){

    let [movies,setMovies]= useState([]);
    let [modal,setModal] = useState(false);
    let [modalUpdate,setModalUpdate] = useState(false);

    let movie ={};

    useEffect(()=>{
        fetch("http://localhost:8000/movies")
        .then(response => response.json())
        .then((movieData)=>{
          console.log(movieData);
            setMovies(movieData);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[])

    function deleteMovie(id){
        fetch(`http://localhost:8000/movies/${id}`,{
            method:"DELETE"
        })
        .then((response) => response.json())
        .then((data)=>{
    
            let tempMovies = [...movies];
            let index = tempMovies.findIndex((movie)=>movie._id===id);
            tempMovies.splice(index,1);
            setMovies(tempMovies);
        })
        .catch((err)=>{console.log(err)})
    }

    function readValue(property,value){
        movie[property]=value;
        console.log(movie);
    }

    function addMovie(){
        fetch("http://localhost:8000/movies",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(movie)
        })
        .then((response)=>response.json())
        .then((message)=>{
            let tempMovie=[...movies];
            tempMovie.push(message.movie);
            setMovies(tempMovie);
            setModal(false);
        })
        .catch((err)=>{console.log(err)})
    }

    function updateMovie(id){
        fetch(`http://localhost:8000/movies/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(movie)
        })
        .then((response)=>response.json())
        .then((message)=>{
            let tempMovies = [...movies];
            let index = tempMovies.findIndex((movie)=>movie._id===id);
            tempMovies.push(message.movie);
            console.log(message)
            setMovies(tempMovies);
            setModalUpdate(false);
        })
        .catch((err)=>{console.log(err)})

    }


    return(
        <section className="Container">
        {
            modal===true?
            (  
                <div className="modal">
                  <input type="text" placeholder="Enter Name" onChange={(event)=>{
                      readValue('name',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Release date" onChange={(event)=>{
                      readValue('releaseDate',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter BoxOffice" onChange={(event)=>{
                      readValue('boxOffice',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Poster" onChange={(event)=>{
                      readValue('poster',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Rating" onChange={(event)=>{
                      readValue('rating',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Production Company" onChange={(event)=>{
                      readValue('productionCompany',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Description" onChange={(event)=>{
                      readValue('description',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Genre" onChange={(event)=>{
                      readValue('genre',event.target.value);
                  }}/>
                  <button type="submit" className="btn" onClick={addMovie}>Submit</button>
                </div>
            ):
                null
        }


        {
            modalUpdate===true?
            (  
                <div className="modal">
                  <input type="text" placeholder="Enter Name" onChange={(event)=>{
                      readValue('name',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Release date" onChange={(event)=>{
                      readValue('releaseDate',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter BoxOffice" onChange={(event)=>{
                      readValue('boxOffice',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Poster" onChange={(event)=>{
                      readValue('poster',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Rating" onChange={(event)=>{
                      readValue('rating',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Production Company" onChange={(event)=>{
                      readValue('productionCompany',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Description" onChange={(event)=>{
                      readValue('description',event.target.value);
                  }}/>
                  <input type="text" placeholder="Enter Genre" onChange={(event)=>{
                      readValue('genre',event.target.value);
                  }}/>
                  <button type="submit" className="btn" onClick={()=>{
                      updateMovie(readValue(movie._id));
                      }}>Update</button>
                </div>
            ):
                null
        }
           

           <div className="admin">
               <h1>All Movies</h1>
               <button className="btn" onClick={()=>{
                   setModal(true);
               }}>Add movie</button>
           </div>
           <table>
              <thead>
                  <tr>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Poster</th>
                    <th>Release Date</th>
                    <th>Action</th>
                  </tr>
              </thead>
              <tbody>

                {
                    movies.map((movie,index)=>{
                        return(
                            <tr key={index}>
                              <td>{movie.name}</td>
                              <td>{movie.genre}</td>
                              <td><img height="100px" src={movie.poster}/></td>
                              <td>{movie.releaseDate}</td>
                              <td>
                                <button onClick={()=>{
                                    setModalUpdate(true);
                                    readValue(index,movie._id)
                                    
                                }}>Update</button>
                                <button onClick={()=>{
                                    deleteMovie(movie._id)
                                }}>Delete</button>
                              </td>
                            </tr>
                        )
                    })
                }
                  
              </tbody>
           </table>
        </section>
    )
}

export default Admin;