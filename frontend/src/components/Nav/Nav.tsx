import "./Nav.css";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useIdContext } from "../../context/IdContext";

function Nav({ status }: { status?: string }) {
  const { id: globalId } = useIdContext();
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
        <Link to="/SignUp">
          <div>Sign Up</div>
        </Link>
        {globalId ? <Link to={`/OrgEvents/${globalId}`}>Account</Link> : null}
      </nav>
    </div>
  );
}

export default Nav;
