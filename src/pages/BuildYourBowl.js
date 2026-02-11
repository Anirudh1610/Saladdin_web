import React, { useState } from 'react';
import './BuildYourBowl.css';
import BaseSaladModal from '../components/BaseSaladModal';

const BuildYourBowl = () => {
  const [addonType, setAddonType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSalad, setSelectedSalad] = useState(null);
  const [coreIngredients, setCoreIngredients] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [searchAddon, setSearchAddon] = useState('');

  // Available addons data
  const availableAddons = [
    { id: 1, name: 'Mint leaves', type: 'veg', defaultAmount: '50gms' },
    { id: 2, name: 'Paneer cubes', type: 'veg', defaultAmount: '50gms' },
    { id: 3, name: 'Boiled egg', type: 'non-veg', defaultAmount: '50gms' },
    { id: 4, name: 'Chicken Brest', type: 'non-veg', defaultAmount: '100gms' },
    { id: 5, name: 'Cherry tomatoes', type: 'veg', defaultAmount: '30gms' },
    { id: 6, name: 'Olives', type: 'veg', defaultAmount: '20gms' },
    { id: 7, name: 'Feta cheese', type: 'veg', defaultAmount: '40gms' },
    { id: 8, name: 'Grilled Salmon', type: 'non-veg', defaultAmount: '100gms' },
  ];

  const handleSaladSelect = (salad) => {
    setSelectedSalad(salad);
    // Set initial core ingredients from salad
    setCoreIngredients([
      { id: 1, name: 'Lettuce / Romaine' },
      { id: 2, name: 'Spinach' },
      { id: 3, name: 'Cucumber slices' },
      { id: 4, name: 'Broccoli' },
      { id: 5, name: 'Green capsicum' },
      { id: 6, name: 'Celery' },
    ]);
    setAddOns([
      { id: 1, name: 'Pumpkin seeds', amount: '30gms' }
    ]);
    setIsModalOpen(false);
  };

  const removeCoreIngredient = (id) => {
    setCoreIngredients(coreIngredients.filter(item => item.id !== id));
  };

  const removeAddOn = (id) => {
    setAddOns(addOns.filter(item => item.id !== id));
  };

  const addAddonToList = (addon) => {
    const exists = addOns.find(item => item.id === addon.id);
    if (!exists) {
      setAddOns([...addOns, { ...addon, amount: addon.defaultAmount }]);
    }
  };

  const resetCoreIngredients = () => {
    setCoreIngredients([
      { id: 1, name: 'Lettuce / Romaine' },
      { id: 2, name: 'Spinach' },
      { id: 3, name: 'Cucumber slices' },
      { id: 4, name: 'Broccoli' },
      { id: 5, name: 'Green capsicum' },
      { id: 6, name: 'Celery' },
    ]);
  };

  const clearAddOns = () => {
    setAddOns([]);
  };

  const filteredAddons = availableAddons.filter(addon => {
    const matchesSearch = addon.name.toLowerCase().includes(searchAddon.toLowerCase());
    const matchesType = addonType === 'all' || addon.type === addonType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="build-your-bowl-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Build Your Bowl</h1>
          <p>Browse from our exclusive collection of salads and we will make the ready for yoy and deliver to your doorstep</p>
        </div>

        <div className="build-bowl-content">
          <div className="base-bowl-section">
            {!selectedSalad ? (
              <div className="bowl-center-content">
                <div className="bowl-icon">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="40" cy="59" rx="38.5" ry="15" fill="#E9E3D5"/>
                    <ellipse cx="50" cy="62" rx="38" ry="13" fill="#D3CDBF"/>
                    <circle cx="15" cy="30" r="6" fill="#4FE267"/>
                    <circle cx="30" cy="28" r="5" fill="#FF5368"/>
                    <circle cx="45" cy="25" r="4" fill="#FFCF5D"/>
                    <circle cx="60" cy="30" r="6" fill="#4FE267"/>
                    <circle cx="25" cy="35" r="3" fill="#FF7E40"/>
                    <circle cx="50" cy="35" r="3" fill="#FF7E40"/>
                    <circle cx="10" cy="40" r="3" fill="#FF7E40"/>
                    <circle cx="65" cy="35" r="4" fill="#C5324F"/>
                    <circle cx="40" cy="32" r="3" fill="#FFCF5D"/>
                  </svg>
                </div>
                <div className="bowl-text">
                  <h2>Add Base Bowl</h2>
                  <p>Choose a base bowl to start with and add addons on top of it</p>
                </div>
                <button className="add-base-bowl-btn" onClick={() => setIsModalOpen(true)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.71 14.99C1.71 17.75 3.96 20 6.72 20H13.28C16.04 20 18.29 17.75 18.29 14.99" fill="#386641"/>
                    <path d="M15.24 8.74C16.03 7.39 14.81 5.74 13.28 5.74C12.79 3.07 9.21 3.07 8.72 5.74C7.19 5.74 5.97 7.39 6.76 8.74" fill="#386641"/>
                    <path d="M4.5 11.15C5.21 10.12 4.49 8.74 3.23 8.74C2.87 6.67 0.13 6.67 -0.23 8.74C-1.49 8.74 -2.21 10.12 -1.5 11.15" fill="#386641"/>
                  </svg>
                  Add Base Bowl
                </button>
              </div>
            ) : (
              <div className="selected-bowl-content">
                <div className="bowl-header-section">
                  <img src={selectedSalad.image} alt={selectedSalad.name} className="bowl-image" />
                  <div className="bowl-info">
                    <div className="bowl-tags">
                      {selectedSalad.tags.map((tag, index) => (
                        <span key={index} className="bowl-tag">{tag}</span>
                      ))}
                    </div>
                    <h2>{selectedSalad.name}</h2>
                    <p>{selectedSalad.description}</p>
                  </div>
                  <button className="change-base-btn" onClick={() => setIsModalOpen(true)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.71 14.99C1.71 17.75 3.96 20 6.72 20H13.28C16.04 20 18.29 17.75 18.29 14.99" fill="#386641"/>
                      <path d="M15.24 8.74C16.03 7.39 14.81 5.74 13.28 5.74C12.79 3.07 9.21 3.07 8.72 5.74C7.19 5.74 5.97 7.39 6.76 8.74" fill="#386641"/>
                    </svg>
                    Change Base
                  </button>
                </div>

                <div className="ingredients-section">
                  <div className="section-header">
                    <h3>Core Ingredients</h3>
                    <button className="reset-btn" onClick={resetCoreIngredients}>Reset</button>
                  </div>
                  <div className="ingredient-chips">
                    {coreIngredients.map(ingredient => (
                      <div key={ingredient.id} className="ingredient-chip">
                        <span>{ingredient.name}</span>
                        <button onClick={() => removeCoreIngredient(ingredient.id)}>−</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="addons-section">
                  <div className="section-header">
                    <h3>Add Ons</h3>
                    <button className="clear-btn" onClick={clearAddOns}>Clear</button>
                  </div>
                  <div className="addon-chips">
                    {addOns.map(addon => (
                      <div key={addon.id} className="addon-chip">
                        <span>{addon.name}</span>
                        <button onClick={() => removeAddOn(addon.id)}>−</button>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="save-bowl-btn">Save to My Bowls</button>
              </div>
            )}
          </div>

          <div className="addons-sidebar">
            <h3>Available Addons</h3>
            <div className="addon-toggle">
              <button 
                className={`toggle-btn ${addonType === 'all' ? 'active' : ''}`}
                onClick={() => setAddonType('all')}
              >
                All
              </button>
              <button 
                className={`toggle-btn ${addonType === 'veg' ? 'active' : ''}`}
                onClick={() => setAddonType('veg')}
              >
                Veg
              </button>
              <button 
                className={`toggle-btn ${addonType === 'non-veg' ? 'active' : ''}`}
                onClick={() => setAddonType('non-veg')}
              >
                Non-Veg
              </button>
            </div>
            {selectedSalad ? (
              <>
                <div className="addon-search">
                  <input
                    type="text"
                    placeholder='Search by "Grapes"'
                    value={searchAddon}
                    onChange={(e) => setSearchAddon(e.target.value)}
                  />
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="9" r="6" stroke="#999" strokeWidth="2"/>
                    <path d="M14 14L18 18" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="available-addons-list">
                  {filteredAddons.map(addon => (
                    <div key={addon.id} className="addon-item">
                      <div className="addon-item-content">
                        <span className="addon-name">{addon.name}</span>
                        <select className="addon-amount" defaultValue={addon.defaultAmount}>
                          <option value="30gms">30gms</option>
                          <option value="50gms">50gms</option>
                          <option value="100gms">100gms</option>
                          <option value="150gms">150gms</option>
                        </select>
                      </div>
                      <button 
                        className="add-addon-btn"
                        onClick={() => addAddonToList(addon)}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="addon-placeholder">
                <p>Add a base bowl to view the add ons</p>
              </div>
            )}
          </div>
        </div>

        <BaseSaladModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSelectSalad={handleSaladSelect}
        />
      </div>
    </div>
  );
};

export default BuildYourBowl;
