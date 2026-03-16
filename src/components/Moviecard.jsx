import { Link } from "react-router-dom";

//Moviecard er en presentasjonskomponent som viser ett filmkort. 
 //Har en movie prop fra omdb.
export default function Moviecard({movie}){
   
   

//<li> ett element i liste, mapper i <ul>
//<article> er selve kortet med innhold
//bruker movie.Title osv. da det er navnene på feltene slik OMDB API faktisk sender dem tilbake. 
//Kjøring på et søk mot OMDB gir en liste med film-objekter, og der har hvert objekt har disse egenskapene. 


    return(
        <li className="movie-item">
        <article className="movie-card">
  <img className="poster" src={movie.Poster} alt={movie.Title} />
    <h2>{movie.Title}</h2>
    <p>{movie.Year}</p>
    {/*Link til detaljside
    bruker tittel i pathen:/{movie.title} */}
    <Link  className="link" to={`/${movie.Title}` }>Les mer</Link>
        </article>
        </li>
     
    )
}