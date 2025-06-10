import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-pages',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPagesComponent {

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private title = inject(Title);

  public currentPage = toSignal(
     this.route.params.pipe(
      map( (params) => params['page'] ?? '1' ),
      map( (page) => (isNaN(+page) ? 1 : +page) ),
      map( (page) => Math.max(1, page) ),
    )
  );

  public loadOnPageChanged = effect(
    () => {
      this.loadPokemons(this.currentPage()!);
    },
    { allowSignalWrites: true }
  );

  public loadPokemons( page = 0 ){

    // const pageToLoad = this.currentPage()! + page;

    console.log( {page, currentPage: this.currentPage()!} );

    this.pokemonsService.loadPage( page )
    .pipe(
      tap(() => this.title.setTitle(`Pokémons SSR - Page ${ page }`)),
    )
    .subscribe(
      (pokemons) => this.pokemons.set( pokemons )
    );
  }
}
