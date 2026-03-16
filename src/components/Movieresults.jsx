import Moviecard from "./Moviecard";
//MovieResults mottar "movies" som en prop fra Home.jsx og er ansvarlig for å vise en liste med movieCard-komponenter. 
//Dette gjør at komponenten er gjenbrukbar og enkel å teste.
export default function({movies}){
    return(
        <section>
            {/*Har ul for å vise en liste med flere elementer.*/}
            <ul className="oppsett">
            {/*movies som kommer fra state og er en array med film-objekter. 
            movies?.map vil si at hvis movies finnes, gå gjennom arrayen en film av gangen. 
            I map får vi ett element om gangen, som vi kaller "movie"
            bruker arrow function.
            Arrow function => gjør koden forenklet og lett å lese.
            Hele uttrykket beskrives sliK: 
            Hvis movies finnes, gå gjennom hvert film-objekt i listen
            og reender et <Moviecard> for hver av dem, og send hele filmen som prop. 
             */}
          {movies?.map(movie => (
            <Moviecard key={movie.imdbID} movie={movie} />
          ))}
          </ul>
        </section>

    )
}