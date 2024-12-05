'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getPokemonTypes } from '@/lib/actions';
import { PokemonType } from '@/lib/types';

interface PokemonSearchFormProps {
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
}

export function PokemonSearchForm({
  onTypeChange,
  onSearchChange,
}: PokemonSearchFormProps) {
  const [types, setTypes] = useState<PokemonType[]>([]);

  useEffect(() => {
    async function fetchTypes() {
      const data = await getPokemonTypes();
      setTypes(data);
    }
    fetchTypes();
  }, []);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <Select onValueChange={onTypeChange} defaultValue="normal">
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type.name} value={type.name} className="capitalize">
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Search Pokémon..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}