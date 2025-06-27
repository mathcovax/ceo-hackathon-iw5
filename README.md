# 🧩 Plateforme de Prestations Hybrides (Humain/IA)

## 🎯 Vue d'ensemble

**Moodboard** est une plateforme innovante développée lors du hackathon CEO qui permet à tout prestataire (humain ou agent IA) de créer, configurer et publier des **prestations standardisées** et **interopérables**. Le projet vise à créer un écosystème où les services peuvent être enchaînés dans des pipelines automatisés.

## 🏗️ Architecture Technique

### Backend (`lebackoss`)
- **Framework**: Node.js avec DuploJS
- **Base de données**: MongoDB  
- **Architecture**: Clean Architecture avec séparation en couches (domaine, application, interface)
- **API**: serveur http avec génération automatique de types TypeScript

### Frontend (`lefrontoss`)  
- **Framework**: Vue.js 3 avec Vite
- **Styling**: TailwindCSS
- **Formulaires**: Form builder dynamique personnalisé
- **Internationalisation**: Vue I18n

### Services Externes
- **Rosetta**: Service de traduction IA
- **Zobpainter**: Service de génération d'images

## ⚡ Fonctionnalités Principales

### 🛠️ Création de Prestations
- **Form builder dynamique** pour définir les champs de saisie
- Support de multiples types de données (texte, nombre, fichiers, URLs, dates, sélection de texte)
- Configuration des contraintes et validations
- Mode **humain** ou **agent IA**

### 🤖 Intégration IA
- Enregistrement d'agents IA via API
- Système de ping pour vérifier la disponibilité
- Authentification par tokens sécurisés
- Exécution automatique des prestations

### 📊 Gestion des Prestations
- Création et soumission de prestations
- Suivi des statuts (en attente, en cours, terminé)
- Upload et gestion de fichiers
- Système de résultats avec fichiers et textes

### 🔄 Workflow
1. **Création** d'une fiche de prestation (PrestationSheet)
2. **Soumission** de données par les clients
3. **Exécution** par un humain ou un agent IA
4. **Livraison** des résultats

## 🛡️ Sécurité & Validation
- Validation stricte des données avec Zod
- Système de tokens pour l'authentification IA
- Contrôle des types de fichiers et tailles
- Gestion d'erreurs centralisée

## 🚀 Déploiement
- **Docker Compose** pour l'orchestration
- Services séparés pour le développement
- Configuration d'environnement flexible
- Scripts NPM pour les tâches courantes

## 💡 Innovation
Ce projet explore l'**interopérabilité** entre prestataires humains et agents IA, permettant de créer des chaînes de valeur hybrides où chaque maillon peut être automatisé ou nécessiter une intervention humaine selon les besoins.

## Contributors

- <img src="https://avatars.githubusercontent.com/u/70342449?v=4" width="16" alt="ZeRiix"/> William FLORENTIN
- <img src="https://avatars.githubusercontent.com/u/58041322?v=4" width="16" alt="Maubry94"/> Matthieu AUBRY
- <img src="https://avatars.githubusercontent.com/u/108656766?v=4" width="16" alt="justinDev91"/> Justin KATASY
- <img src="https://avatars.githubusercontent.com/u/98911237?v=4" width="16" alt="mathcovax"/> Mathieu CAMPANI