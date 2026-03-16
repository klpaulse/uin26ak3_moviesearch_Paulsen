import { useEffect, useState } from "react"
import History from "../components/History"
import Movieresults from "../components/Movieresults"



export default function Home(){
  //SØKETEKST: 
  //React state-hook som lagrer søketeksten brukeren skriver i søkefeltet. 
  //"search" er verdien som brukes når vi gjør API-kall,
  //  mens "setSearch" er funksjonen vi bruker for å oppdatere denne verdien. Når setsearch kalles, reendrer react komponenten med ny state. 
  //useState("james Bond") betyr at stertverdien er "james bond"
    const [search, setSearch] = useState("James Bond")
    //LISTE AV FILMER 
    //react state-hook som lagrer listen av filmobjekter som skal vises i UI.
    //"movies" er en array som inneholder søkeresultatene fra OMDB API. 
    //Startverdiene [] betyr at listen er tom før vi henter data. 
    //"setMovies" brukes for å oppdatere listen når vi har fått nye resultater fra API-et. Når setMovies kalles, rerender react hele komponenten slik at UI viser den nye film-listen. 
    const [movies, setMovies] = useState([])
    //Leser tidligere lagret søkehistorikk fra localStorage
    const storedHistory = localStorage.getItem("search")
    //STATE OM INPUT ER FOKUSERT
    const [focused, setFocused] = useState(false)
  
  //SØKEHISTORIKK
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    console.log("Denne kommer fra storage", storedHistory)

    //API URL
  const baseUrl = `https://www.omdbapi.com/?s=${search}&type=movie&apikey=`
  const apiKey = import.meta.env.VITE_APP_API_KEY

  //Hver gang "history" endres, synkroniserer vi det tilbake til localstorage. 
  useEffect(()=>{
    localStorage.setItem("search", JSON.stringify(history))
  },[history])

  //HENTER FILMER VED FØRSTE LOAD
  //useEffect med [] kjører kun en gang når komponenten reendres første gang. 
  useEffect(() => {
  getMovies()
}, [])

  
//HENTER FILMER FRA OMDB
    const getMovies = async()=>{
  try 
  {
    //Henter data fra OMDB fetch
    const response = await fetch(`${baseUrl}${apiKey}`)
    const data = await response.json()
    //OMDB gir "search" kun hvis response === "True"
    if (data.Search) {
      //Oppdaterer film-listen som skal vises. 
      setMovies(data.Search)
    }
    console.log(data)
  } 
  catch (err){
    console.error(err);
  }
}

//ONCHANGE I SØKEFELTET 
//Oppdaterer "search" hver gang brukeren skriver en bokstav
    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    //SUBMIT
    const handleSubmit =(e)=>{
        e.preventDefault()
        //Tømmer input-felt
        e.target.reset()
      //Legger søket til i historikken
        setHistory((prev) => [...prev, search])
    //Selve søke trigges i onClick på knappen
    }
    console.log(history)

    return (
    <main >
       <h1>Filmoversikt</h1>
       {/*SØKEBOKS*/}
       <form className="search-bar" onSubmit={handleSubmit}>
        <label className="search-label">
            Søk etter film
        <input type="search" placeholder="Hva vil du se på i dag?" onChange={handleChange} onFocus={()=> setFocused(true)}></input>
        </label>
        { focused ? <History history={history} setSearch={setSearch} /> : null }
         {/*Knapp som kjører API-søket*/}
         <button onClick={getMovies}>Søk</button>
       </form>
       {/*Movieresults er ansvarlig for å mappe ut filmene */}
       <Movieresults movies={movies} />
       </main>
       
    ) 
}