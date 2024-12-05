'use client';

import { PokemonCard } from '@/components/pokemon-card';
import { PokemonSearchForm } from '@/components/pokemon-search-form';
import { usePokemonSearch } from '@/hooks/use-pokemon-search';
import { useState } from 'react';

export default function Home() {
  const [selectedType, setSelectedType] = useState('normal');
  const { pokemon, searchTerm, setSearchTerm, loading } = usePokemonSearch(selectedType);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Pokémon Explorer</h1>
      
      <PokemonSearchForm
        onTypeChange={setSelectedType}
        onSearchChange={setSearchTerm}
      />

      {loading ? (
        <div className="grid place-items-center">
          <div className="h-32 w-32 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </main>
  );
}