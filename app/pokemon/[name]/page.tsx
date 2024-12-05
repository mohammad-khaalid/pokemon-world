import { Breadcrumb } from '@/components/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPokemonByName } from '@/lib/actions';
import Image from 'next/image';

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await getPokemonByName(params.name);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          {
            label: pokemon.name,
            href: `/pokemon/${pokemon.name}`,
          },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl capitalize">{pokemon.name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <Badge key={type.type.name} variant="secondary" className="capitalize">
                {type.type.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative h-64 w-full">
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold">Stats</h3>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center justify-between">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span className="font-semibold">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold">Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="font-semibold">{pokemon.height / 10}m</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-semibold">{pokemon.weight / 10}kg</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <Badge key={ability.ability.name} className="capitalize">
                      {ability.ability.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}