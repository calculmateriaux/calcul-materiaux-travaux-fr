/**
 * calcul-materiaux-travaux-fr
 * Moteur de calcul matériaux travaux conforme aux repères techniques français (NF / DTU 2026).
 * Zéro dépendance — Node.js 18+ ESM.
 */

export const BETON_DOSAGE_TABLE = Object.freeze({
  250: Object.freeze({
    dosageKgM3: 250,
    sableKgM3: 850,
    gravierKgM3: 1130,
    melangeKgM3: 1920,
    eauLM3: 125,
    sacs35KgParM3: 8,
    sacs25KgParM3: 10,
    usage: 'Béton de propreté / calage',
  }),
  300: Object.freeze({
    dosageKgM3: 300,
    sableKgM3: 830,
    gravierKgM3: 1100,
    melangeKgM3: 1880,
    eauLM3: 150,
    sacs35KgParM3: 9,
    sacs25KgParM3: 12,
    usage: 'Fondations / semelles filantes',
  }),
  350: Object.freeze({
    dosageKgM3: 350,
    sableKgM3: 800,
    gravierKgM3: 1080,
    melangeKgM3: 1850,
    eauLM3: 175,
    sacs35KgParM3: 10,
    sacs25KgParM3: 14,
    usage: 'Dalle armée, terrasse, linteau',
  }),
  400: Object.freeze({
    dosageKgM3: 400,
    sableKgM3: 760,
    gravierKgM3: 1050,
    melangeKgM3: 1800,
    eauLM3: 195,
    sacs35KgParM3: 12,
    sacs25KgParM3: 16,
    usage: 'Poteaux, allée carrossable forte charge',
  }),
});

export const BETON_PREDOSE_SPECS = Object.freeze({
  35: Object.freeze({
    sacPoidsKg: 35,
    rendementSacL: 17,
    eauParSacL: 3.5,
    sacsParM3: 59,
  }),
  25: Object.freeze({
    sacPoidsKg: 25,
    rendementSacL: 12.5,
    eauParSacL: 2.5,
    sacsParM3: 80,
  }),
});

export const PARPAING_SPECS = Object.freeze({
  creux20: Object.freeze({
    id: 'creux20',
    nom: 'Parpaing creux 20 × 20 × 50 cm (NF)',
    epCm: 20,
    hauteurCm: 20,
    longueurCm: 50,
    blocsParM2: 10,
    poidsKg: 19,
    parPalette: 50,
    estBancher: false,
  }),
  creux15: Object.freeze({
    id: 'creux15',
    nom: 'Parpaing creux 15 × 20 × 50 cm (NF)',
    epCm: 15,
    hauteurCm: 20,
    longueurCm: 50,
    blocsParM2: 10,
    poidsKg: 15,
    parPalette: 60,
    estBancher: false,
  }),
  creux10: Object.freeze({
    id: 'creux10',
    nom: 'Parpaing creux 10 × 20 × 50 cm (cloison)',
    epCm: 10,
    hauteurCm: 20,
    longueurCm: 50,
    blocsParM2: 10,
    poidsKg: 11,
    parPalette: 90,
    estBancher: false,
  }),
  bancher20: Object.freeze({
    id: 'bancher20',
    nom: 'Parpaing à bancher 20 × 20 × 50 cm',
    epCm: 20,
    hauteurCm: 20,
    longueurCm: 50,
    blocsParM2: 10,
    poidsKg: 21,
    parPalette: 50,
    estBancher: true,
    betonRemplissageLM2: 100,
  }),
});

export const CARRELAGE_FORMATS = Object.freeze({
  '30x30': Object.freeze({ w: 30, h: 30, label: '30 × 30 cm', colleKgM2: 4.0, jointKgM2: 0.6, defBoite: 1.44 }),
  '45x45': Object.freeze({ w: 45, h: 45, label: '45 × 45 cm', colleKgM2: 4.5, jointKgM2: 0.5, defBoite: 1.42 }),
  '60x60': Object.freeze({ w: 60, h: 60, label: '60 × 60 cm', colleKgM2: 5.5, jointKgM2: 0.4, defBoite: 1.44 }),
  '30x60': Object.freeze({ w: 30, h: 60, label: '30 × 60 cm', colleKgM2: 4.8, jointKgM2: 0.5, defBoite: 1.44 }),
  '20x60': Object.freeze({ w: 20, h: 60, label: '20 × 60 cm (effet bois/mural)', colleKgM2: 4.5, jointKgM2: 0.55, defBoite: 1.2 }),
  '10x20': Object.freeze({ w: 10, h: 20, label: '10 × 20 cm (métro / crédence)', colleKgM2: 3.5, jointKgM2: 0.85, defBoite: 1.0 }),
});

export const GRAVIER_SPECS = Object.freeze({
  gravier_roule: Object.freeze({
    id: 'gravier_roule',
    label: 'Gravier roulé décoratif (8/16)',
    densiteTM3: 1.5,
    densiteKgM3: 1500,
    note: 'Densité moyenne 1,5 t/m³',
  }),
  gravier_concasse: Object.freeze({
    id: 'gravier_concasse',
    label: 'Gravier concassé allée (6/14 ou 10/14)',
    densiteTM3: 1.6,
    densiteKgM3: 1600,
    note: 'Densité moyenne 1,6 t/m³',
  }),
  sable: Object.freeze({
    id: 'sable',
    label: 'Sable de carrière / pose pavés (0/4)',
    densiteTM3: 1.5,
    densiteKgM3: 1500,
    note: 'Densité moyenne 1,5 t/m³',
  }),
  tout_venant: Object.freeze({
    id: 'tout_venant',
    label: 'Tout-venant / GNT 0/20 ou 0/31,5 (sous-couche)',
    densiteTM3: 1.7,
    densiteKgM3: 1700,
    note: 'Densité compactée 1,7 t/m³',
  }),
});

export const TOITURE_DTU = Object.freeze({
  bac_acier: Object.freeze({
    id: 'bac_acier',
    label: 'Bac acier nervuré',
    dtu: 'NF DTU 40.35',
    minAbsoluPct: 5,
    minCourantPct: 15,
    poidsKgM2: 6.5,
    note: 'Min. 5 % sans recouvrement transversal (zone calme) ; 7 à 15 % recommandé selon zone climatique et longueur de plaque.',
  }),
  tuile_mecanique: Object.freeze({
    id: 'tuile_mecanique',
    label: 'Tuiles mécaniques à emboîtement',
    dtu: 'NF DTU 40.21',
    minAbsoluPct: 25,
    minCourantPct: 35,
    poidsKgM2: 44,
    note: 'Min. 25 à 35 % selon le modèle de tuile, la zone géographique (1, 2 ou 3) et la présence d’un écran sous-toiture.',
  }),
  tuile_canal: Object.freeze({
    id: 'tuile_canal',
    label: 'Tuiles canal (Sud / Méditerranée)',
    dtu: 'NF DTU 40.22',
    minAbsoluPct: 24,
    minCourantPct: 30,
    poidsKgM2: 50,
    note: 'Min. 24 à 30 % en zone 1 protégée ; jusqu’à 35 % en zone exposée.',
  }),
  ardoise: Object.freeze({
    id: 'ardoise',
    label: 'Ardoises naturelles / fibres-ciment',
    dtu: 'NF DTU 40.11',
    minAbsoluPct: 20,
    minCourantPct: 35,
    poidsKgM2: 28,
    note: 'Recouvrement à adapter strictement à la pente et à la région (souvent ≥ 30 à 40 %).',
  }),
  polycarbonate: Object.freeze({
    id: 'polycarbonate',
    label: 'Plaques polycarbonate (pergola / véranda)',
    dtu: 'Avis technique fabricant',
    minAbsoluPct: 5,
    minCourantPct: 10,
    poidsKgM2: 3.2,
    note: 'Min. 5 % (8 à 10 % conseillé) pour assurer l’écoulement de l’eau et l’autonettoyage.',
  }),
  shingle: Object.freeze({
    id: 'shingle',
    label: 'Bardeau bitumé / Shingle (abri de jardin)',
    dtu: 'NF DTU 40.14',
    minAbsoluPct: 20,
    minCourantPct: 25,
    poidsKgM2: 11,
    note: 'Min. 20 % recommandé sur support bois continu (OSB / voliges).',
  }),
});

function assertFiniteNumber(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`Le paramètre "${name}" doit être un nombre fini.`);
  }
}

function roundTo(value, decimals = 3) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Classe le poids total d'une commande matériaux en 3 paliers de transport.
 * @param {number} rawWeightKg
 */
export function diagnostiquerTransport(rawWeightKg) {
  assertFiniteNumber(rawWeightKg, 'rawWeightKg');
  const poidsKg = Math.max(1, Math.round(rawWeightKg));
  if (poidsKg <= 380) {
    return {
      tier: 'car',
      poidsKg,
      label: 'Coffre voiture OK (1 trajet)',
    };
  }
  if (poidsKg <= 1100) {
    return {
      tier: 'van',
      poidsKg,
      label: 'Remorque ou utilitaire (3,5 t)',
    };
  }
  return {
    tier: 'truck',
    poidsKg,
    label: 'Livraison négoce (camion-grue)',
  };
}

/**
 * 1. Calcul béton (bétonnière, pré-dosé en sacs, ou chape mortier sans gravier).
 */
export function calculBeton(input) {
  const {
    longueur = 5,
    largeur = 4,
    epaisseur = 12,
    quantite = 1,
    mode = 'betonniere',
    dosage = 350,
    sacPoids = 35,
    marge = 5,
  } = input ?? {};

  assertFiniteNumber(longueur, 'longueur');
  assertFiniteNumber(largeur, 'largeur');
  assertFiniteNumber(epaisseur, 'epaisseur');
  assertFiniteNumber(quantite, 'quantite');
  assertFiniteNumber(marge, 'marge');

  if (!['betonniere', 'predose', 'mortier'].includes(mode)) {
    throw new RangeError(`Mode béton invalide : "${mode}". Attendu : betonniere | predose | mortier.`);
  }
  if (!(dosage in BETON_DOSAGE_TABLE)) {
    throw new RangeError(`Dosage invalide : ${dosage}. Valeurs supportées : 250, 300, 350, 400.`);
  }
  if (sacPoids !== 35 && sacPoids !== 25) {
    throw new RangeError(`Poids de sac invalide : ${sacPoids}. Valeurs supportées : 25 ou 35.`);
  }

  const L = Math.max(0.1, longueur);
  const l = Math.max(0.1, largeur);
  const eCm = Math.max(1, epaisseur);
  const qty = Math.max(1, Math.round(quantite));
  const margePct = Math.max(0, Math.min(30, marge));

  const surfaceM2 = L * l * qty;
  const volumeBrutM3 = surfaceM2 * (eCm / 100);
  const volumeM3 = volumeBrutM3 * (1 + margePct / 100);
  const volumeLitres = volumeM3 * 1000;

  if (mode === 'predose') {
    const spec = BETON_PREDOSE_SPECS[sacPoids];
    const nbSacs = Math.ceil(volumeLitres / spec.rendementSacL);
    const poidsTotalKg = nbSacs * sacPoids;
    const eauL = nbSacs * spec.eauParSacL;
    return {
      mode,
      sacPoidsKg: sacPoids,
      surfaceM2: roundTo(surfaceM2, 3),
      volumeBrutM3: roundTo(volumeBrutM3, 4),
      volumeM3: roundTo(volumeM3, 4),
      volumeLitres: roundTo(volumeLitres, 1),
      margePct,
      rendementSacL: spec.rendementSacL,
      sacsParM3: spec.sacsParM3,
      nbSacs,
      eauL: roundTo(eauL, 1),
      polyaneEtTreillisM2: roundTo(surfaceM2 * 1.1, 2),
      poidsTotalKg,
      transport: diagnostiquerTransport(poidsTotalKg),
    };
  }

  if (mode === 'mortier') {
    const cimentKg = volumeM3 * dosage;
    const sacsCiment = Math.ceil(cimentKg / sacPoids);
    const sacsCiment35 = Math.ceil(cimentKg / 35);
    const sacsCiment25 = Math.ceil(cimentKg / 25);
    const sableKg = volumeM3 * 1500;
    const sableM3 = sableKg / 1500;
    const eauL = volumeM3 * 175;
    const bigBagsSable1t = Math.ceil(sableKg / 1000);
    const sacsSable35 = Math.ceil(sableKg / 35);
    const bandeResilienteMl = 2 * (L + l);
    const poidsTotalKg = Math.round(sacsCiment * sacPoids + sableKg);

    return {
      mode,
      dosageKgM3: dosage,
      sacPoidsKg: sacPoids,
      surfaceM2: roundTo(surfaceM2, 3),
      volumeBrutM3: roundTo(volumeBrutM3, 4),
      volumeM3: roundTo(volumeM3, 4),
      volumeLitres: roundTo(volumeLitres, 1),
      margePct,
      cimentKg: roundTo(cimentKg, 1),
      sacsCiment,
      sacsCiment35,
      sacsCiment25,
      sableKg: roundTo(sableKg, 1),
      sableM3: roundTo(sableM3, 3),
      bigBagsSable1t,
      sacsSable35,
      eauL: roundTo(eauL, 1),
      bandeResilienteMl: roundTo(bandeResilienteMl, 2),
      poidsTotalKg,
      transport: diagnostiquerTransport(poidsTotalKg),
    };
  }

  // Mode bétonnière standard (NF EN 206/CN & pratique chantier)
  const spec = BETON_DOSAGE_TABLE[dosage];
  const cimentKg = volumeM3 * dosage;
  const sacsCiment = Math.ceil(cimentKg / sacPoids);
  const sacsCiment35 = Math.ceil(cimentKg / 35);
  const sacsCiment25 = Math.ceil(cimentKg / 25);
  const sableKg = volumeM3 * spec.sableKgM3;
  const gravierKg = volumeM3 * spec.gravierKgM3;
  const melangeKg = volumeM3 * spec.melangeKgM3;
  const eauL = volumeM3 * spec.eauLM3;
  const bigBagsMelange1t = Math.ceil(melangeKg / 1000);
  const bigBagsMelange15t = Math.ceil(melangeKg / 1500);
  const poidsTotalKg = Math.round(sacsCiment * sacPoids + melangeKg);

  return {
    mode,
    dosageKgM3: dosage,
    usage: spec.usage,
    sacPoidsKg: sacPoids,
    surfaceM2: roundTo(surfaceM2, 3),
    volumeBrutM3: roundTo(volumeBrutM3, 4),
    volumeM3: roundTo(volumeM3, 4),
    volumeLitres: roundTo(volumeLitres, 1),
    margePct,
    cimentKg: roundTo(cimentKg, 1),
    sacsCiment,
    sacsCiment35,
    sacsCiment25,
    sableKg: roundTo(sableKg, 1),
    sableM3: roundTo(sableKg / 1500, 3),
    gravierKg: roundTo(gravierKg, 1),
    gravierM3: roundTo(gravierKg / 1600, 3),
    melangeKg: roundTo(melangeKg, 1),
    bigBagsMelange1t,
    bigBagsMelange15t,
    eauL: roundTo(eauL, 1),
    treillisEtPolyaneM2: roundTo(surfaceM2 * 1.12, 2),
    poidsTotalKg,
    transport: diagnostiquerTransport(poidsTotalKg),
  };
}

/**
 * 2. Calcul parpaings (mur droit, pignon triangulaire, parpaing à bancher).
 */
export function calculParpaing(input) {
  const {
    forme = 'rectangle',
    longueur = 10,
    hauteur = 2,
    ouvertures = 0,
    typeBloc = 'creux20',
    perte = 5,
  } = input ?? {};

  assertFiniteNumber(longueur, 'longueur');
  assertFiniteNumber(hauteur, 'hauteur');
  assertFiniteNumber(ouvertures, 'ouvertures');
  assertFiniteNumber(perte, 'perte');

  if (forme !== 'rectangle' && forme !== 'pignon') {
    throw new RangeError(`Forme de mur invalide : "${forme}". Attendu : rectangle | pignon.`);
  }
  if (!(typeBloc in PARPAING_SPECS)) {
    throw new RangeError(`Type de bloc invalide : "${typeBloc}".`);
  }

  const L = Math.max(0.5, longueur);
  const H = Math.max(0.4, hauteur);
  const ouv = Math.max(0, ouvertures);
  const pertePct = Math.max(0, Math.min(25, perte));
  const spec = PARPAING_SPECS[typeBloc];

  const surfaceBruteM2 = forme === 'pignon' ? (L * H) / 2 : L * H;
  const surfaceNetteM2 = Math.max(0, surfaceBruteM2 - ouv);
  const blocsNets = surfaceNetteM2 * spec.blocsParM2;
  const blocsTotal = Math.ceil(blocsNets * (1 + pertePct / 100));
  const palettes = Math.ceil(blocsTotal / spec.parPalette);
  const poidsBlocsKg = blocsTotal * spec.poidsKg;

  if (spec.estBancher) {
    const betonRemplissageM3 = surfaceNetteM2 * 0.1 * 1.05;
    const sacsCiment35 = Math.ceil((betonRemplissageM3 * 350) / 35);
    const melangeBetonKg = betonRemplissageM3 * 1850;
    const aciersHA10Ml = Math.ceil(L * (H / 0.2) * 2 + (L / 0.5) * H);
    const barresHA10De6m = Math.ceil(aciersHA10Ml / 6);
    const poidsTotalKg = Math.round(poidsBlocsKg + sacsCiment35 * 35 + melangeBetonKg + aciersHA10Ml * 0.62);

    return {
      forme,
      typeBloc,
      estBancher: true,
      surfaceBruteM2: roundTo(surfaceBruteM2, 3),
      surfaceNetteM2: roundTo(surfaceNetteM2, 3),
      pertePct,
      blocsNets: roundTo(blocsNets, 2),
      blocsTotal,
      palettes,
      poidsBlocsKg,
      betonRemplissageM3: roundTo(betonRemplissageM3, 3),
      sacsCiment35,
      melangeBetonKg: roundTo(melangeBetonKg, 1),
      aciersHA10Ml,
      barresHA10De6m,
      poidsTotalKg,
      transport: diagnostiquerTransport(poidsTotalKg),
    };
  }

  const mortierSecKg = surfaceNetteM2 * 20;
  const sacsMortier25 = Math.ceil(mortierSecKg / 25);
  const cimentMontageKg = surfaceNetteM2 * 3.5;
  const sacsCiment35 = Math.ceil(cimentMontageKg / 35);
  const sableMontageKg = surfaceNetteM2 * 14;
  const poteauxRaidisseurs = Math.max(2, Math.ceil(L / 4) + 1);
  const poidsTotalKg = Math.round(poidsBlocsKg + sacsMortier25 * 25);

  return {
    forme,
    typeBloc,
    estBancher: false,
    surfaceBruteM2: roundTo(surfaceBruteM2, 3),
    surfaceNetteM2: roundTo(surfaceNetteM2, 3),
    pertePct,
    blocsNets: roundTo(blocsNets, 2),
    blocsTotal,
    palettes,
    poidsBlocsKg,
    mortierSecKg: roundTo(mortierSecKg, 1),
    sacsMortier25,
    cimentMontageKg: roundTo(cimentMontageKg, 1),
    sacsCiment35,
    sableMontageKg: roundTo(sableMontageKg, 1),
    poteauxRaidisseurs,
    poidsTotalKg,
    transport: diagnostiquerTransport(poidsTotalKg),
  };
}

/**
 * 3. Calcul carrelage (boîtes entières, carreaux, colle C2 et mortier de jointoiement).
 */
export function calculCarrelage(input) {
  const {
    longueur = 6,
    largeur = 4,
    deduction = 0,
    format = '60x60',
    pose = 'droite',
    perte = pose === 'diagonale' ? 15 : 10,
    surfaceBoite,
    usage = 'sol',
  } = input ?? {};

  assertFiniteNumber(longueur, 'longueur');
  assertFiniteNumber(largeur, 'largeur');
  assertFiniteNumber(deduction, 'deduction');
  assertFiniteNumber(perte, 'perte');

  if (!(format in CARRELAGE_FORMATS)) {
    throw new RangeError(`Format de carrelage invalide : "${format}".`);
  }
  if (pose !== 'droite' && pose !== 'diagonale') {
    throw new RangeError(`Mode de pose invalide : "${pose}". Attendu : droite | diagonale.`);
  }
  if (usage !== 'sol' && usage !== 'mur') {
    throw new RangeError(`Usage invalide : "${usage}". Attendu : sol | mur.`);
  }

  const spec = CARRELAGE_FORMATS[format];
  const boxArea = surfaceBoite === undefined ? spec.defBoite : Math.max(0.2, surfaceBoite);
  assertFiniteNumber(boxArea, 'surfaceBoite');

  const L = Math.max(0.3, longueur);
  const l = Math.max(0.3, largeur);
  const ded = Math.max(0, deduction);
  const pertePct = Math.max(0, Math.min(30, perte));

  const surfaceNetteM2 = Math.max(0, L * l - ded);
  const surfaceAvecPerteM2 = surfaceNetteM2 * (1 + pertePct / 100);
  const boites = Math.ceil(surfaceAvecPerteM2 / boxArea);
  const surfaceCommandeeM2 = boites * boxArea;
  const aireCarreauM2 = (spec.w / 100) * (spec.h / 100);
  const nbCarreaux = Math.ceil(surfaceCommandeeM2 / aireCarreauM2);

  const colleKgM2 = usage === 'sol' ? spec.colleKgM2 : Math.max(3.5, spec.colleKgM2 - 0.5);
  const colleKg = surfaceNetteM2 * colleKgM2;
  const sacsColle25 = Math.ceil(colleKg / 25);

  const jointKg = surfaceNetteM2 * spec.jointKgM2;
  const sacsJoint5 = Math.ceil(jointKg / 5);
  const croisillons = Math.ceil(nbCarreaux * 1.5);
  const primaireL = surfaceNetteM2 * 0.15;

  const poidsCarrelageKg = surfaceCommandeeM2 * (usage === 'mur' ? 16 : 20);
  const poidsTotalKg = Math.round(poidsCarrelageKg + sacsColle25 * 25 + sacsJoint5 * 5);

  return {
    format,
    pose,
    usage,
    surfaceNetteM2: roundTo(surfaceNetteM2, 3),
    pertePct,
    surfaceAvecPerteM2: roundTo(surfaceAvecPerteM2, 3),
    surfaceBoiteM2: boxArea,
    boites,
    surfaceCommandeeM2: roundTo(surfaceCommandeeM2, 3),
    nbCarreaux,
    colleKgM2,
    colleKg: roundTo(colleKg, 1),
    sacsColle25,
    jointKgM2: spec.jointKgM2,
    jointKg: roundTo(jointKg, 2),
    sacsJoint5,
    croisillons,
    primaireL: roundTo(primaireL, 2),
    poidsTotalKg,
    transport: diagnostiquerTransport(poidsTotalKg),
  };
}

/**
 * 4. Calcul gravier, sable, tout-venant et conversion Big Bag (1 t / 1,5 t) / sacs 25 kg.
 */
export function calculGravier(input) {
  const {
    longueur = 10,
    largeur = 3,
    epaisseur = 5,
    materiau = 'gravier_concasse',
    avecDalleStab = false,
    tassement = 5,
  } = input ?? {};

  assertFiniteNumber(longueur, 'longueur');
  assertFiniteNumber(largeur, 'largeur');
  assertFiniteNumber(epaisseur, 'epaisseur');
  assertFiniteNumber(tassement, 'tassement');

  if (!(materiau in GRAVIER_SPECS)) {
    throw new RangeError(`Matériau granulat invalide : "${materiau}".`);
  }

  const L = Math.max(0.5, longueur);
  const l = Math.max(0.5, largeur);
  const eCm = Math.max(1, epaisseur);
  const tassPct = Math.max(0, Math.min(25, tassement));
  const spec = GRAVIER_SPECS[materiau];

  const surfaceM2 = L * l;
  const volumeBrutM3 = surfaceM2 * (eCm / 100);
  const volumeM3 = volumeBrutM3 * (1 + tassPct / 100);
  const tonnes = volumeM3 * spec.densiteTM3;
  const poidsGranulatsKg = tonnes * 1000;

  const bigBags1t = Math.ceil(tonnes);
  const bigBags15t = Math.ceil(tonnes / 1.5);
  const sacs25kg = Math.ceil(poidsGranulatsKg / 25);
  const geotextileM2 = Math.ceil(surfaceM2 * 1.1);
  const dallesStabNb = avecDalleStab ? Math.ceil((surfaceM2 * 1.05) / 0.96) : 0;
  const borduresMl = 2 * (L + l);
  const poidsTotalKg = Math.round(poidsGranulatsKg + (avecDalleStab ? dallesStabNb * 1.8 : 0) + geotextileM2 * 0.15);

  return {
    materiau,
    densiteTM3: spec.densiteTM3,
    densiteKgM3: spec.densiteKgM3,
    surfaceM2: roundTo(surfaceM2, 3),
    volumeBrutM3: roundTo(volumeBrutM3, 4),
    tassementPct: tassPct,
    volumeM3: roundTo(volumeM3, 4),
    tonnes: roundTo(tonnes, 3),
    poidsGranulatsKg: Math.round(poidsGranulatsKg),
    bigBags1t,
    bigBags15t,
    sacs25kg,
    geotextileM2,
    avecDalleStab: Boolean(avecDalleStab),
    dallesStabNb,
    borduresMl: roundTo(borduresMl, 2),
    poidsTotalKg,
    transport: diagnostiquerTransport(poidsTotalKg),
  };
}

/**
 * Optimise la combinaison de pots (10 L / 5 L / 2,5 L / 1 L) pour un besoin donné en litres.
 * @param {number} litresReq
 */
export function optimiserPotsPeinture(litresReq) {
  assertFiniteNumber(litresReq, 'litresReq');
  if (litresReq <= 0) {
    return { p10: 0, p5: 0, p25: 0, p1: 0, totalL: 0, label: '0 pot' };
  }

  const base10 = Math.max(0, Math.floor(litresReq / 10) - 1);
  const remTarget = litresReq - base10 * 10;

  let best = null;
  for (let a = 0; a <= 3; a++) {
    for (let b = 0; b <= 3; b++) {
      for (let c = 0; c <= 4; c++) {
        for (let d = 0; d <= 2; d++) {
          const tot = a * 10 + b * 5 + c * 2.5 + d * 1;
          if (tot + 1e-6 < remTarget) continue;
          const waste = tot - remTarget;
          const count = a + b + c + d;
          const score = waste * 1.4 + count * 0.45 + d * 0.35;
          if (!best || score < best.score) {
            best = {
              p10: base10 + a,
              p5: b,
              p25: c,
              p1: d,
              totalL: base10 * 10 + tot,
              score,
            };
          }
        }
      }
    }
  }

  const chosen = best ?? {
    p10: Math.ceil(litresReq / 10),
    p5: 0,
    p25: 0,
    p1: 0,
    totalL: Math.ceil(litresReq / 10) * 10,
  };

  const parts = [];
  if (chosen.p10 > 0) parts.push(`${chosen.p10} × 10 L`);
  if (chosen.p5 > 0) parts.push(`${chosen.p5} × 5 L`);
  if (chosen.p25 > 0) parts.push(`${chosen.p25} × 2,5 L`);
  if (chosen.p1 > 0) parts.push(`${chosen.p1} × 1 L`);

  return {
    p10: chosen.p10,
    p5: chosen.p5,
    p25: chosen.p25,
    p1: chosen.p1,
    totalL: roundTo(chosen.totalL, 2),
    label: parts.join(' + '),
  };
}

/**
 * 5. Calcul peinture (murs, plafond ou murs + plafond, déduction portes/fenêtres, pots optimaux).
 */
export function calculPeinture(input) {
  const {
    longueur = 5,
    largeur = 4,
    hauteur = 2.5,
    zone = 'murs',
    nbPortes = 1,
    nbFenetres = 1,
    deductionExtra = 0,
    couches = 2,
    rendement = 10,
    avecSousCouche = false,
  } = input ?? {};

  assertFiniteNumber(longueur, 'longueur');
  assertFiniteNumber(largeur, 'largeur');
  assertFiniteNumber(hauteur, 'hauteur');
  assertFiniteNumber(nbPortes, 'nbPortes');
  assertFiniteNumber(nbFenetres, 'nbFenetres');
  assertFiniteNumber(deductionExtra, 'deductionExtra');
  assertFiniteNumber(rendement, 'rendement');

  if (!['murs', 'plafond', 'murs_plafond'].includes(zone)) {
    throw new RangeError(`Zone invalide : "${zone}". Attendu : murs | plafond | murs_plafond.`);
  }
  if (couches !== 1 && couches !== 2 && couches !== 3) {
    throw new RangeError(`Nombre de couches invalide : ${couches}. Valeurs supportées : 1, 2 ou 3.`);
  }

  const L = Math.max(0.5, longueur);
  const l = Math.max(0.5, largeur);
  const H = Math.max(1.5, hauteur);
  const portes = Math.max(0, Math.round(nbPortes));
  const fenetres = Math.max(0, Math.round(nbFenetres));
  const extra = Math.max(0, deductionExtra);
  const rend = Math.max(4, Math.min(18, rendement));

  const perimetreM = 2 * (L + l);
  const surfaceMursBruteM2 = perimetreM * H;
  const ouverturesM2 = portes * 1.7 + fenetres * 1.5 + extra;
  const surfaceMursM2 = Math.max(0, surfaceMursBruteM2 - ouverturesM2);
  const surfacePlafondM2 = L * l;

  const surfaceBaseM2 =
    zone === 'murs'
      ? surfaceMursM2
      : zone === 'plafond'
        ? surfacePlafondM2
        : surfaceMursM2 + surfacePlafondM2;

  const surfaceCumuleeM2 = surfaceBaseM2 * couches;
  const litresNets = surfaceCumuleeM2 / rend;
  const litresRequis = litresNets * 1.05;
  const pots = optimiserPotsPeinture(litresRequis);

  const sousCoucheLitres = avecSousCouche ? (surfaceBaseM2 / 10) * 1.05 : 0;
  const sousCouchePots = avecSousCouche ? optimiserPotsPeinture(sousCoucheLitres) : null;

  const rubanMasquageMl = Math.ceil(perimetreM + (portes + fenetres) * 5);
  const bacheSolM2 = Math.ceil(surfacePlafondM2 * 1.15);
  const poidsTotalKg = Math.max(
    2,
    Math.round((pots.totalL + (sousCouchePots ? sousCouchePots.totalL : 0)) * 1.38 + 2)
  );

  return {
    zone,
    couches,
    rendementM2ParL: rend,
    perimetreM: roundTo(perimetreM, 2),
    ouverturesM2: roundTo(ouverturesM2, 2),
    surfaceMursM2: roundTo(surfaceMursM2, 2),
    surfacePlafondM2: roundTo(surfacePlafondM2, 2),
    surfaceBaseM2: roundTo(surfaceBaseM2, 2),
    surfaceCumuleeM2: roundTo(surfaceCumuleeM2, 2),
    litresNets: roundTo(litresNets, 3),
    litresRequis: roundTo(litresRequis, 3),
    pots,
    avecSousCouche: Boolean(avecSousCouche),
    sousCoucheLitres: roundTo(sousCoucheLitres, 3),
    sousCouchePots,
    rubanMasquageMl,
    bacheSolM2,
    poidsTotalKg,
    transport: diagnostiquerTransport(poidsTotalKg),
  };
}

/**
 * Conversion directe entre pente en pourcentage (%) et angle en degrés (°)
 * (utile pour toitures, terrasses 1,5–2 % et évacuations EU/EP 1–3 %).
 */
export function convertirPente({ pourcentage, degres }) {
  if (pourcentage !== undefined) {
    assertFiniteNumber(pourcentage, 'pourcentage');
    if (pourcentage < 0) throw new RangeError('La pente en pourcentage doit être >= 0.');
    const ratio = pourcentage / 100;
    const rad = Math.atan(ratio);
    const deg = rad * (180 / Math.PI);
    return {
      pourcentage: roundTo(pourcentage, 3),
      degres: roundTo(deg, 3),
      cmParMetre: roundTo(pourcentage, 3),
      coefficientRampant: roundTo(Math.sqrt(1 + ratio * ratio), 4),
    };
  }
  if (degres !== undefined) {
    assertFiniteNumber(degres, 'degres');
    if (degres < 0 || degres >= 90) {
      throw new RangeError("L'angle en degrés doit être compris dans [0, 90[.");
    }
    const rad = degres * (Math.PI / 180);
    const ratio = Math.tan(rad);
    const pct = ratio * 100;
    return {
      pourcentage: roundTo(pct, 3),
      degres: roundTo(degres, 3),
      cmParMetre: roundTo(pct, 3),
      coefficientRampant: roundTo(Math.sqrt(1 + ratio * ratio), 4),
    };
  }
  throw new TypeError('Fournir soit "pourcentage", soit "degres".');
}

/**
 * 6. Calcul pente de toit (%, degrés, rampant Pythagore, surface développée et contrôle NF DTU).
 */
export function calculPente(input) {
  const {
    modeInput = 'hauteur',
    portee = 4,
    hauteur = 0.6,
    pentePctInput = 15,
    longueurToit = 6,
    nbPans = 1,
    materiau = 'bac_acier',
  } = input ?? {};

  assertFiniteNumber(portee, 'portee');
  assertFiniteNumber(longueurToit, 'longueurToit');

  if (modeInput !== 'hauteur' && modeInput !== 'pourcentage') {
    throw new RangeError(`modeInput invalide : "${modeInput}". Attendu : hauteur | pourcentage.`);
  }
  if (!(materiau in TOITURE_DTU)) {
    throw new RangeError(`Matériau de couverture invalide : "${materiau}".`);
  }

  const p = Math.max(0.5, portee);
  const L = Math.max(0.5, longueurToit);
  const pans = nbPans === 2 ? 2 : 1;

  let h;
  let pentePct;
  if (modeInput === 'pourcentage') {
    assertFiniteNumber(pentePctInput, 'pentePctInput');
    pentePct = Math.max(1, Math.min(200, pentePctInput));
    h = p * (pentePct / 100);
  } else {
    assertFiniteNumber(hauteur, 'hauteur');
    h = Math.max(0.05, hauteur);
    pentePct = (h / p) * 100;
  }

  const angleRad = Math.atan(h / p);
  const angleDeg = angleRad * (180 / Math.PI);
  const rampantM = Math.sqrt(p * p + h * h);
  const coefficientRampant = rampantM / p;
  const surfaceUnPanM2 = rampantM * L;
  const surfaceTotaleM2 = surfaceUnPanM2 * pans;
  const surfaceCommandeM2 = surfaceTotaleM2 * 1.1;

  const spec = TOITURE_DTU[materiau];
  let statutDtu;
  if (pentePct < spec.minAbsoluPct) {
    statutDtu = 'error';
  } else if (pentePct < spec.minCourantPct) {
    statutDtu = 'warn';
  } else {
    statutDtu = 'ok';
  }

  const rivesMl = rampantM * 2 * pans;
  const faitageMl = pans === 2 ? L : 0;
  const gouttiereMl = L * pans;
  const crochetsGouttiere = Math.ceil(gouttiereMl / 0.5) + pans;
  const fixations = Math.ceil(surfaceTotaleM2 * 6);
  const poidsTotalKg = Math.max(
    12,
    Math.round(surfaceCommandeM2 * spec.poidsKgM2 + (rampantM * 2 * pans + L) * 1.5)
  );

  return {
    modeInput,
    materiau,
    nbPans: pans,
    porteeM: roundTo(p, 3),
    hauteurM: roundTo(h, 3),
    longueurToitM: roundTo(L, 3),
    pentePct: roundTo(pentePct, 2),
    angleDeg: roundTo(angleDeg, 2),
    rampantM: roundTo(rampantM, 3),
    coefficientRampant: roundTo(coefficientRampant, 4),
    surfaceUnPanM2: roundTo(surfaceUnPanM2, 2),
    surfaceTotaleM2: roundTo(surfaceTotaleM2, 2),
    surfaceCommandeM2: roundTo(surfaceCommandeM2, 2),
    rivesMl: roundTo(rivesMl, 2),
    faitageMl: roundTo(faitageMl, 2),
    gouttiereMl: roundTo(gouttiereMl, 2),
    crochetsGouttiere,
    fixations,
    dtu: {
      statut: statutDtu,
      norme: spec.dtu,
      minAbsoluPct: spec.minAbsoluPct,
      minCourantPct: spec.minCourantPct,
      note: spec.note,
    },
    poidsTotalKg,
    transport: diagnostiquerTransport(poidsTotalKg),
  };
}
