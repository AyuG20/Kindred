import { Link } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
    const isAuthenticated = false;
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
          <div className="navLinks">
            <Link to="/discover">Discover</Link>
            <Link to="/connections">Connections</Link>
            <Link to="/groups">Groups</Link>
            <Link to="/messages">Messages</Link>
          </div>

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