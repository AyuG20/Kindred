import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAppSelector } from "../../Redux/hooks";
import { useGetCurrentUserQuery } from "../../Redux/Auth/authQueries";

export function Navbar() {
 const { data, isLoading } = useGetCurrentUserQuery();

const user = data?.user;
const isAuthenticated = !!user;
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">

          {/* Brand */}
          <Link to="/" className="brand-tag">
            <span className="brand-icon">.</span>
            <span className="brand-name">Kindred</span>
          </Link>

          {/* Desktop Navigation */}
         { isAuthenticated && <div className="navLinks">
            <Link to="/discover">Discover</Link>
            <Link to="/connections">Connections</Link>
            <Link to="/groups">Groups</Link>
            <Link to="/messages">Messages</Link>
          </div>}

          {/* Right side */}
          <div className="navbar-actions">
            {!isAuthenticated ? (
              <>
                <Link to="/auth">Login</Link>
                <Link to="/auth">Signup</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="profile-btn">
                  Profile
                </Link>

                <button type="button" className="logout-btn">
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <Link to="/discover">Discover</Link>
        <Link to="/connections">Connections</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/messages">Messages</Link>
      </nav>
    </>
  );
}