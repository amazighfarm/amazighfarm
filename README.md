# Amazigh Farm — site de réservation directe

Site complet (frontend + backend) pour centraliser les réservations des hébergements
d'Amazigh Farm (Oumnass, Marrakech) et éviter les ~15,5 % de commission Airbnb.

Design épuré : typographie Cormorant Garamond / EB Garamond, bandeau photo (galerie qui
défile) sans filtre coloré, pas de vignettes ni de pastilles pour les prix et informations.

## Ce qui est inclus

- Page d'accueil : bannière en galerie de photos (paysages de la ferme + hébergements),
  liste des 5 hébergements (sans prix affiché — le prix n'apparaît que sur la fiche de
  chaque hébergement), teaser vers la page Expériences.
- Page `/experiences.html` dédiée : photos + texte pour chaque expérience proposée.
- Une page détaillée par hébergement (`/gite.html?slug=...`) : galerie, description,
  mention "Sur la ferme" ou "Annexe de la ferme" selon le cas, équipements, calendrier
  de disponibilité, formulaire de réservation avec prix et paiement Stripe.
- Blocage automatique des dates réservées.
- Page d'administration (`/admin.html`) pour voir les réservations et bloquer des
  dates manuellement.
- Synchronisation optionnelle avec le calendrier iCal d'Airbnb.

## Point d'attention : Maison berbère

Contrairement aux 4 autres hébergements, la "Maison berbère" n'est pas située sur le
terrain de la ferme : c'est une annexe du domaine, dans le village voisin, avec sa
propre piscine privée. Cette précision apparaît automatiquement sur la page d'accueil
et sur sa fiche détaillée (champ `locationLabel` dans `server/data/listings.js`).

## Avant la mise en ligne

1. **Télécharger les photos en local** (étape obligatoire, voir section suivante) :
   `node scripts/download-images.js`. Sans cette étape, les photos ne s'afficheront
   pas — Airbnb bloque l'affichage de ses images depuis un autre site.
2. **Corriger les prix** dans `server/data/listings.js` (`pricePerNight`, `cleaningFee`).
3. **Créer un compte Stripe**, récupérer les clés API, les mettre dans `.env`.
4. **Vérifier le cadrage des photos** de la bannière d'accueil (`public/index.html`,
   bloc `#hero-carousel`) une fois le site lancé en local, et remplacer une image si
   besoin (voir section "Changer une photo" ci-dessous).
5. (Optionnel) remplacer les photos par tes propres photos de la ferme (voir plus bas).
6. (Optionnel) ajouter le logo Amazigh Farm sous le nom sur la page d'accueil.

## Étape obligatoire : télécharger les photos en local

Les photos des annonces sont hébergées par défaut sur les serveurs d'Airbnb
(muscache.com), qui bloquent leur affichage dès qu'elles sont intégrées sur un autre
site (protection anti-hotlink) — c'est ce qui causait les images cassées. La solution :
les télécharger une fois pour toutes sur ton propre serveur.

```
cd chemin/vers/le/dossier/site
node scripts/download-images.js
```

Ce script télécharge les 33 photos des 5 annonces dans `public/images/<nom-du-gite>/`.
Lance-le sur ta machine (avec un accès internet normal), une seule fois avant le
premier déploiement — ensuite les photos sont servies directement par ton site et ne
dépendent plus d'Airbnb.

## Changer une photo ou ajouter tes propres photos

Remplace simplement le fichier correspondant dans `public/images/<nom-du-gite>/NN.jpg`
par ta propre photo (même nom de fichier), ou ajoute une nouvelle photo et mets à jour
le nombre dans `server/data/listings.js` (ex. `localImages("maison-boheme", 9)` devient
`localImages("maison-boheme", 10)` si tu ajoutes `10.jpg`). Pour changer les photos de
la bannière d'accueil, modifie les chemins `src="/images/..."` dans le bloc
`#hero-carousel` de `public/index.html`.

## Lancer le site en local

```
cd chemin/vers/le/dossier/site
npm install
node scripts/download-images.js
npm start
```

Ouvre ensuite http://localhost:3000

## Déployer en ligne (hébergement Node requis)

**Render.com** (recommandé) : "New +" > "Web Service", build `npm install`, start
`npm start`, ajoute les variables de `.env` dans "Environment".

**Railway.app** : même principe.

## Webhook Stripe (obligatoire pour confirmer les paiements)

Dashboard Stripe > Développeurs > Webhooks > Ajouter `https://TON-SITE/api/webhook`,
événement `checkout.session.completed`, copier le secret dans `STRIPE_WEBHOOK_SECRET`.

## Synchroniser avec le calendrier Airbnb

Annonce Airbnb > Calendrier > Disponibilité > "Synchroniser les calendriers" >
"Exporter le calendrier" > coller le lien `.ics` dans `server/data/listings.js`
(champ `icalUrl`).

## Administration

`/admin.html`, jeton = `ADMIN_TOKEN` défini dans `.env`.

## Structure

```
site/
  server/               backend Express (API, Stripe, disponibilites)
  public/
    index.html            accueil (bandeau galerie + liste hebergements, sans prix)
    experiences.html       page dediee aux experiences
    gite.html              fiche hebergement + reservation
    admin.html              tableau de bord admin
  data/db.json            reservations + dates bloquees
  .env.example             variables d'environnement a copier en .env
```
