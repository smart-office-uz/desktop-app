export interface StoreDef {
  set: (key: string, value: any) => void;
  get: (key: string) => any | undefined;
}
