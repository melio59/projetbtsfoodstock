import React, { useState, useEffect } from 'react';

const StockagePage = () => {
    const [stockage, setStockage] = useState([]);

   
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

    
    const ajouterElement = () => {
        
    };

    
    const supprimerElement = (id) => {
        
       
       
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
                <button onClick={ajouterElement}>Ajouter un élément</button>
            </div>
        </div>
    );
};

export default StockagePage;