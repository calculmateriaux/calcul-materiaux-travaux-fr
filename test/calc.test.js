import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  BETON_DOSAGE_TABLE,
  BETON_PREDOSE_SPECS,
  PARPAING_SPECS,
  CARRELAGE_FORMATS,
  GRAVIER_SPECS,
  TOITURE_DTU,
  diagnostiquerTransport,
  calculBeton,
  calculParpaing,
  calculCarrelage,
  calculGravier,
  optimiserPotsPeinture,
  calculPeinture,
  convertirPente,
  calculPente,
} from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'data');

test('diagnostiquerTransport classe correctement les 3 paliers de charge', () => {
  assert.equal(diagnostiquerTransport(120).tier, 'car');
  assert.equal(diagnostiquerTransport(380).tier, 'car');
  assert.equal(diagnostiquerTransport(381).tier, 'van');
  assert.equal(diagnostiquerTransport(1100).tier, 'van');
  assert.equal(diagnostiquerTransport(1101).tier, 'truck');
  assert.equal(diagnostiquerTransport(0).poidsKg, 1);
});

test('calculBeton — 1 m³ exact à 350 kg/m³ (norme NF EN 206/CN)', () => {
  const res = calculBeton({
    longueur: 10,
    largeur: 1,
    epaisseur: 10,
    mode: 'betonniere',
    dosage: 350,
    sacPoids: 35,
    marge: 0,
  });

  assert.equal(res.volumeM3, 1);
  assert.equal(res.cimentKg, 350);
  assert.equal(res.sacsCiment, 10);
  assert.equal(res.sacsCiment35, 10);
  assert.equal(res.sacsCiment25, 14);
  assert.equal(res.sableKg, 800);
  assert.equal(res.gravierKg, 1080);
  assert.equal(res.melangeKg, 1850);
  assert.equal(res.eauL, 175);
});

test('calculBeton — dalle terrasse par défaut 5x4 m x 12 cm (+5 % marge)', () => {
  const res = calculBeton();
  assert.equal(res.surfaceM2, 20);
  assert.equal(res.volumeBrutM3, 2.4);
  assert.equal(res.volumeM3, 2.52);
  assert.equal(res.sacsCiment, 26); // ceil(2.52 * 350 / 35) = ceil(25.2) = 26
  assert.equal(res.bigBagsMelange15t, 4); // ceil(4662 / 1500) = 4
  assert.equal(res.treillisEtPolyaneM2, 22.4);
  assert.equal(res.transport.tier, 'truck');
});

test('calculBeton — mode pré-dosé 35 kg et 25 kg (1 m³ et poteaux clôture)', () => {
  const m3_35 = calculBeton({
    longueur: 10,
    largeur: 1,
    epaisseur: 10,
    mode: 'predose',
    sacPoids: 35,
    marge: 0,
  });
  assert.equal(m3_35.nbSacs, 59); // ceil(1000 / 17)
  assert.equal(m3_35.poidsTotalKg, 2065);

  const m3_25 = calculBeton({
    longueur: 10,
    largeur: 1,
    epaisseur: 10,
    mode: 'predose',
    sacPoids: 25,
    marge: 0,
  });
  assert.equal(m3_25.nbSacs, 80); // ceil(1000 / 12.5)

  const poteaux = calculBeton({
    longueur: 0.3,
    largeur: 0.3,
    epaisseur: 50,
    quantite: 10,
    mode: 'predose',
    sacPoids: 35,
    marge: 5,
  });
  assert.equal(poteaux.volumeBrutM3, 0.45);
  assert.equal(poteaux.nbSacs, 28); // ceil(472.5 / 17)
});

test('calculBeton — mode chape mortier sans gravier (DTU 26.2)', () => {
  const chape = calculBeton({
    longueur: 5,
    largeur: 4,
    epaisseur: 5,
    mode: 'mortier',
    dosage: 350,
    sacPoids: 35,
    marge: 5,
  });
  assert.equal(chape.volumeM3, 1.05);
  assert.equal(chape.sacsCiment, 11); // ceil(367.5 / 35)
  assert.equal(chape.sableKg, 1575);
  assert.equal(chape.bandeResilienteMl, 18);
});

test('calculBeton — validation des paramètres invalides et bornes', () => {
  assert.throws(() => calculBeton({ dosage: 325 }), RangeError);
  assert.throws(() => calculBeton({ sacPoids: 40 }), RangeError);
  assert.throws(() => calculBeton({ mode: 'inconnu' }), RangeError);
  assert.throws(() => calculBeton({ longueur: Number.NaN }), TypeError);

  const clamped = calculBeton({ longueur: 0.01, largeur: 0.01, epaisseur: 0.2, marge: 99 });
  assert.equal(clamped.margePct, 30);
  assert.ok(clamped.volumeBrutM3 > 0);
});

test('calculParpaing — mur de clôture, pignon triangulaire, garage et bloc à bancher', () => {
  const cloture = calculParpaing({
    forme: 'rectangle',
    longueur: 15,
    hauteur: 1.8,
    ouvertures: 0,
    typeBloc: 'creux20',
    perte: 5,
  });
  assert.equal(cloture.surfaceNetteM2, 27);
  assert.equal(cloture.blocsTotal, 284);
  assert.equal(cloture.palettes, 6);
  assert.equal(cloture.sacsMortier25, 22);
  assert.equal(cloture.poteauxRaidisseurs, 5);

  const pignon = calculParpaing({
    forme: 'pignon',
    longueur: 8,
    hauteur: 2.8,
    typeBloc: 'creux20',
    perte: 10,
  });
  assert.equal(pignon.surfaceBruteM2, 11.2);
  assert.equal(pignon.blocsTotal, 124); // ceil(112 * 1.1)

  const garage = calculParpaing({
    forme: 'rectangle',
    longueur: 19,
    hauteur: 2.4,
    ouvertures: 6.6,
    typeBloc: 'creux20',
    perte: 5,
  });
  assert.equal(garage.surfaceNetteM2, 39);
  assert.equal(garage.blocsTotal, 410);
  assert.equal(garage.palettes, 9);

  const piscine = calculParpaing({
    forme: 'rectangle',
    longueur: 24,
    hauteur: 1.5,
    typeBloc: 'bancher20',
    perte: 5,
  });
  assert.equal(piscine.estBancher, true);
  assert.equal(piscine.blocsTotal, 378);
  assert.equal(piscine.betonRemplissageM3, 3.78);
  assert.equal(piscine.sacsCiment35, 38);
});

test('calculCarrelage — salon 60x60 droite (+10 %) et pose diagonale 45x45 (+15 %)', () => {
  const salon = calculCarrelage({
    longueur: 7,
    largeur: 5,
    format: '60x60',
    pose: 'droite',
    perte: 10,
    surfaceBoite: 1.44,
    usage: 'sol',
  });
  assert.equal(salon.surfaceNetteM2, 35);
  assert.equal(salon.surfaceAvecPerteM2, 38.5);
  assert.equal(salon.boites, 27);
  assert.equal(salon.surfaceCommandeeM2, 38.88);
  assert.equal(salon.nbCarreaux, 108);
  assert.equal(salon.sacsColle25, 8);
  assert.equal(salon.sacsJoint5, 3);

  const diag = calculCarrelage({
    longueur: 6,
    largeur: 5,
    format: '45x45',
    pose: 'diagonale',
    usage: 'sol',
  });
  assert.equal(diag.pertePct, 15);
  assert.equal(diag.boites, 25); // ceil(34.5 / 1.42) = 25

  const mur = calculCarrelage({
    longueur: 4.5,
    largeur: 0.6,
    format: '10x20',
    usage: 'mur',
  });
  assert.equal(mur.boites, 3);
  assert.equal(mur.colleKgM2, 3.5);
});

test('calculGravier — cour 80 m², terrasse 24 m² et dalles stabilisatrices', () => {
  const cour = calculGravier({
    longueur: 10,
    largeur: 8,
    epaisseur: 5,
    materiau: 'gravier_concasse',
    tassement: 5,
  });
  assert.equal(cour.volumeM3, 4.2);
  assert.equal(cour.tonnes, 6.72);
  assert.equal(cour.bigBags1t, 7);
  assert.equal(cour.bigBags15t, 5);
  assert.equal(cour.geotextileM2, 88);

  const stab = calculGravier({
    longueur: 12,
    largeur: 3.5,
    epaisseur: 5,
    materiau: 'gravier_concasse',
    avecDalleStab: true,
    tassement: 5,
  });
  assert.equal(stab.surfaceM2, 42);
  assert.equal(stab.dallesStabNb, 46); // ceil((42 * 1.05) / 0.96)
  assert.equal(stab.tonnes, 3.528);
});

test('calculPeinture & optimiserPotsPeinture — chambre 12 m², pièce complète et couloir', () => {
  const chambre = calculPeinture({
    longueur: 4,
    largeur: 3,
    hauteur: 2.5,
    zone: 'murs',
    nbPortes: 1,
    nbFenetres: 1,
    couches: 2,
    rendement: 10,
  });
  assert.equal(chambre.surfaceMursM2, 31.8);
  assert.equal(chambre.litresRequis, 6.678);
  assert.equal(chambre.pots.totalL, 7.5);
  assert.equal(chambre.pots.p5, 1);
  assert.equal(chambre.pots.p25, 1);

  const piece = calculPeinture({
    longueur: 4.5,
    largeur: 3.5,
    hauteur: 2.5,
    zone: 'murs_plafond',
    nbPortes: 1,
    nbFenetres: 1,
    couches: 2,
    rendement: 10,
    avecSousCouche: true,
  });
  assert.equal(piece.surfaceBaseM2, 52.55);
  assert.ok(piece.sousCouchePots !== null);
  assert.ok(piece.sousCouchePots.totalL >= piece.sousCoucheLitres);

  assert.equal(optimiserPotsPeinture(0).totalL, 0);
  const combo = optimiserPotsPeinture(12.5);
  assert.ok(combo.totalL >= 12.5);
});

test('calculPente & convertirPente — Pythagore, 2 pans et seuils NF DTU', () => {
  const c100 = convertirPente({ pourcentage: 100 });
  assert.equal(c100.degres, 45);
  assert.equal(c100.coefficientRampant, 1.4142);

  const cDeg = convertirPente({ degres: 45 });
  assert.equal(cDeg.pourcentage, 100);

  const bacOk = calculPente({
    modeInput: 'hauteur',
    portee: 4,
    hauteur: 0.6,
    longueurToit: 6,
    nbPans: 1,
    materiau: 'bac_acier',
  });
  assert.equal(bacOk.pentePct, 15);
  assert.equal(bacOk.dtu.statut, 'ok');
  assert.equal(bacOk.dtu.norme, 'NF DTU 40.35');

  const bacWarn = calculPente({
    modeInput: 'pourcentage',
    portee: 4,
    pentePctInput: 10,
    longueurToit: 6,
    nbPans: 1,
    materiau: 'bac_acier',
  });
  assert.equal(bacWarn.hauteurM, 0.4);
  assert.equal(bacWarn.dtu.statut, 'warn');

  const bacErr = calculPente({
    modeInput: 'pourcentage',
    portee: 4,
    pentePctInput: 3,
    longueurToit: 6,
    nbPans: 1,
    materiau: 'bac_acier',
  });
  assert.equal(bacErr.dtu.statut, 'error');

  const deuxPans = calculPente({
    modeInput: 'hauteur',
    portee: 4.5,
    hauteur: 1.8,
    longueurToit: 10,
    nbPans: 2,
    materiau: 'tuile_mecanique',
  });
  assert.equal(deuxPans.pentePct, 40);
  assert.equal(deuxPans.rampantM, 4.847);
  assert.equal(deuxPans.surfaceTotaleM2, 96.93);
  assert.equal(deuxPans.faitageMl, 10);
  assert.equal(deuxPans.dtu.statut, 'ok');
});

test('Cohérence des fichiers de données JSON et CSV avec les constantes du moteur', () => {
  const jsonPath = join(DATA_DIR, 'materiaux-dosages-fr-2026.json');
  const dataset = JSON.parse(readFileSync(jsonPath, 'utf8'));

  assert.equal(dataset.updated_at, '2026-11-24');
  assert.deepEqual(dataset.jurisdiction, ['FR', 'BE', 'CH', 'CA']);
  assert.equal(dataset.reference_calculator, 'https://calculmateriaux.com');
  assert.ok(Array.isArray(dataset.sources) && dataset.sources.length >= 6);

  // Vérification stricte béton JSON <-> moteur
  for (const row of dataset.beton.dosages_par_m3) {
    const spec = BETON_DOSAGE_TABLE[row.dosage_kg_m3];
    assert.ok(spec, `Dosage manquant : ${row.dosage_kg_m3}`);
    assert.equal(row.sable_0_4_kg, spec.sableKgM3);
    assert.equal(row.gravier_4_20_kg, spec.gravierKgM3);
    assert.equal(row.melange_beton_kg, spec.melangeKgM3);
    assert.equal(row.eau_l, spec.eauLM3);
  }

  for (const row of dataset.beton.predose_en_sacs) {
    const spec = BETON_PREDOSE_SPECS[row.sac_poids_kg];
    assert.equal(row.rendement_l_par_sac, spec.rendementSacL);
    assert.equal(row.sacs_par_m3, spec.sacsParM3);
  }

  // Vérification granulats JSON <-> moteur
  for (const row of dataset.granulats.materiaux) {
    const spec = GRAVIER_SPECS[row.id];
    assert.equal(row.densite_kg_m3, spec.densiteKgM3);
    assert.equal(row.densite_t_m3, spec.densiteTM3);
  }

  // Vérification parpaings, carrelage, toiture JSON <-> moteur
  assert.equal(dataset.parpaings.types.length, Object.keys(PARPAING_SPECS).length);
  assert.equal(dataset.carrelage.formats.length, Object.keys(CARRELAGE_FORMATS).length);
  assert.equal(dataset.pente_toiture_dtu.length, Object.keys(TOITURE_DTU).length);

  // Vérification structurelle des 3 CSV
  const csvFiles = [
    { name: 'dosage-beton-fr.csv', minRows: 4 },
    { name: 'densites-granulats-fr.csv', minRows: 4 },
    { name: 'rendements-second-oeuvre.csv', minRows: 12 },
  ];

  for (const { name, minRows } of csvFiles) {
    const lines = readFileSync(join(DATA_DIR, name), 'utf8').trim().split('\n');
    assert.ok(lines.length - 1 >= minRows, `${name} doit contenir au moins ${minRows} lignes de données`);
    const headerCols = lines[0].split(',').length;
    assert.ok(headerCols >= 6, `${name} doit comporter un en-tête complet`);
  }
});
