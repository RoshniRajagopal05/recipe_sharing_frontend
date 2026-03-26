import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setLoggedIn(!!localStorage.getItem("token"));
    };

    checkLogin();

    // Listen for storage changes (e.g., login/logout in same tab)
    const handleStorageChange = () => {
      checkLogin();
    };

    // Listen for custom login and logout events
    const handleLogin = () => {
      checkLogin();
    };

    const handleLogout = () => {
      checkLogin();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('login', handleLogin);
    window.addEventListener('logout', handleLogout);

    // Also check periodically in case of programmatic changes
    const interval = setInterval(checkLogin, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('login', handleLogin);
      window.removeEventListener('logout', handleLogout);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setLoggedIn(false);
    // Dispatch custom event to notify of logout
    window.dispatchEvent(new Event('logout'));
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🍽 RecipeHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipes">Recipes</Link>
            </li>
            {loggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-recipes">
                    My Recipes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    Create Recipe
                  </Link>
                </li>
              </>
            )}
            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn btn-link text-decoration-none" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;