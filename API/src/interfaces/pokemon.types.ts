// src/interfaces/pokemon.interface.ts
export interface IPokemon {
    name: string;
    id: number;
    types: string[];
    stats: {
      hp: number;
      attack: number;
      defense: number;
      specialAttack: number;
      specialDefense: number;
      speed: number;
    };
    image: string;
  }