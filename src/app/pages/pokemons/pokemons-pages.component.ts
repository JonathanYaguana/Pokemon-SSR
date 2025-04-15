import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";

@Component({
  selector: 'pokemons-pages',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './pokemons-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPagesComponent { }
