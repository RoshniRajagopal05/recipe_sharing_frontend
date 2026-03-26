import { Link } from "react-router-dom";
import "../styles/home.css";

const collageImages = [
  "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1694977744623-4f3fb3612c67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1611250188496-e966043a0629?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1600&q=80",
  "https://plus.unsplash.com/premium_photo-1666185806557-ac1268b62ef1?q=80&w=1192&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-content">
          <p className="hero-subtitle">Premium Global Food Community</p>
          <h1>Cook Bold. Eat Beautiful.</h1>
          <p className="hero-copy">
            Discover professionally-curated recipes with rich visuals, crafted for
            modern creators and food lovers.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-hero" to="/recipes">
              Explore Recipes
            </Link>
            <Link className="btn btn-hero-outline" to="/create">
              Share Recipe
            </Link>
          </div>
        </div>
      </section>

      <section className="home-collage">
        <h2>Inspiration Collage</h2>
        <p>
          Curated dark-mode food photography with cinematic lighting and premium plating.
        </p>
        <div className="collage-grid">
          {collageImages.map((src, idx) => (
            <div key={idx} className="collage-item">
              <img src={src} alt={`food collage ${idx + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home