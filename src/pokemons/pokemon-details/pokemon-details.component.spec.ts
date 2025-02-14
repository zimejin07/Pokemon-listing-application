import {ComponentFixture, TestBed} from "@angular/core/testing";
import {PokemonDetailsComponent} from "./pokemon-details.component";
import {PokemonDetailsService} from "../pokemon-services/pokemon-details.service";
import {PokemonListService} from "../pokemon-services/pokemon-list.service";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {CommonModule} from "@angular/common";
import {PokemonDetails} from "./pokemon-details.interface";

describe("PokemonDetailsComponent", () => {
    let component: PokemonDetailsComponent;
    let fixture: ComponentFixture<PokemonDetailsComponent>;

    let mockPokemonDetailsService: jasmine.SpyObj<PokemonDetailsService>;
    let mockPokemonListService: jasmine.SpyObj<PokemonListService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockPokemonDetailsService = jasmine.createSpyObj("PokemonDetailsService", ["getPokemonDetails",]);
        mockPokemonListService = jasmine.createSpyObj("PokemonListService", ["getPage", "currentPage",]);
        mockRouter = jasmine.createSpyObj("Router", ["navigate"]);

        await TestBed.configureTestingModule({
            imports: [CommonModule, PokemonDetailsComponent],
            declarations: [],
            providers: [{
                provide: PokemonDetailsService,
                useValue: mockPokemonDetailsService
            }, {provide: PokemonListService, useValue: mockPokemonListService}, {
                provide: Router,
                useValue: mockRouter
            },],
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonDetailsComponent);
        component = fixture.componentInstance;
    });

    it("should display Pokémon details when data is available", () => {
        const pokemonDetailsMock: PokemonDetails = {
            id: 1,
            name: "Bulbasaur",
            height: 7,
            weight: 69,
            frontShiny: "https://example.com/front-shiny.png",
            color: "green",
            shape: "quadruped",
        } as PokemonDetails;

        mockPokemonDetailsService.getPokemonDetails.and.returnValue(of(pokemonDetailsMock));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector(".poke-type .text-name").textContent).toContain("Bulbasaur");
            expect(compiled.querySelector(".poke-id").textContent).toContain("1");
            expect(compiled.querySelector(".poke-lang:nth-child(2)").textContent).toContain("7");
            expect(compiled.querySelector(".poke-lang:nth-child(3)").textContent).toContain("69");
            expect(compiled.querySelector(".poke-lang:nth-child(4)").textContent).toContain("green");
            expect(compiled.querySelector(".poke-lang:nth-child(5)").textContent).toContain("quadruped");
        });
    });
});
