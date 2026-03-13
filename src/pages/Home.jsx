import { useEffect, useState } from "react"
import History from "../components/History"


export default function Home(){
    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)
    //Lager en state for james bond-filmene 
   const [apiData, setApiData] = useState(null)
  
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    console.log("Denne kommer fra storage", storedHistory)

  const baseUrl = `https://www.omdbapi.com/?s=${search}&apikey=`
  const apiKey = import.meta.env.VITE_APP_API_KEY

  useEffect(()=>{
    localStorage.setItem("search", JSON.stringify(history))
  },[history])
    
// ved søk
    const getMovies = async()=>{
  try 
  {
    const response = await fetch(`${baseUrl}${apiKey}`)
    const data = await response.json()
   

    console.log(data)

  } 
  catch (err){
    console.error(err);
  }
}

//forside
  const getBond = async()=>{
    const response = await fetch(`https://www.omdbapi.com/?s=james%20bond&type=movie&apikey=${apiKey}`)
    const data = await response.json()
    
const onlyMovies = data.Search.filter(item => item.Type === "movie");
setApiData(onlyMovies)


  } 
  useEffect(() => {
    getBond()
  }, [])




  

    const handleChange = (e)=>{
        setSearch(e.target.value)

    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        e.target.reset()

        setHistory((prev) => [...prev, search])

        

    }

    console.log(history)

    return (
    <main>
       <h1>Forside</h1>
       <form onSubmit={handleSubmit}>
        <label>
            Søk etter film
        <input type="search" placeholder="Harry potter" onChange={handleChange} onFocus={()=> setFocused(true)}/* onBlur={()=> setFocused (false)}*/></input>
        </label>
        { focused ? <History history={history} setSearch={setSearch} /> : null }
         <button onClick={getMovies}>Søk</button>
       </form>
       <section>
        <ul>
          
  {apiData?.map(movie => (
      movie.Poster? (
      <img key={movie.imdbID} src={movie.Poster} alt={movie.Title} />
          
      ) : null
    ))}


        </ul>
       </section>
       

       
       </main>
       
    ) 
}