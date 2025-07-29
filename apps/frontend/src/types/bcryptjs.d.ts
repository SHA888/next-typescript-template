declare module 'bcryptjs' {
  export function hashSync(data: string | Buffer, saltOrRounds: string | number): string;
  export function compareSync(data: string | Buffer, encrypted: string): boolean;
  export function genSaltSync(rounds?: number): string;
  export function hash(
    data: string | Buffer,
    saltOrRounds: string | number,
    callback?: (err: Error | null, encrypted: string) => void
  ): Promise<string>;
  export function compare(
    data: string | Buffer,
    encrypted: string,
    callback?: (err: Error | null, same: boolean) => void
  ): Promise<boolean>;
  export function genSalt(rounds?: number): Promise<string>;
}
