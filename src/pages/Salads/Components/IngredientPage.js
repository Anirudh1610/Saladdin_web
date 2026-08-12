import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import '../Styles/IngredientPage.css';
import fallbackImage from '../../../Assets/Menu/Salad Grid/Rectangle 11.svg';
import { API_BASE } from '../../../config';

const slugify = (name) => name.toLowerCase().replace(/\s+/g, '-');

const IngredientPage = () => {
  const navigate = useNavigate();
  const { name: slug } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/ingredients/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const match = data.find((ing) => slugify(ing.name) === slug);
        if (!match) {
          setError('Ingredient not found');
          return;
        }
        const nutrients = match.nutrient_info || {};
        setIngredient({
          name: match.name,
          description: match.description || '',
          image: match.image_urls?.[0] || fallbackImage,
          category: match.category || '',
          allergens: match.allergens || [],
          nutritionPer100g: {
            calories: nutrients.calories ?? 0,
            protein: nutrients.protein ?? 0,
            carbs: nutrients.carbs ?? 0,
            fats: nutrients.fat ?? 0,
            fiber: nutrients.fiber ?? 0,
          },
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="ingredient-page">
        <div className="container ingredient-status">Loading...</div>
      </div>
    );
  }

  if (error || !ingredient) {
    return (
      <div className="ingredient-page">
        <div className="container ingredient-status">Ingredient not found.</div>
      </div>
    );
  }

  return (
    <div className="ingredient-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-link">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="ingredient-content fade-in">
          <div className="ingredient-header">
            <div className="ingredient-visual">
              <div className="ingredient-image-large">
                <img src={ingredient.image} alt={ingredient.name} />
              </div>
            </div>

            <div className="ingredient-main">
              <div className="ingredient-tags-header">
                {ingredient.category && (
                  <span className="availability-badge">{ingredient.category}</span>
                )}
                <div className="ingredient-tags">
                  {ingredient.allergens.map((allergen, index) => (
                    <span key={index} className="ingredient-tag allergen-tag">
                      <AlertTriangle size={12} /> {allergen}
                    </span>
                  ))}
                </div>
              </div>
              <h1>{ingredient.name}</h1>
              <p className="ingredient-description">{ingredient.description}</p>

              <div className="nutrition-facts card">
                <h3>Nutrition Facts (per 100g)</h3>
                <div className="nutrition-grid">
                  <div className="nutrition-fact">
                    <span className="value">{ingredient.nutritionPer100g.calories}</span>
                    <span className="label">Calories</span>
                  </div>
                  <div className="nutrition-fact">
                    <span className="value">{ingredient.nutritionPer100g.protein}g</span>
                    <span className="label">Protein</span>
                  </div>
                  <div className="nutrition-fact">
                    <span className="value">{ingredient.nutritionPer100g.carbs}g</span>
                    <span className="label">Carbs</span>
                  </div>
                  <div className="nutrition-fact">
                    <span className="value">{ingredient.nutritionPer100g.fats}g</span>
                    <span className="label">Fats</span>
                  </div>
                  <div className="nutrition-fact">
                    <span className="value">{ingredient.nutritionPer100g.fiber}g</span>
                    <span className="label">Fiber</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="cta-section">
            <div className="cta-card card">
              <h2>Try Salads with {ingredient.name}</h2>
              <p>Discover delicious recipes featuring this nutritious ingredient</p>
              <Link to="/explorer" className="btn btn-primary">
                Explore Salads
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IngredientPage;
