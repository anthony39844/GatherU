import "./Nav.css";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav({ id }: { id?: string }) {
    if(id) {
        console.log(id)
    }
  return (
    <div className="nav-container">
      <h1 className="title">GatherU</h1>
      <nav>
        <Link to="/">
          <div>Home</div>
        </Link>
        <Link to="/Events">
          <div>Events</div>
        </Link>
        <Link to="/SignUp">
          <div>Sign Up</div>
        </Link>
        {id ? <Link to={`/OrgEvents/${id}`}>Account</Link> : null}
      </nav>
    </div>
  );
}

export default Nav;
