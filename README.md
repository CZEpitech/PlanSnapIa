# API de Génération d'Annonces de Rencontre

Une API NodeJS qui génère des annonces de rencontre pour des profils féminins en utilisant de l'intelligence artificielle locale sans clé API.

## Fonctionnalités

- Génération de titres et descriptions attrayants
- Utilisation d'un modèle d'IA local (aucune clé API requise)
- API REST simple et facile à utiliser

## Installation

```bash
# Cloner le repo
git clone <votre-repo>
cd <votre-repo>

# Installer les dépendances
npm install
```

## Démarrage

```bash
# Démarrer le serveur
node server.js
```

Le serveur démarre sur le port 3000 par défaut (configurable via la variable d'environnement PORT).

## Utilisation de l'API

### Générer une annonce de rencontre

**Endpoint:** `POST /api/generer-annonce`

**Corps de la requête (JSON):**

```json
{
  "nom": "Émilie",
  "age": 28,
  "ville": "Paris"
}
```

**Réponse:**

```json
{
  "success": true,
  "annonce": {
    "titre": "Une Parisienne pleine de vie",
    "description": "Émilie, jeune femme dynamique et passionnée, cherche à partager des moments authentiques..."
  }
}
```

## Notes techniques

- Cette API utilise `@xenova/transformers` pour exécuter un modèle d'IA localement
- Le modèle utilisé est `Xenova/distilgpt2-fr`, un modèle léger en français
- Le premier appel peut prendre quelques secondes pendant le chargement du modèle

## Licence

ISC
