import { SimplePokemon } from './../interfaces/simple-pokemon.interface';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokemonsService } from './pokemons.service';
import { TestBed } from '@angular/core/testing';
import { catchError } from 'rxjs';

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur'},
  { id: '2', name: 'ivysaur'},
];

const mockPokeApiResponse = {
  count: 1302,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: "",
  results: [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
      ]
};

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  //TODO: otros campos de la interfaz Pokemon segun sea necesario
};


describe('PokemonsService', () => {

  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sould load a page of SimplePokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {

      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });


  it('should load a Pokemons by ID', () => {

    const pokemonName = 'PokemonNoE';

    service.loadPokemon(pokemonName).subscribe((pokemon:any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should catch error if pokémon not found', () => {

    const pokemonName = 'pokemon-no-existe';

    service.loadPokemon(pokemonName)
    .pipe(
      catchError((err) => {
        //console.log(err);
        expect(err.message).toContain('Pokemon not found');
        return [];
      })
    )
    .subscribe();

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not Found'
    });
  });
});
