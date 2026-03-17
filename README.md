# Frontend — Plateforme de Pèlerinages Chrétiens

Site web professionnel pour agence de voyages spirituels.

## Stack technique
- **Framework** : Next.js 14 (App Router)
- **Langage** : JavaScript (JSX)
- **Styles** : CSS Modules
- **Hébergement** : Vercel

## Installation
```bash
npm install
cp .env.local.example .env.local
# Remplir NEXT_PUBLIC_API_URL dans .env.local
npm run dev
```

## Variables d'environnement

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL du backend Express (Hostinger) |

## Scripts

| Commande | Action |
|---|---|
| `npm run dev` | Démarrage développement |
| `npm run build` | Build production |
| `npm run start` | Démarrage production |
| `npm run lint` | Vérification ESLint |
