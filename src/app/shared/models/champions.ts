export interface Champion {
  id: string;
  name: string;
}

export interface HasSKins {
  skins: Array<{ id: string, num: number, name: string, chromas: boolean }>;
}

export interface HasIdentity {
  name: string;
  title: string;
  partype: string;
  key: string;
  id: string;
  passive: Passive;
  stats: Stats;
  spells: Array<Spell>;
}

export interface Spell {
  abilityIconPath: string;
  abilityVideoImagePath: string;
  abilityVideoPath: string;
  spellkey: string;
  cooldownBurn: string;
  costBurn: string;
  effectBurn: Array<string>;
  rangeBurn: string;
  resource: string;
  name: string;
  tooltip: string;
  vars: Array<{link: string, coeff: number, key: string}>;
}
export interface Passive {
  abilityIconPath: string;
  abilityVideoImagePath: string;
  abilityVideoPath: string;
  description: string;
  name: string;
}
export interface Stats {
  armor: number;
  armorperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackrange: number;
  attackspeed: number;
  attackspeedperlevel: number;
  crit: number;
  critperlevel: number;
  hp: number;
  hpperlevel: number;
  hpregen: number;
  hpregenperlevel: number;
  movespeed: number;
  mp: number;
  mpperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
}

export type Champ = (HasSKins & HasIdentity) | null;
