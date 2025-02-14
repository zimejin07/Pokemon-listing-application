import {ComponentFixture, TestBed} from "@angular/core/testing";
import {PokemonCardComponent} from "./pokemon-card.component";
import {DisplayPokemon} from "../interfaces/pokemon.interface";
import {provideRouter} from "@angular/router";
import {CommonModule} from "@angular/common";

const mockPokemon: DisplayPokemon = {
    id: 1,
    name: "Bulbasaur",
    frontShiny: "https://img.pokemondb.net/sprites/firered-leafgreen/shiny/bulbasaur.png",
    height: 7,
    weight: 15,
} as DisplayPokemon;

describe("PokemonCardComponent", () => {
    let component: PokemonCardComponent;
    let fixture: ComponentFixture<PokemonCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, PokemonCardComponent,], providers: [provideRouter([])]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PokemonCardComponent);
        component = fixture.componentInstance;
        component.pokemon = mockPokemon;
        fixture.detectChanges();
    });

    it("should display pokemon details correctly", () => {
        const compiled = fixture.debugElement.nativeElement as HTMLElement;

        const pokemonName = compiled.querySelector("#pkm-name");
        if (pokemonName) {
            expect(pokemonName.textContent).toContain("Bulbasaur");
        } else {
            fail("Pokémon name element was not found");
        }

        const pokemonLife = compiled.querySelector("#pkm-life");
        if (!pokemonLife) {
            fail("Pokémon life element was not found");
        }

        const pokemonImage = compiled.querySelector("#pkm-image") as HTMLImageElement;
        expect(pokemonImage.src).toContain("https://img.pokemondb.net/sprites/firered-leafgreen/shiny/bulbasaur.png");

        const imageInfo = compiled.querySelector("#pkm-image-info");
        if (imageInfo) {
            expect(imageInfo.textContent).toContain("Length: 7, Weight: 15 lbs.");
        } else {
            fail("Image information element was not found");
        }
    });
});
