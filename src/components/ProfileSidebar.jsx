import { Link, useNavigate } from "react-router-dom";

function ProfileSidebar({ userName, userEmail }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <aside className="profile-sidebar">
      <div className="profile-sidebar__header">
        <div>
          <div className="profile-sidebar__name">{userName || "Guest"}</div>
          {userEmail && <div className="profile-sidebar__email">{userEmail}</div>}
        </div>
      </div>

      <nav className="profile-sidebar__nav">
        <Link to="/recipes" className="profile-sidebar__link">
          All Recipes
        </Link>
        <Link to="/my-recipes" className="profile-sidebar__link">
          My Recipes
        </Link>
        <Link to="/create" className="profile-sidebar__link">
          Create Recipe
        </Link>
      </nav>

      <button className="profile-sidebar__logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}

export default ProfileSidebar;
