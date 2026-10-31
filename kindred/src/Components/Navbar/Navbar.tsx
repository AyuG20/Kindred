import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAppSelector } from "../../Redux/hooks";
import { useGetCurrentUserQuery } from "../../Api/Auth/authQueries";
import { navbarTexts } from "./navbarTexts";

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
            <span className="brand-name">{navbarTexts.brand}</span>
          </Link>

          {/* Desktop Navigation */}
         { isAuthenticated && <div className="navLinks">
            <Link to="/discover">{navbarTexts.discover}</Link>
            <Link to="/connections">{navbarTexts.connections}</Link>
            <Link to="/groups">{navbarTexts.groups}</Link>
            <Link to="/messages">{navbarTexts.messages}</Link>
          </div>}

          {/* Right side */}
          <div className="navbar-actions">
            {!isAuthenticated ? (
              <>
                <Link to="/auth">{navbarTexts.login}</Link>
                <Link to="/auth">{navbarTexts.signup}</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="profile-btn">
                  {navbarTexts.profile}
                </Link>

                <button type="button" className="logout-btn">
                  {navbarTexts.logout}
                </button>
              </>
            )}
          </div>

        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <Link to="/discover">{navbarTexts.discover}</Link>
        <Link to="/connections">{navbarTexts.connections}</Link>
        <Link to="/groups">{navbarTexts.groups}</Link>
        <Link to="/messages">{navbarTexts.messages}</Link>
      </nav>
    </>
  );
}