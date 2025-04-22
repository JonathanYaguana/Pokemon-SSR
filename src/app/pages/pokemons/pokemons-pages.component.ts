import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'pokemons-pages',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './pokemons-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPagesComponent implements OnInit {

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  //public isLoading = signal(true);

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1500);
    this.loadPokemons();
  }

  public loadPokemons( page = 0){
    this.pokemonsService.loadPage( page ).subscribe(pokemons => this.pokemons.set(pokemons));
  }
}
