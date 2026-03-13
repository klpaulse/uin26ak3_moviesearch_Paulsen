import { useParams } from "react-router-dom"



export default function Movie(){
    const {movie, setMovie} = useParams()
    const apiKey = import.meta.env.VITE_APP_API_KEY

     const getMovie = async()=>{
  try 
  {
    const response = await fetch(`${movieUrl}${apiKey}`)
    const data = await response.json()
   

    console.log(data)

  } 
  catch (err){
    console.error(err);
  }
}



   
    return (
<article>
    <h1>{movie}</h1>
     <img src="https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg" alt="" />
    <p>Movie title</p>
   </article>
    )
}