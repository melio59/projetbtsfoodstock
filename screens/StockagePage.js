import React, { useState, useEffect } from 'react';

const StockagePage = () => {
    const [stockage, setStockage] = useState([]);
    const [newElement, setNewElement] = useState({
        produit: '',
        categorie: '',
        datePeremption: '',
        prixUnitaire: ''
    });

    const fetchStockageData = async () => {
        try {
            const response = await fetch('http://localhost:3000/stockage'); 
            const data = await response.json();
            setStockage(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de stockage:', error);
        }
    };

    useEffect(() => {
        fetchStockageData();
    }, []);

    const ajouterElement = async () => {
        try {
            const response = await fetch('http://localhost:3000/stockage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newElement)
            });
            if (response.ok) {
                // Réinitialiser le formulaire et rafraîchir les données
                setNewElement({
                    produit: '',
                    categorie: '',
                    datePeremption: '',
                    prixUnitaire: ''
                });
                fetchStockageData();
            } else {
                console.error('Erreur lors de l\'ajout d\'un élément au stockage:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout d\'un élément au stockage:', error);
        }
    };

    const supprimerElement = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/stockage/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Rafraîchir les données après la suppression
                fetchStockageData();
            } else {
                console.error('Erreur lors de la suppression d\'un élément du stockage:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression d\'un élément du stockage:', error);
        }
    };

    return (
        <div>
            <h1>Stockage</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produit</th>
                        <th>Catégorie</th>
                        <th>Date de péremption</th>
                        <th>Prix unitaire</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stockage.map((element) => (
                        <tr key={element.id}>
                            <td>{element.id}</td>
                            <td>{element.produit}</td>
                            <td>{element.categorie}</td>
                            <td>{element.datePeremption}</td>
                            <td>{element.prixUnitaire}</td>
                            <td>
                                <button onClick={() => supprimerElement(element.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <input
                    type="text"
                    value={newElement.produit}
                    placeholder="Produit"
                    onChange={(e) => setNewElement({ ...newElement, produit: e.target.value })}
                />
                <input
                    type="text"
                    value={newElement.categorie}
                    placeholder="Catégorie"
                    onChange={(e) => setNewElement({ ...newElement, categorie: e.target.value })}
                />
                <input
                    type="text"
                    value={newElement.datePeremption}
                    placeholder="Date de péremption"
                    onChange={(e) => setNewElement({ ...newElement, datePeremption: e.target.value })}
                />
                <input
                    type="text"
                    value={newElement.prixUnitaire}
                    placeholder="Prix unitaire"
                    onChange={(e) => setNewElement({ ...newElement, prixUnitaire: e.target.value })}
                />
                <button onClick={ajouterElement}>Ajouter un élément</button>
            </div>
        </div>
    );
};

export default StockagePage;
