# Changelog

Toutes les modifications notables de `calcul-materiaux-travaux-fr` sont documentées dans ce fichier.

## [2026.1.0] - 2026-11-24

### Ajouté
- Moteur de calcul JavaScript ESM zéro dépendance (`src/index.js`) et déclarations TypeScript (`src/index.d.ts`) couvrant 6 modules chantier :
  - **Béton & dosage** (`calculBeton`) : modes bétonnière (250 / 300 / 350 / 400 kg/m³), béton pré-dosé en sacs de 35 kg (17 L) ou 25 kg (12,5 L), et chape mortier sans gravier (NF DTU 26.2).
  - **Parpaing & mur** (`calculParpaing`) : blocs creux 10 / 15 / 20 cm (10 blocs/m²), mur droit, pignon triangulaire et parpaings à bancher avec béton de remplissage et aciers HA10.
  - **Carrelage & colle** (`calculCarrelage`) : 6 formats courants (10×20 à 60×60 cm), pose droite (+10 %) ou diagonale (+15 %), boîtes entières, colle C2 et joints.
  - **Gravier & Big Bag** (`calculGravier`) : conversion volume ↔ tonnage (1,5 à 1,7 t/m³), Big Bag 1 t / 1,5 t, sacs 25 kg, géotextile et dalles stabilisatrices.
  - **Peinture & pots** (`calculPeinture`, `optimiserPotsPeinture`) : murs, plafond ou pièce complète, déduction portes/fenêtres, sous-couche et optimisation des pots 10 L / 5 L / 2,5 L / 1 L.
  - **Pente de toit** (`calculPente`, `convertirPente`) : conversion % ↔ degrés, longueur de rampant (Pythagore), surface développée et contrôle de conformité NF DTU (40.35, 40.21, 40.22, 40.11, 40.14).
  - **Diagnostic transport** (`diagnostiquerTransport`) : paliers voiture / remorque-utilitaire / livraison négoce.
- Jeux de données ouverts sous licence CC BY 4.0 dans `data/` (`materiaux-dosages-fr-2026.json`, `dosage-beton-fr.csv`, `densites-granulats-fr.csv`, `rendements-second-oeuvre.csv`).
- Suite complète de tests unitaires (`node:test`) et workflow GitHub Actions CI sur Node.js 20 et 22.
