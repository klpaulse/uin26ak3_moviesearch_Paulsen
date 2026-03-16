import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"




export default function Movie(){
  //State: lagrer detaljinformasjonen om en valgt film. 
  //Før daya er hentet, vil movieInfor være undefined. 
  //Når vi henter data fra OMDB, lagres begge i movieinfor,
  //og siden eendrer filmens detaljer. 
    const [movieInfo, setMovieInfo]= useState()
    //useParams: henter "movie" fra en URL slug-en
    //Hvis URL-en er /harry-potter, så er movie ="harry potter"
    //Dette brukes som søkeparametere i API-kallet.
    const {movie} = useParams()


 const baseUrl = `https://www.omdbapi.com/?t=${movie}&apikey=`
 const apiKey = import.meta.env.VITE_APP_API_KEY


 //Hver gang "movie" endres, kjører getInfo() og henter detaljen om den valgte filmen.
 //Dette skjer første gang siden reendres og når brukeren velger ny film.
  useEffect(() => {
    getInfo()
  }, [movie])

//Henter detaljer for en film fra OMDB
     const getInfo = async()=>{
  try 
  {
    const response = await fetch(`${baseUrl}${apiKey}`)
    const data = await response.json()
    if(data.response === "true"){

    }else {
setMovieInfo(data)
    }

    
   
    console.log(data)

  } 
  catch (err){
    console.error(err);
  }
}

// Først viser vi "Laster film..." mens data hentes
//Når movieInfo finnes, viser vi detaljer:
    // - Poster
    // - Title
    // - Year
    // - Runtime
    // - Actors
    // - imdbRating
    // - Language
    // - Plot

    return ( 
    
  <main className="main">
    {/*Loading state- vises mens fetch pågår */}
    {!movieInfo ? (
      <p>Laster film …</p>
    ) : (
      /* Når data er hentet, vises filmens detaljer
      Dette er detaljene jeg ønsket å ha med*/
      <article>
        <img src={movieInfo.Poster} alt={movieInfo.Title} />
        <h1>{movieInfo.Title}</h1>
        <p><strong>Utgivelsesår:</strong> {movieInfo.Year}</p>
        <p><strong>Varighet:</strong> {movieInfo.Runtime}</p>
        <p><strong>Skuespillere:</strong> {movieInfo.Actors}</p>
        <p><strong>IMDb‑rating:</strong> {movieInfo.imdbRating}</p>
        <p><strong>Språk:</strong> {movieInfo.Language}</p>
        {movieInfo.Plot && <p>{movieInfo.Plot}</p>}
      </article>
    )}
    
  </main>
);
}