import './Nav.css'
import { Link } from 'react-router-dom';
import "./Nav.css"

function Nav() {
    return ( 
        <div className='nav-container'>
            <h1 className='title'>GatherU</h1>
            <nav>
                <Link to="/"><div>Home</div></Link>
                <Link to="/Events"><div>Events</div></Link>
                <Link to="/SignUp"><div>Sign Up</div></Link>
            </nav>
        </div>
    );
}

export default Nav;