// export interface Hero {
//     id: number;
//     name: string;
// }
export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public keterangan: string,
    public alterEgo?: string
  ) {}
}
