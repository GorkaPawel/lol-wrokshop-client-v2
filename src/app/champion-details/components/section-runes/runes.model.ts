export class RunePath {
  path: PathType;
  icon: string;

  constructor(apiObject: any) {
    this.path = apiObject.key;
    this.icon = 'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' + (apiObject.icon.toLowerCase());
  }
}

export class Rune {
  path: PathType;
  key: string;
  name: string;
  description: string;
  slot: number;
  icon: string;

  constructor(path: PathType, index: number, rune: any) {
    this.path = path;
    this.slot = index;
    this.key = rune.key;
    this.name = rune.name;
    this.description = rune.longDesc;
    this.icon = 'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/' + (rune.icon.toLowerCase());
  }
}

export type PathType = 'Domination' | 'Precision' | 'Sorcery' | 'Inspiration';

export interface RunePage {
  _id?: string;
  pageName: string;
  primaryPath: RunePath;
  primaryRunes: Array<Rune>;
  secondaryPath: RunePath;
  secondaryRunes: Array<Rune>;
}
