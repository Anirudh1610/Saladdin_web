import React, { useState, useEffect } from 'react';
import './Styles/BuildYourBowl.css';
import BaseSaladModal from './Components/BaseSaladModal';
import AuthModal from '../Profile/Components/AuthModal';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import emptyBowlIcon from '../../Assets/BYB/salad (1) 1.svg';
import baseBowlIcon from '../../Assets/BYB/salad 1.svg';
import { API_BASE } from '../../config';

const BuildYourBowl = () => {
  const { user, session } = useAuth();
  const { addItem } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedSalad, setSelectedSalad] = useState(null);
  const [coreIngredients, setCoreIngredients] = useState([]);
  const [addOns, setAddOns] = useState([]);

  const [availableAddons, setAvailableAddons] = useState([]);
  const [addonsLoading, setAddonsLoading] = useState(true);
  const [addonType, setAddonType] = useState('all');
  const [searchAddon, setSearchAddon] = useState('');

  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [bowlName, setBowlName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartStatus, setCartStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    fetch(`${API_BASE}/ingredients/`)
      .then((res) => res.json())
      .then((data) => {
        setAvailableAddons(data.map((ing) => ({
          id: String(ing.id),
          name: ing.name,
          type: ing.category?.toLowerCase().includes('non-veg') ? 'non-veg' : 'veg',
          defaultAmount: '50gms',
        })));
        setAddonsLoading(false);
      })
      .catch(() => setAddonsLoading(false));
  }, []);

  const handleSaladSelect = async (salad) => {
    setSelectedSalad(salad);
    setAddOns([]);
    setSaveStatus(null);
    setIsModalOpen(false);

    // Fetch real ingredients for this salad
    try {
      const res = await fetch(`${API_BASE}/salads/${salad.id}`);
      const data = await res.json();
      setCoreIngredients(
        (data.ingredients || []).map((ing) => ({
          id: String(ing.ingredient_id),
          name: ing.ingredient_name,
        }))
      );
    } catch {
      setCoreIngredients([]);
    }
  };

  const removeCoreIngredient = (id) =>
    setCoreIngredients((prev) => prev.filter((i) => i.id !== id));

  const removeAddOn = (id) =>
    setAddOns((prev) => prev.filter((i) => i.id !== id));

  const addAddonToList = (addon) => {
    if (!addOns.find((i) => i.id === addon.id)) {
      setAddOns((prev) => [...prev, { id: addon.id, name: addon.name, amount: addon.defaultAmount }]);
    }
  };

  const resetCoreIngredients = async () => {
    if (!selectedSalad) return;
    try {
      const res = await fetch(`${API_BASE}/salads/${selectedSalad.id}`);
      const data = await res.json();
      setCoreIngredients(
        (data.ingredients || []).map((ing) => ({
          id: String(ing.ingredient_id),
          name: ing.ingredient_name,
        }))
      );
    } catch {}
  };

  const handleSaveClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setBowlName('');
    setSaveStatus(null);
    setShowSavePrompt(true);
  };

  const handleConfirmSave = async () => {
    if (!bowlName.trim()) return;
    setSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch(`${API_BASE}/bowls/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          name: bowlName.trim(),
          base_salad_id: selectedSalad.id,
          core_ingredients: coreIngredients,
          addons: addOns,
        }),
      });
      if (!res.ok) throw new Error();
      setSaveStatus('success');
      setShowSavePrompt(false);
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const filteredAddons = availableAddons.filter((addon) => {
    const matchesSearch = addon.name.toLowerCase().includes(searchAddon.toLowerCase());
    const matchesType = addonType === 'all' || addon.type === addonType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="build-your-bowl-page">
      <div className="container">
        <div className="build-bowl-content">
          <div className="base-bowl-section">
            {!selectedSalad ? (
              <div className="bowl-center-content">
                <div className="bowl-icon">
                  <img src={emptyBowlIcon} alt="Empty Bowl" width="80" height="80" />
                </div>
                <div className="bowl-text">
                  <h2>Add Base Bowl</h2>
                  <p>Choose a base bowl to start with and add addons on top of it</p>
                </div>
                <button className="add-base-bowl-btn" onClick={() => setIsModalOpen(true)}>
                  <img src={baseBowlIcon} alt="Base Bowl" width="20" height="20" />
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
                    Change Base
                  </button>
                </div>

                <div className="ingredients-section">
                  <div className="section-header">
                    <h3>Core Ingredients</h3>
                    <button className="reset-btn" onClick={resetCoreIngredients}>Reset</button>
                  </div>
                  <div className="ingredient-chips">
                    {coreIngredients.length === 0 && (
                      <p style={{ color: '#aaa', fontSize: '14px' }}>No core ingredients.</p>
                    )}
                    {coreIngredients.map((ingredient) => (
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
                    <button className="clear-btn" onClick={() => setAddOns([])}>Clear</button>
                  </div>
                  <div className="addon-chips">
                    {addOns.map((addon) => (
                      <div key={addon.id} className="addon-chip">
                        <span>{addon.name}</span>
                        <button onClick={() => removeAddOn(addon.id)}>−</button>
                      </div>
                    ))}
                  </div>
                </div>

                {showSavePrompt ? (
                  <div className="save-prompt">
                    <input
                      className="bowl-name-input"
                      type="text"
                      placeholder="Name your bowl..."
                      value={bowlName}
                      onChange={(e) => setBowlName(e.target.value)}
                      autoFocus
                    />
                    <div className="save-prompt-actions">
                      <button className="save-bowl-btn" onClick={handleConfirmSave} disabled={!bowlName.trim() || saving}>
                        {saving ? 'Saving...' : 'Confirm Save'}
                      </button>
                      <button className="cancel-save-btn" onClick={() => setShowSavePrompt(false)}>
                        Cancel
                      </button>
                    </div>
                    {saveStatus === 'error' && (
                      <p style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px' }}>Failed to save. Try again.</p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="bowl-action-buttons">
                      <button className="save-bowl-btn" onClick={handleSaveClick}>
                        {user ? 'Save to My Bowls' : 'Sign in to Save'}
                      </button>
                      <button
                        className="add-to-cart-bowl-btn"
                        disabled={addingToCart}
                        onClick={async () => {
                          if (!user) { setIsAuthModalOpen(true); return; }
                          setAddingToCart(true);
                          setCartStatus(null);
                          try {
                            const res = await fetch(`${API_BASE}/bowls/`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${session.access_token}`,
                              },
                              body: JSON.stringify({
                                name: `${selectedSalad.name} (Custom)`,
                                base_salad_id: selectedSalad.id,
                                core_ingredients: coreIngredients,
                                addons: addOns,
                              }),
                            });
                            if (!res.ok) throw new Error();
                            const bowl = await res.json();
                            await addItem({ item_type: 'bowl', bowl_id: bowl.id });
                            setCartStatus('success');
                          } catch {
                            setCartStatus('error');
                          } finally {
                            setAddingToCart(false);
                          }
                        }}
                      >
                        {addingToCart ? 'Adding...' : 'Add to Cart'}
                      </button>
                    </div>
                    {saveStatus === 'success' && (
                      <p style={{ color: '#386641', fontSize: '13px', marginTop: '8px' }}>Bowl saved!</p>
                    )}
                    {cartStatus === 'success' && (
                      <p style={{ color: '#386641', fontSize: '13px', marginTop: '8px' }}>Added to cart!</p>
                    )}
                    {cartStatus === 'error' && (
                      <p style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px' }}>Failed to add to cart. Try again.</p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="addons-sidebar">
            <h3>Available Addons</h3>
            <div className="addon-toggle">
              <button className={`toggle-btn ${addonType === 'all' ? 'active' : ''}`} onClick={() => setAddonType('all')}>All</button>
              <button className={`toggle-btn ${addonType === 'veg' ? 'active' : ''}`} onClick={() => setAddonType('veg')}>Veg</button>
              <button className={`toggle-btn ${addonType === 'non-veg' ? 'active' : ''}`} onClick={() => setAddonType('non-veg')}>Non-Veg</button>
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
                </div>
                <div className="available-addons-list">
                  {addonsLoading && <p style={{ color: '#aaa', fontSize: '14px' }}>Loading...</p>}
                  {filteredAddons.map((addon) => (
                    <div key={addon.id} className="addon-item">
                      <div className="addon-item-content">
                        <span className="addon-name">{addon.name}</span>
                        <select
                          className="addon-amount"
                          defaultValue={addon.defaultAmount}
                          onChange={(e) => { addon.defaultAmount = e.target.value; }}
                        >
                          <option value="30gms">30gms</option>
                          <option value="50gms">50gms</option>
                          <option value="100gms">100gms</option>
                          <option value="150gms">150gms</option>
                        </select>
                      </div>
                      <button
                        className="add-addon-btn"
                        onClick={() => addAddonToList(addon)}
                        disabled={!!addOns.find((i) => i.id === addon.id)}
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

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default BuildYourBowl;
