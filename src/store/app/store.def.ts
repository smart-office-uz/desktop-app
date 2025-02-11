export interface StoreDef {
  set(key: string, value: string): Promise<unknown>;
  get(key: string): Promise<string | undefined>;
  clear(): Promise<void>;
  delete(key: string): Promise<void>;
}
