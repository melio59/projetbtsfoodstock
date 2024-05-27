# Stock App

## Installation

1. Installer les dépendances npm :
    ```bash
    npm install
    ```

2. Créer un fichier `.env` à la racine du projet et y ajouter les lignes suivantes :
    ```
    EXPO_PUBLIC_API_URL=http://VotreIP:8080
    EXPO_PUBLIC_FIREBASE_KEY=VotreCleApiFirebase
    ```

3. Aller dans le répertoire `/back` et installer les dépendances Composer :
    ```bash
    cd /back
    composer install
    ```

## Exécution

1. Ouvrir XAMPP et démarrer Apache et MySQL.

2. Dans une console, lancer l'application Expo :
    ```bash
     expo start
    ```

3. Dans une autre console, naviguer vers le répertoire `/back` et démarrer le serveur PHP :
    ```bash
    cd /back
    php -S VotreIP:8080 -t public
    ```
