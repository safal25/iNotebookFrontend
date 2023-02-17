import React,{useContext} from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import noteContext from '../context/noteContext';
function Navbar() {
  let location = useLocation();
  const {failAlert,clearNotes}=useContext(noteContext);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    clearNotes();
    navigate("/login");
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    {localStorage.getItem('token') && <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>}
                    </li>
                    <li className="nav-item">
                    {localStorage.getItem('token') && <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">All Notes</Link>}
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    {!localStorage.getItem('token') && <Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>}
                    {localStorage.getItem('token') && <button className="btn btn-primary" type="submit" onClick={handleLogout}>Logout</button>}
                </form>
                </div>
            </div>
        </nav>
        {failAlert && <div class="alert alert-danger" role="alert">
          Oops! something went wrong        
        </div>}
    </div>
  )
}

export default Navbar
