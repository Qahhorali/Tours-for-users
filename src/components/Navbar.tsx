import './Navbar.css'
import { Link, NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <div className='navbar'>
        <div className="container">
            <Link to='/' className='logo'>
                Logo
            </Link>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/tours'>Tours</NavLink>
                <NavLink to='categories'>Categories</NavLink>
            </nav>
            <input type="text" className='search' placeholder='Search...'/>
            <div className="user-profil">
                <h3>Qahhorali</h3>
                <p>Admin</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar
