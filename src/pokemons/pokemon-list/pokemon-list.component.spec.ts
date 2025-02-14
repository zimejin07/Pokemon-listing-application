import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonListComponent} from './pokemon-list.component';
import {PokemonListService} from '../pokemon-services/pokemon-list.service';
import {PokemonCardComponent} from '../pokemon-card/pokemon-card.component';
import {CommonModule} from '@angular/common';
import {DisplayPokemon} from '../interfaces/pokemon.interface';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';
import {provideRouter} from "@angular/router";

describe('PokemonListComponent', () => {
    let component: PokemonListComponent;
    let fixture: ComponentFixture<PokemonListComponent>;
    let mockPokemonListService: jasmine.SpyObj<PokemonListService>;

    beforeEach(async () => {
        mockPokemonListService = jasmine.createSpyObj('PokemonListService', ['getPokemons']);

        const mockPokemons: DisplayPokemon[] = [{
            id: 1,
            name: 'Bulbasaur',
            frontShiny: 'https://example.com/bulbasaur.png'
        }, {id: 2, name: 'Ivysaur', frontShiny: 'https://example.com/ivysaur.png'},] as DisplayPokemon[];

        mockPokemonListService.getPokemons.and.returnValue(of(mockPokemons));

        await TestBed.configureTestingModule({
            imports: [CommonModule, PokemonListComponent, PokemonCardComponent],
            providers: [{provide: PokemonListService, useValue: mockPokemonListService}, provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonListComponent);
        component = fixture.componentInstance;
    });

    it('should render pokemon cards based on pokemons returned from the service', () => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            const pokemonCards = fixture.debugElement.queryAll(By.css('app-pokemon-card'));

            expect(pokemonCards.length).toBe(2);

            const firstCard = pokemonCards[0].nativeElement;
            expect(firstCard.querySelector('img').src).toContain('bulbasaur.png');
            expect(firstCard.querySelector('.pokemon-name').textContent).toContain('Bulbasaur');

            const secondCard = pokemonCards[1].nativeElement;
            expect(secondCard.querySelector('img').src).toContain('ivysaur.png');
            expect(secondCard.querySelector('.pokemon-name').textContent).toContain('Ivysaur');
        });
    });
});
