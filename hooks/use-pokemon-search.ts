'use client';

import { useState, useEffect } from 'react';
import { Pokemon } from '@/lib/types';
import { getPokemonsByType } from '@/lib/actions';

export function usePokemonSearch(selectedType: string) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      try {
        const data = await getPokemonsByType(selectedType || 'normal');
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching pokemon:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [selectedType]);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    pokemon: filteredPokemon,
    searchTerm,
    setSearchTerm,
    loading,
  };
}