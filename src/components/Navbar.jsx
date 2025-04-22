import { Link } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link className="logo" to="/">WatchFLIX</Link>
            <p>Created by Rohit singh</p>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/Favorite" className="nav-link">Favorites</Link>
        </div>
        
        {/* <iframe
  src="https://vidsrc.to/embed/movie/
950387"
  allowFullScreen
  width="100%"
  height="500px"
  frameBorder="0"
/> */}
    </nav>
}

export default NavBar