export interface Champion {
  championName: string;
  id: string;
}
export interface HasSKins {
  skins: Array<{id: string, num: number, name: string, chromas: boolean}>;
}
export interface HasIdentity {
  name: string;
  key: string;
}
export type Champ = (HasSKins & HasIdentity)| null;
