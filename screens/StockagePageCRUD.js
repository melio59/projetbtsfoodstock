
import React, { useState } from 'react';

const StockagePageCRUD = () => {
  const [stockData, setStockData] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    produit: '',
    categorie: '',
    datePeremption: '',
    prixUnitaire: '',
  });

  const handleCreate = () => {
    // Envoyer formData pour créer une nouvelle entrée dans le stock
    // Exemple : fetch('/api/stock', { method: 'POST', body: JSON.stringify(formData) });
  };

  const handleUpdate = () => {
    // Envoyer formData pour mettre à jour une entrée existante dans le stock
    // Exemple : fetch(`/api/stock/${formData.id}`, { method: 'PUT', body: JSON.stringify(formData) });
  };

  const handleDelete = (id) => {
    // Envoyer une demande pour supprimer l'entrée avec l'id donné
    // Exemple : fetch(`/api/stock/${id}`, { method: 'DELETE' });
  };

  return (
    <div>
      <h1>Page de Stockage</h1>

      {/* Formulaire pour créer une nouvelle entrée */}
      <form onSubmit={handleCreate}>
        <label>
          Produit:
          <input
            type="text"
            value={formData.produit}
            onChange={(e) => setFormData({ ...formData, produit: e.target.value })}
          />
        </label>

        <label>
          Catégorie:
          <input
            type="text"
            value={formData.categorie}
            onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
          />
        </label>

        <label>
          Date de Péremption:
          <input
            type="text"
            value={formData.datePeremption}
            onChange={(e) => setFormData({ ...formData, datePeremption: e.target.value })}
          />
        </label>

        <label>
          Prix Unitaire:
          <input
            type="text"
            value={formData.prixUnitaire}
            onChange={(e) => setFormData({ ...formData, prixUnitaire: e.target.value })}
          />
        </label>

        <button type="submit">Ajouter</button>
      </form>

      {/* Afficher les données existantes */}
      <ul>
        {stockData.map((item) => (
          <li key={item.id}>
            <span>{item.produit}</span>
            <span>{item.categorie}</span>
            <span>{item.datePeremption}</span>
            <span>{item.prixUnitaire}</span>
            <button onClick={() => handleDelete(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      {/* Formulaire pour mettre à jour une entrée existante */}
      <form onSubmit={handleUpdate}>
        <label>
          ID de l'entrée à mettre à jour:
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
        </label>
        {/* Ajoutez d'autres champs pour la mise à jour */}
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default StockagePageCRUD;
