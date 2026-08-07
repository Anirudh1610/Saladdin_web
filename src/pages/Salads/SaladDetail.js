import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GranularSaladPage from './Components/GranularSaladPage';
import fallbackImage from '../../Assets/Menu/Salad Grid/Rectangle 11.svg';
import { API_BASE } from '../../config';

const SaladDetail = () => {
  const { id } = useParams();
  const [salad, setSalad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/salads/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        const nutrients = data.nutrient_info || {};
        setSalad({
          id: data.id,
          name: data.name,
          description: data.description || '',
          image: data.image_urls?.[0] || fallbackImage,
          price: parseFloat(data.price),
          rating: parseFloat(data.average_rating),
          reviewCount: data.review_count || 0,
          tags: [],
          isVeg: false,
          nutrition: {
            calories: nutrients.calories ?? 0,
            protein: nutrients.protein ?? 0,
            carbs: nutrients.carbs ?? 0,
            fats: nutrients.fat ?? 0,
            fiber: nutrients.fiber ?? 0,
          },
          ingredients: (data.ingredients || []).map((ing) => ({
            id: ing.ingredient_id,
            name: ing.ingredient_name,
            description: ing.ingredient_description || '',
            calories: 0,
            protein: 0,
          })),
          reviewsList: [],
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '140px 24px', textAlign: 'center', color: '#888', fontFamily: 'Manrope, sans-serif' }}>
        Loading...
      </div>
    );
  }

  if (error || !salad) {
    return (
      <div style={{ padding: '140px 24px', textAlign: 'center', color: '#888', fontFamily: 'Manrope, sans-serif' }}>
        Salad not found.
      </div>
    );
  }

  return <GranularSaladPage salad={salad} />;
};

export default SaladDetail;
