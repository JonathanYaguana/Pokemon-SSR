import { provideRouter } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PokemonListComponent', () => {
let fixture: ComponentFixture<PokemonListComponent>;
let compiled: HTMLElement;
let component: PokemonListComponent;

const mockPokemons = [
  {
    id: '1',
    name:'bulbasaur',
  },
  {
    id: '2',
    name:'ivysaur',
  }
]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with 2 pokemons-card', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('pokemon-card').length).toBe(mockPokemons.length);
  });

  it('sould render "No hay pomemons"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(compiled.querySelector('div')?.textContent).toContain('No hay pokemons');
  });
});
