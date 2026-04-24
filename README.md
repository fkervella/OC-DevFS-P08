Kasa, plateforme de réservation en ligne

# Pré-requis
Installer le backend [https://github.com/OpenClassrooms-Student-Center/dev-react-P12](https://github.com/OpenClassrooms-Student-Center/dev-react-P12)

# Installation

```bash
npm install
npm run build
```

Créer le fichier .env.local avec les données suivantes :

NEXT_PUBLIC_API_URL= 'url du backend'

API_URL= 'url du backend'

SESSION_SECRET= 'secret pour le token

# Lancement du projet

```bash
npm start
```

Ouvrir [http://localhost:3000](http://localhost:3000) pour accéder à l'application

# Description du projet

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

* __Proxy__
* __Page 404 Sprint 1__
* __Composants__ :
   * __Header__
   * __Footer__
   * __Button__

## Etape 4 : Création de la page d accueil y compris responsive, loader

* __Se connecter Page Login Sprint 1__
   * __Formulaire de connexion fonctionnel__
   * __Message d erreur si identifiants invalides__
   * __Mot de passe sécurisé__

* __Afficher les logements dans la page accueil Page accueil Sprint 1__
   * __sous forme de carte contenant image, titre, prix et bouton favori__
    
* __Composants__ :
   * __PropertyCard__

## Etape 5 : Création de la page détail d une propriété avec carrousel dynamique et tests unitaires

* __Naviguer vers un logement depuis la page accueil Page logement Sprint 1__
   * __Redirection vers la page de détails du logement__
    
* __Afficher les détails d'une propriété__
   * __Carrousel navigable avec animations fluides et discrètes__
   * __Carrousel boucle__
   * __Carrousel avec hauteur fixe__
   * __Carrousel accessible au clavier__
   * __Carrousel n'affiche pas les flèches lorsqu'il n'y a qu'une seule image__
   * __Eléments collapse interactifs peuvent être ouverts et fermés grâce au clic avec animation fluide et discrète__
   * __Tests unitaires vérifiant le fonctionnement du carrousel réalisés__
    
* __Contacter l'ĥote__
   * __Bouton "envoyer un message" renvoie vers la page de messagerie__

## Etape 6 : Gestion des favoris, dans localStorage

* __Création de la page favoris__

* __Ajouter des favoris dans la page accueil__
   * __icone s'anime lors de la sélection d'un favori__
   * __logement apparaît dans la page des favoris__
   * __tests unitaires des favoris réalisés__
   * __enregistrment dans le stockage local avec Context et LocalStorage__

## Etape 7 : Ajout d un sitemap

## Etape 8 : Accessibilité du site WCAG avec lighthouse (indicateurs tous au vert) et wave

## Etape 9 : Documentation du code avec JSDoc (retenu) ou Storybook

## Etape 10 : Déploiement en ligne du projet






# Sprint 2 : facultatif

## Ajouter une propriété : Page ajout de propriété Sprint 2

* champs obligatoires : titre, description, localisation, prix, photos, équipements
* Validation de données

## Ajouter des photos :

* Bouton "Ajouter une image" fonctionnel
* Aperçu des images téléchargées
* Limite de taille des fichiers gérée

## Sélectionner des équipements :

* Cases à cocher pour chaque équipement
* Equipements enregistrés avec la propriété
* Liste prédéfinie des équipements

## S'inscrire : Page Signin Sprint 2

* Formulaire d'inscription avec validation
* Email de confirmation envoyé
* RGPD respecté

## Afficher les favoris : Page favoris Sprint 2

* Liste des logements favoris
* Stockage persistent

## Envoyer le message : Page messagerie Sprint 2

* Champ de texte pour rédiger un message
* Bouton "Envoyer" fonctionne
* Historique des messages visible
* Nécessité de modifier le back-end

## Page A propos Sprint 2
