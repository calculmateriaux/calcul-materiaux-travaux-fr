export type TransportTier = 'car' | 'van' | 'truck';

export interface TransportDiagnostic {
  tier: TransportTier;
  poidsKg: number;
  label: string;
}

export type BetonDosage = 250 | 300 | 350 | 400;
export type BetonMode = 'betonniere' | 'predose' | 'mortier';
export type BetonSacPoids = 25 | 35;

export interface BetonDosageSpec {
  readonly dosageKgM3: BetonDosage;
  readonly sableKgM3: number;
  readonly gravierKgM3: number;
  readonly melangeKgM3: number;
  readonly eauLM3: number;
  readonly sacs35KgParM3: number;
  readonly sacs25KgParM3: number;
  readonly usage: string;
}

export interface BetonPredoseSpec {
  readonly sacPoidsKg: BetonSacPoids;
  readonly rendementSacL: number;
  readonly eauParSacL: number;
  readonly sacsParM3: number;
}

export interface BetonInput {
  longueur?: number;
  largeur?: number;
  epaisseur?: number;
  quantite?: number;
  mode?: BetonMode;
  dosage?: BetonDosage;
  sacPoids?: BetonSacPoids;
  marge?: number;
}

export interface BetonBetonniereResult {
  mode: 'betonniere';
  dosageKgM3: BetonDosage;
  usage: string;
  sacPoidsKg: BetonSacPoids;
  surfaceM2: number;
  volumeBrutM3: number;
  volumeM3: number;
  volumeLitres: number;
  margePct: number;
  cimentKg: number;
  sacsCiment: number;
  sacsCiment35: number;
  sacsCiment25: number;
  sableKg: number;
  sableM3: number;
  gravierKg: number;
  gravierM3: number;
  melangeKg: number;
  bigBagsMelange1t: number;
  bigBagsMelange15t: number;
  eauL: number;
  treillisEtPolyaneM2: number;
  poidsTotalKg: number;
  transport: TransportDiagnostic;
}

export interface BetonPredoseResult {
  mode: 'predose';
  sacPoidsKg: BetonSacPoids;
  surfaceM2: number;
  volumeBrutM3: number;
  volumeM3: number;
  volumeLitres: number;
  margePct: number;
  rendementSacL: number;
  sacsParM3: number;
  nbSacs: number;
  eauL: number;
  polyaneEtTreillisM2: number;
  poidsTotalKg: number;
  transport: TransportDiagnostic;
}

export interface BetonMortierResult {
  mode: 'mortier';
  dosageKgM3: BetonDosage;
  sacPoidsKg: BetonSacPoids;
  surfaceM2: number;
  volumeBrutM3: number;
  volumeM3: number;
  volumeLitres: number;
  margePct: number;
  cimentKg: number;
  sacsCiment: number;
  sacsCiment35: number;
  sacsCiment25: number;
  sableKg: number;
  sableM3: number;
  bigBagsSable1t: number;
  sacsSable35: number;
  eauL: number;
  bandeResilienteMl: number;
  poidsTotalKg: number;
  transport: TransportDiagnostic;
}

export type BetonResult = BetonBetonniereResult | BetonPredoseResult | BetonMortierResult;

export type ParpaingType = 'creux20' | 'creux15' | 'creux10' | 'bancher20';
export type ParpaingForme = 'rectangle' | 'pignon';

export interface ParpaingInput {
  forme?: ParpaingForme;
  longueur?: number;
  hauteur?: number;
  ouvertures?: number;
  typeBloc?: ParpaingType;
  perte?: number;
}

export interface ParpaingCreuxResult {
  forme: ParpaingForme;
  typeBloc: Exclude<ParpaingType, 'bancher20'>;
  estBancher: false;
  surfaceBruteM2: number;
  surfaceNetteM2: number;
  pertePct: number;
  blocsNets: number;
  blocsTotal: number;
  palettes: number;
  poidsBlocsKg: number;
  mortierSecKg: number;
  sacsMortier25: number;
  cimentMontageKg: number;
  sacsCiment35: number;
  sableMontageKg: number;
  poteauxRaidisseurs: number;
  poidsTotalKg: number;
  transport: TransportDiagnostic;
}

export interface ParpaingBancherResult {
  forme: ParpaingForme;
  typeBloc: 'bancher20';
  estBancher: true;
  surfaceBruteM2: number;
  surfaceNetteM2: number;
  pertePct: number;
  blocsNets: number;
  blocsTotal: number;
  palettes: number;
  poidsBlocsKg: number;
  betonRemplissageM3: number;
  sacsCiment35: number;
  melangeBetonKg: number;
  aciersHA10Ml: number;
  barresHA10De6m: number;
  poidsTotalKg: number;
  transport: TransportDiagnostic;
}

export type ParpaingResult = ParpaingCreuxResult | ParpaingBancherResult;

export type CarrelageFormat = '30x30' | '45x45' | '60x60' | '30x60' | '20x60' | '10x20';
export type CarrelagePose = 'droite' | 'diagonale';
export type CarrelageUsage = 'sol' | 'mur';

export interface CarrelageInput {
  longueur?: number;
  largeur?: number;
  deduction?: number;
  format?: CarrelageFormat;
  pose?: CarrelagePose;
  perte?: number;
  surfaceBoite?: number;
  usage?: CarrelageUsage;
}

export interface CarrelageResult {
  format: CarrelageFormat;
  pose: CarrelagePose;
  usage: CarrelageUsage;
  surfaceNetteM2: number;
  pertePct: number;
  surfaceAvecPerteM2: number;
  surfaceBoiteM2: number;
  boites: number;
  surfaceCommandeeM2: number;
  nbCarreaux: number;
  colleKgM2: number;
  colleKg: number;
  sacsColle25: number;
  jointKgM2: number;
  jointKg: number;
  sacsJoint5: number;
  croisillons: number;
  primaireL: number;
  poidsTotalKg: number;
  transport: TransportDiagnostic;
}

export type GravierMateriau = 'gravier_roule' | 'gravier_concasse' | 'sable' | 'tout_venant';

export interface GravierInput {
  longueur?: number;
  largeur?: number;
  epaisseur?: number;
  materiau?: GravierMateriau;
  avecDalleStab?: boolean;
  tassement?: number;
}

export interface GravierResult {
  materiau: GravierMateriau;
  densiteTM3: number;
  densiteKgM3: number;
  surfaceM2: number;
  volumeBrutM3: number;
  tassementPct: number;
  volumeM3: number;
  tonnes: number;
  poidsGranulatsKg: number;
  bigBags1t: number;
  bigBags15t: number;
  sacs25kg: number;
  geotextileM2: number;
  avecDalleStab: boolean;
  dallesStabNb: number;
  borduresMl: number;
  poidsTotalKg: number;
  transport: TransportDiagnostic;
}

export type PeintureZone = 'murs' | 'plafond' | 'murs_plafond';

export interface PeinturePotCombo {
  p10: number;
  p5: number;
  p25: number;
  p1: number;
  totalL: number;
  label: string;
}

export interface PeintureInput {
  longueur?: number;
  largeur?: number;
  hauteur?: number;
  zone?: PeintureZone;
  nbPortes?: number;
  nbFenetres?: number;
  deductionExtra?: number;
  couches?: 1 | 2 | 3;
  rendement?: number;
  avecSousCouche?: boolean;
}

export interface PeintureResult {
  zone: PeintureZone;
  couches: 1 | 2 | 3;
  rendementM2ParL: number;
  perimetreM: number;
  ouverturesM2: number;
  surfaceMursM2: number;
  surfacePlafondM2: number;
  surfaceBaseM2: number;
  surfaceCumuleeM2: number;
  litresNets: number;
  litresRequis: number;
  pots: PeinturePotCombo;
  avecSousCouche: boolean;
  sousCoucheLitres: number;
  sousCouchePots: PeinturePotCombo | null;
  rubanMasquageMl: number;
  bacheSolM2: number;
  poidsTotalKg: number;
  transport: TransportDiagnostic;
}

export type ToitureMateriau =
  | 'bac_acier'
  | 'tuile_mecanique'
  | 'tuile_canal'
  | 'ardoise'
  | 'polycarbonate'
  | 'shingle';

export interface PenteConversionInput {
  pourcentage?: number;
  degres?: number;
}

export interface PenteConversionResult {
  pourcentage: number;
  degres: number;
  cmParMetre: number;
  coefficientRampant: number;
}

export interface PenteInput {
  modeInput?: 'hauteur' | 'pourcentage';
  portee?: number;
  hauteur?: number;
  pentePctInput?: number;
  longueurToit?: number;
  nbPans?: 1 | 2;
  materiau?: ToitureMateriau;
}

export interface PenteResult {
  modeInput: 'hauteur' | 'pourcentage';
  materiau: ToitureMateriau;
  nbPans: 1 | 2;
  porteeM: number;
  hauteurM: number;
  longueurToitM: number;
  pentePct: number;
  angleDeg: number;
  rampantM: number;
  coefficientRampant: number;
  surfaceUnPanM2: number;
  surfaceTotaleM2: number;
  surfaceCommandeM2: number;
  rivesMl: number;
  faitageMl: number;
  gouttiereMl: number;
  crochetsGouttiere: number;
  fixations: number;
  dtu: {
    statut: 'ok' | 'warn' | 'error';
    norme: string;
    minAbsoluPct: number;
    minCourantPct: number;
    note: string;
  };
  poidsTotalKg: number;
  transport: TransportDiagnostic;
}

export declare const BETON_DOSAGE_TABLE: Readonly<Record<BetonDosage, BetonDosageSpec>>;
export declare const BETON_PREDOSE_SPECS: Readonly<Record<BetonSacPoids, BetonPredoseSpec>>;
export declare const PARPAING_SPECS: Readonly<Record<ParpaingType, {
  readonly id: ParpaingType;
  readonly nom: string;
  readonly epCm: number;
  readonly hauteurCm: number;
  readonly longueurCm: number;
  readonly blocsParM2: number;
  readonly poidsKg: number;
  readonly parPalette: number;
  readonly estBancher: boolean;
  readonly betonRemplissageLM2?: number;
}>>;
export declare const CARRELAGE_FORMATS: Readonly<Record<CarrelageFormat, {
  readonly w: number;
  readonly h: number;
  readonly label: string;
  readonly colleKgM2: number;
  readonly jointKgM2: number;
  readonly defBoite: number;
}>>;
export declare const GRAVIER_SPECS: Readonly<Record<GravierMateriau, {
  readonly id: GravierMateriau;
  readonly label: string;
  readonly densiteTM3: number;
  readonly densiteKgM3: number;
  readonly note: string;
}>>;
export declare const TOITURE_DTU: Readonly<Record<ToitureMateriau, {
  readonly id: ToitureMateriau;
  readonly label: string;
  readonly dtu: string;
  readonly minAbsoluPct: number;
  readonly minCourantPct: number;
  readonly poidsKgM2: number;
  readonly note: string;
}>>;

export declare function diagnostiquerTransport(rawWeightKg: number): TransportDiagnostic;
export declare function calculBeton(input?: BetonInput): BetonResult;
export declare function calculParpaing(input?: ParpaingInput): ParpaingResult;
export declare function calculCarrelage(input?: CarrelageInput): CarrelageResult;
export declare function calculGravier(input?: GravierInput): GravierResult;
export declare function optimiserPotsPeinture(litresReq: number): PeinturePotCombo;
export declare function calculPeinture(input?: PeintureInput): PeintureResult;
export declare function convertirPente(input: PenteConversionInput): PenteConversionResult;
export declare function calculPente(input?: PenteInput): PenteResult;
