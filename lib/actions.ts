import { Pokemon, PokemonType } from './types';

export async function getPokemonTypes(): Promise<PokemonType[]> {
  const response = await fetch('https://pokeapi.co/api/v2/type');
  const data = await response.json();
  return data.results;
}

export async function getPokemonsByType(type: string): Promise<Pokemon[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await response.json();
  
  const pokemonPromises = data.pokemon.slice(0, 20).map(async (p: any) => {
    const pokemonResponse = await fetch(p.pokemon.url);
    return pokemonResponse.json();
  });
  
  return Promise.all(pokemonPromises);
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) throw new Error('Pokemon not found');
  return response.json();
}