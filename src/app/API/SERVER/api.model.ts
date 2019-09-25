export interface ID {
  id: string;
  name: string;
}
export interface Skin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}
export interface Spell {
  abilityIconPath: string;
  abilityVideoImagePath: string;
  abilityVideoPath: string;
  spellKey: string;
  cooldownBurn: string;
  costBurn: string;
  effectBurn: Array<string>;
  rangeBurn: string;
  resource: string;
  name: string;
  tooltip: string;
  vars: Array<{ link: string, coeff: number, key: string }>;
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
export interface ApiChampion {
  name: string;
  title: string;
  partype: string;
  key: string;
  id: string;
  lore: string;
  passive: Passive;
  stats: Stats;
  skins: Array<Skin>;
  spells: Array<Spell>;
}
export interface ApiItem {
  id: string;
  name: string;
  description: string;
  plaintext: string;
  gold: {
    base: number,
    purchasable: boolean,
    total: number,
    sell: number
  };
}
