import "./Nav.css";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useIdContext } from "../../context/IdContext";

function Nav({ status }: { status?: string }) {
  const { id: globalId, setId: setId, setOrg: setOrg } = useIdContext();
  return (
    <div className="nav-container">
      <h1 className="title">GatherU</h1>
      <nav>
        <Link to={status ? `/${status}` : "/"}>
          <div>Home</div>
        </Link>
        <Link to="/Events">
          <div>Events</div>
        </Link>
        {globalId ? <Link to={`/OrgEvents/${globalId}`}>Account</Link> : null}
        {globalId ? <Link to="/" onClick={() => {setId(null); setOrg(null)}}>Sign Out</Link> : <Link to="/SignUp">
          <div>Sign Up</div>
        </Link>}
      </nav>
    </div>
  );
}

export default Nav;
