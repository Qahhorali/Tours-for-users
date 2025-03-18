import Navbar from "../components/Navbar"
import "../App.css"
import Tours from "./Tours"
function Home() {
  return (
    <div>
      <div className="home">
        <Navbar/>
        <div className="container">
            <h1 className="main-title">Explore the World</h1>
            <Tours/>
        </div>
      </div>
    </div>
  )
}

export default Home
