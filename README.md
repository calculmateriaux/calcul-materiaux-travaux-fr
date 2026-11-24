# calcul-materiaux-travaux-fr

[![CI](https://github.com/calculmateriaux/calcul-materiaux-travaux-fr/actions/workflows/ci.yml/badge.svg)](https://github.com/calculmateriaux/calcul-materiaux-travaux-fr/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Data License: CC BY 4.0](https://img.shields.io/badge/Data-CC%20BY%204.0-lightgrey.svg)](./data/LICENSE-DATA.md)

**Référentiel technique ouvert et moteur de calcul JavaScript (ESM, zéro dépendance) pour estimer les quantités de matériaux travaux selon les normes françaises NF et DTU 2026** (système métrique : France, Belgique, Suisse et Canada francophone).

En pratique de chantier courante (**NF EN 206/CN** et **NF DTU 13.3**), **1 m³ de béton standard dosé à 350 kg/m³** requiert exactement **10 sacs de ciment de 35 kg** (ou **14 sacs de 25 kg**), **800 kg de sable 0/4**, **1 080 kg de gravier 4/20** (ou **1 850 kg de mélange béton prêt**) et **175 L d’eau** ; en béton pré-dosé de 35 kg (17 L/sac), il faut **59 sacs/m³**. Le dépôt couvre aussi les densités de granulats (1,5 à 1,7 t/m³ et conversion Big Bag), les parpaings NF 20 × 20 × 50 cm (10 blocs/m²), le carrelage (marges +10 % / +15 %, colle C2), la peinture (10 m²/L, 2 couches) et les pentes de toit (NF DTU 40.35 / 40.21).

> **English summary:** Zero-dependency Node.js (ESM) calculation engine and structured open reference datasets (JSON & CSV) implementing standard French construction material formulas (NF EN 206/CN, NF EN 771-3, NF DTU 13.3, 20.1, 26.2, 40.x, 52.2, 59.1) for concrete, aggregates, concrete blocks, tiles, paint, and roof pitch. Code is MIT-licensed and reference datasets are published under CC BY 4.0.

---

## Tables de référence rapide (normes NF / DTU 2026)

### 1. Dosage béton pour 1 m³ (bétonnière)

| Ouvrage / Usage | Dosage ciment | Sacs 35 kg | Sacs 25 kg | Sable 0/4 | Gravier 4/20 | Mélange béton | Eau |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Béton de propreté / calage | 250 kg/m³ | 8 sacs | 10 sacs | 850 kg | 1 130 kg | 1 920 kg | 125 L |
| Fondations / semelles filantes | 300 kg/m³ | 9 sacs | 12 sacs | 830 kg | 1 100 kg | 1 880 kg | 150 L |
| Dalle armée, terrasse, linteau | 350 kg/m³ | 10 sacs | 14 sacs | 800 kg | 1 080 kg | 1 850 kg | 175 L |
| Poteaux, allée carrossable forte charge | 400 kg/m³ | 12 sacs | 16 sacs | 760 kg | 1 050 kg | 1 800 kg | 195 L |

*Béton pré-dosé prêt à l’emploi : sac 35 kg ≈ 17 L (59 sacs/m³, ~3,5 L d’eau/sac) ; sac 25 kg ≈ 12,5 L (80 sacs/m³, ~2,5 L d’eau/sac). Chape mortier sans gravier (NF DTU 26.2) : 300–350 kg/m³ de ciment + 1 500 kg/m³ de sable 0/4 + 175 L/m³ d’eau.*

### 2. Densités de granulats et couverture Big Bag (épaisseur 5 cm)

| Type de granulat | Densité | Sacs 25 kg / m³ | Volume Big Bag 1 t | Surface Big Bag 1 t (5 cm) | Surface Big Bag 1,5 t (5 cm) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Gravier roulé 8/16 (décoratif) | 1 500 kg/m³ (1,5 t/m³) | 60 sacs | 0,667 m³ | ~13,3 m² | ~20,0 m² |
| Gravier concassé 6/14 ou 10/14 | 1 600 kg/m³ (1,6 t/m³) | 64 sacs | 0,625 m³ | ~12,5 m² | ~18,8 m² |
| Sable de carrière 0/4 | 1 500 kg/m³ (1,5 t/m³) | 60 sacs | 0,667 m³ | ~13,3 m² | ~20,0 m² |
| Tout-venant / GNT 0/20 ou 0/31,5 | 1 700 kg/m³ (1,7 t/m³) | 68 sacs | 0,588 m³ | ~11,8 m² | ~17,6 m² |

### 3. Pentes minimales de couverture (NF DTU série 40)

| Matériau de couverture | Référence | Pente min. absolue | Pente courante | Équivalence degrés |
| :--- | :---: | :---: | :---: | :---: |
| Bac acier nervuré (plaque d’un tenant) | NF DTU 40.35 | 5 % (2,9°) | 15 % | 2,9° à 8,5° |
| Polycarbonate (pergola / véranda) | Avis technique | 5 % (2,9°) | 10 % | 2,9° à 5,7° |
| Bardeau bitumé / Shingle | NF DTU 40.14 | 20 % (11,3°) | 25 % | 11,3° à 14,0° |
| Ardoises naturelles / fibres-ciment | NF DTU 40.11 | 20 % (11,3°) | 35 % | 11,3° à 19,3° |
| Tuiles canal (Sud / Méditerranée) | NF DTU 40.22 | 24 % (13,5°) | 30 % | 13,5° à 16,7° |
| Tuiles mécaniques à emboîtement | NF DTU 40.21 | 25 % (14,0°) | 35 % | 14,0° à 19,3° |

---

## Utilisation (Node.js 18+ ESM)

Aucune dépendance externe n’est requise. Les déclarations TypeScript sont fournies dans [`src/index.d.ts`](./src/index.d.ts).

```js
import {
  calculBeton,
  calculGravier,
  calculParpaing,
  calculCarrelage,
  calculPeinture,
  calculPente,
  convertirPente,
} from './src/index.js';

// 1. Dalle terrasse 5 x 4 m, épaisseur 12 cm, dosage 350 kg/m³, marge 5 %
const dalle = calculBeton({
  longueur: 5,
  largeur: 4,
  epaisseur: 12,
  mode: 'betonniere',
  dosage: 350,
  sacPoids: 35,
  marge: 5,
});
// -> { volumeM3: 2.52, sacsCiment: 26, melangeKg: 4662, eauL: 441, bigBagsMelange15t: 4, ... }

// 2. Allée 10 x 3 m, 5 cm de gravier concassé (1,6 t/m³), tassement 5 %
const allee = calculGravier({
  longueur: 10,
  largeur: 3,
  epaisseur: 5,
  materiau: 'gravier_concasse',
  tassement: 5,
});
// -> { volumeM3: 1.575, tonnes: 2.52, bigBags1t: 3, bigBags15t: 2, geotextileM2: 33, ... }

// 3. Mur de clôture 15 x 1,80 m en parpaings creux de 20 cm (+5 %)
const mur = calculParpaing({
  forme: 'rectangle',
  longueur: 15,
  hauteur: 1.8,
  typeBloc: 'creux20',
  perte: 5,
});
// -> { surfaceNetteM2: 27, blocsTotal: 284, palettes: 6, sacsMortier25: 22, ... }

// 4. Vérification pente de toit bac acier 1 pan (portée 4 m, hauteur 0,40 m)
const toit = calculPente({
  modeInput: 'hauteur',
  portee: 4,
  hauteur: 0.4,
  longueurToit: 6,
  nbPans: 1,
  materiau: 'bac_acier',
});
// -> { pentePct: 10, angleDeg: 5.71, rampantM: 4.02, dtu: { statut: 'warn', norme: 'NF DTU 40.35', ... } }

// 5. Conversion rapide pente (%) <-> degrés (°)
convertirPente({ pourcentage: 2 }); // -> { pourcentage: 2, degres: 1.146, cmParMetre: 2, coefficientRampant: 1.0002 }
```

### Exécuter les tests

```bash
npm test
```

---

## API exportée

| Symbole | Description |
| :--- | :--- |
| `calculBeton(input)` | Volume m³, sacs de ciment 35/25 kg, sable 0/4, gravier 4/20, mélange béton, eau ; modes `betonniere`, `predose` et `mortier`. |
| `calculParpaing(input)` | Nombre de blocs NF (10/m²), palettes, mortier prêt 25 kg ou ciment + sable ; supporte mur droit, pignon triangulaire et parpaings à bancher (`bancher20`). |
| `calculCarrelage(input)` | Surface avec perte (+10 % droite / +15 % diagonale), boîtes entières, carreaux, colle C2 (sacs 25 kg), joints (sacs 5 kg) et croisillons. |
| `calculGravier(input)` | Volume m³, tonnage selon densité (1,5 à 1,7 t/m³), Big Bag 1 t / 1,5 t, sacs 25 kg, géotextile (+10 %) et dalles stabilisatrices 120 × 80 cm. |
| `calculPeinture(input)` | Surface murs / plafond avec déduction portes (1,7 m²) et fenêtres (1,5 m²), litrage (+5 % bac), sous-couche optionnelle et combinaison optimale de pots. |
| `optimiserPotsPeinture(litres)` | Calcule la répartition optimale de pots 10 L / 5 L / 2,5 L / 1 L minimisant le surplus et le nombre de conditionnements. |
| `calculPente(input)` | Pente %, angle °, longueur du rampant (Pythagore), surface développée (+10 % recouvrements) et diagnostic de conformité NF DTU. |
| `convertirPente(input)` | Convertit une pente en pourcentage (%) vers degrés (°), cm/m et coefficient de rampant, ou inversement. |
| `diagnostiquerTransport(poidsKg)` | Classe le poids total en `car` (≤ 380 kg), `van` (≤ 1 100 kg) ou `truck` (> 1 100 kg). |
| `BETON_DOSAGE_TABLE`, `BETON_PREDOSE_SPECS`, `PARPAING_SPECS`, `CARRELAGE_FORMATS`, `GRAVIER_SPECS`, `TOITURE_DTU` | Constantes gelées (`Object.freeze`) des paramètres normalisés 2026. |

---

## Jeux de données ouverts (`data/`)

Les données structurées sont publiées sous licence **CC BY 4.0** (voir [`data/LICENSE-DATA.md`](./data/LICENSE-DATA.md)) :

- [`data/materiaux-dosages-fr-2026.json`](./data/materiaux-dosages-fr-2026.json) — Jeu de données complet avec métadonnées (`updated_at`, `jurisdiction`, `sources`).
- [`data/dosage-beton-fr.csv`](./data/dosage-beton-fr.csv) — Table des dosages béton 250 / 300 / 350 / 400 kg/m³ (sacs 35 kg / 25 kg, sable, gravier, mélange, eau).
- [`data/densites-granulats-fr.csv`](./data/densites-granulats-fr.csv) — Masses volumiques apparentes des granulats (kg/m³ et t/m³) et conversions Big Bag 1 t / 1,5 t.
- [`data/rendements-second-oeuvre.csv`](./data/rendements-second-oeuvre.csv) — Repères parpaings NF, formats carrelage (colle C2 et joints) et rendements peinture.

---

## Questions fréquentes (FAQ)

### Combien de sacs de ciment de 35 kg faut-il pour 1 m³ de béton dosé à 350 kg/m³ ?
Il faut exactement **10 sacs de ciment de 35 kg** (ou **14 sacs de 25 kg**), accompagnés de 800 kg de sable 0/4, 1 080 kg de gravier 4/20 (soit 1 850 kg de mélange béton) et 175 L d’eau. Pour une dalle de 20 m² en 12 cm (+5 % de marge = 2,52 m³), cela représente 26 sacs de 35 kg.

### Combien de sacs de béton pré-dosé de 35 kg faut-il pour 1 m³ ?
Un sac de béton prêt à l’emploi de 35 kg produit environ **17 litres** de béton frais : il faut donc **59 sacs de 35 kg par m³** (ou **80 sacs de 25 kg** à raison de 12,5 L/sac). Pour un plot de poteau de 30 × 30 × 50 cm (45 L), prévoyez 3 sacs de 35 kg.

### Quelle surface couvre un Big Bag de 1 tonne de gravier sur 5 cm d’épaisseur ?
Un Big Bag de **1 tonne** de gravier concassé (densité 1,6 t/m³) représente **0,625 m³** et couvre environ **12,5 m²** sur 5 cm d’épaisseur (environ 13,3 m² pour du gravier roulé à 1,5 t/m³). Un Big Bag de 1,5 tonne couvre environ 18,8 m² en concassé.

### Combien de parpaings 20 × 20 × 50 cm faut-il au m² et combien par palette ?
Un parpaing normalisé NF mesure 20 × 50 cm en parement (0,10 m²), soit **10 parpaings par m² net**. Ajoutez 5 % de marge sur un mur droit et 10 % sur un pignon triangulaire. Une palette standard contient **50 parpaings de 20 cm** (~950 kg), 60 blocs de 15 cm ou 90 blocs de 10 cm.

### Quelle est la pente minimale pour une toiture en bac acier selon le NF DTU 40.35 ?
La norme **NF DTU 40.35** fixe une pente minimale absolue de **5 %** (2,9°) uniquement pour des plaques nervurées d’un seul tenant (sans recouvrement transversal) en site protégé. En pratique, une pente de **7 % à 15 %** est conseillée selon la zone climatique et les recouvrements.

---

## Calculateur interactif & sources

- **Calculateur web interactif (schémas cotés, liste de courses chantier et export PNG)** : <https://calculmateriaux.com/>
  - Béton & dosage : <https://calculmateriaux.com/calcul-beton/>
  - Gravier, sable & Big Bag : <https://calculmateriaux.com/calcul-gravier/>
  - Parpaing, pignon & bloc à bancher : <https://calculmateriaux.com/calcul-parpaing/>
  - Pente de toit & contrôle NF DTU : <https://calculmateriaux.com/calcul-pente-toit/>

> **Transparence :** l'outil en ligne gratuit sans inscription est maintenu par le même auteur.  
> **Disclosure:** The free, no-signup web calculator at `calculmateriaux.com` is maintained by the same author.

### Références normatives et techniques
- **NF EN 206/CN** — Béton : spécification, performance, production et conformité (complément national France).
- **NF DTU 13.1** & **NF DTU 13.3** — Fondations superficielles et dallages.
- **NF DTU 26.2** — Chapes et dalles à base de liants hydrauliques.
- **NF EN 771-3** & **NF DTU 20.1** — Blocs en béton de granulats et ouvrages en maçonnerie de petits éléments.
- **NF DTU 52.2** — Pose collée des revêtements céramiques et assimilés.
- **NF DTU 59.1** — Travaux de peinture des bâtiments.
- **NF DTU 40.11 / 40.14 / 40.21 / 40.22 / 40.35** — Couvertures (ardoises, bardeaux bitumés, tuiles mécaniques, tuiles canal, plaques nervurées acier).
- **UNPG** — Densités apparentes usuelles des granulats de carrière en France.

---

## Licences

- Code source (`src/`, `test/`) : [MIT License](./LICENSE).
- Données de référence (`data/`) : [CC BY 4.0](./data/LICENSE-DATA.md).
