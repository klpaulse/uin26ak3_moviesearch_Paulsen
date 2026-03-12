import { useParams } from "react-router-dom"

export default function Movie(){
    const {movie} = useParams()



   
    return (
<article>
    <h1>{movie}</h1>
     <img src="https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg" alt="" />
    <p>Movie title</p>
   </article>
    )
}