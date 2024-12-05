'use client';

import { Pokemon } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <Card className="h-full transition-transform hover:scale-105">
        <CardHeader>
          <CardTitle className="text-lg capitalize">{pokemon.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-48 w-full">
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <Badge key={type.type.name} variant="secondary" className="capitalize">
                {type.type.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}