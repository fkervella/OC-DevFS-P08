Kasa, plateforme de réservation en ligne

# Pré-requis
Installer le backend [https://github.com/OpenClassrooms-Student-Center/dev-react-P12](https://github.com/OpenClassrooms-Student-Center/dev-react-P12)

# Installation

```bash
npm install
npm run build
```

Créer le fichier .env.local avec les données suivantes :
NEXT_PUBLIC_API_URL= 'url du backend'
API_URL= 'url du backend'
SESSION_SECRET= 'secret pour le token

# Lancement du projet

```bash
npm start
```

Ouvrir [http://localhost:3000](http://localhost:3000) pour accéder à l'application

# Description du projet

Ce projet est la partie front d'un système de gestion de location d'appartements et de maisons entre particuliers.
Le front-end en Next.js et React
Les fonctionnalités de l'application sont :
* connexion de l'utilisateur
* enregistrement de l'utilisateur
* affichage des logements
* affichage des détails d'une propriété
* naviguer entre les logements
* affichage des favoris
* ajout de favoris par l'utilisateur connecté
* ajout d'une nouvelle propriété
* ajout de photos à une propriété existante
* sélection des équipements d'une propriété
* contact de l'hôte
* envoi de message à l'hôte

# Sprint 1 : obligatoire

## Etape 1 : Initialisation du projet Next.js + dépôt Git

## Etape 2 : Configuration de l accès au back-end

## Etape 3 : Création du layout et intégration du design global (composants, styles) identification des parties client et server
    *Proxy
    *Page 404 S1
    Composants :
        *Header
        *Footer
        *Button

## Etape 4 : Création de la page d accueil y compris responsive, loader
    Se connecter Page Login S1
        *Formulaire de connexion fonctionnel
        *Message d erreur si identifiants invalides
        *Mot de passe sécurisé

    *Afficher les logements dans la page accueil Page accueil S1
        *sous forme de carte contenant image, titre, prix et bouton favori
    
    Composants :
        *PropertyCard

## Etape 5 : Création de la page détail d une propriété avec carrousel dynamique et tests unitaires
    *Naviguer vers un logement depuis la page accueil Page logement S1
        *Redirection vers la page de détails du logement
    
    Afficher les détails d'une propriété
        *Carrousel navigable avec animations fluides et discrètes
        *Carrousel boucle
        *Carrousel avec hauteur fixe
        *Carrousel accessible au clavier
        *Carrousel n'affiche pas les flèches lorsqu'il n'y a qu'une seule image
        *Eléments collapse interactifs peuvent être ouverts et fermés grâce au clic avec animation fluide et discrète
        *Tests unitaires vérifiant le fonctionnement du carrousel réalisés
    
    *Contacter l'ĥote
        *Bouton "envoyer un message" renvoie vers la page de messagerie

## Etape 6 : Gestion des favoris, dans localStorage
    *Création de la page favoris

    Ajouter des favoris dans la page accueil
        *icone s'anime lors de la sélection d'un favori
        *logement apparaît dans la page des favoris
        *tests unitaires des favoris réalisés
        *enregistrment dans le stockage local avec Context et LocalStorage

## Etape 7 : *Ajout d un sitemap

## Etape 8 : *Accessibilité du site WCAG avec lighthouse (indicateurs tous au vert) et wave

## Etape 9 : *Documentation du code avec JSDoc (retenu) ou Storybook

## Etape 10 : Déploiement en ligne du projet






# Sprint 2 : facultatif

## Ajouter une propriété : Page ajout de propriété S2
    champs obligatoires : titre, description, localisation, prix, photos, équipements
    Validation de données

## Ajouter des photos :
    Bouton "Ajouter une image" fonctionnel
    Aperçu des images téléchargées
    Limite de taille des fichiers gérée

## Sélectionner des équipements :
    Cases à cocher pour chaque équipement
    Equipements enregistrés avec la propriété
    Liste prédéfinie des équipements

## S'inscrire : Page Signin S2
    Formulaire d'inscription avec validation
    Email de confirmation envoyé
    RGPD respecté

## Afficher les favoris : Page favoris S2
    Liste des logements favoris
    Stockage persistent

## Envoyer le message : Page messagerie S2
    Champ de texte pour rédiger un message
    Bouton "Envoyer" fonctionne
    Historique des messages visible
    Nécessité de modifier le back-end

## Page A propos S2




