import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  numberAttribute,
  Signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { PokemonListService } from "../pokemon-services/pokemon-list.service";
import { switchMap } from "rxjs";
import { DisplayPokemon } from "../interfaces/pokemon.interface";
import { PokemonPaginationComponent } from "../pokemon-pagination/pokemon-pagination.component";

@Component({
  selector: "app-pokemons-list",
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, PokemonPaginationComponent],
  template: `
  <div class="container">
  <div class="card-layout">
    @defer { 
      @for (pokemon of pokemons(); track pokemon.id) {
        <app-pokemon-card [pokemon]="pokemon" />
      } 
    } 
    @loading (minimum 500ms) {
      <p>Loading...</p>
    } 
    @placeholder (minimum 300ms) {
      <p>Placeholder of Pokémon List</p>
    } 
    @error {
      <p>Failed to load dependencies</p>
    }
  </div>

  @if (pokemons().length > 0) {
    <app-pokemon-pagination />
  }
</div>
`,
  styles: [
    `
      .container {
        height: 100vh;
        overflow: scroll;
      }
      .card-layout {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        gap: 10px;
        width: 100%;
        overflow: auto;
        padding: 0 4px;
        color: var(--app-content-main-color);
      }

      .card-layout > * {
        flex-basis: calc((100% - 2 * 0.75rem) / var(--num-cards));
        flex-shrink: 1;
        flex-grow: 1;
      }

      @media (max-width: 576px) {
        .card-layout > * {
          --num-cards: 1;
        }
      }

      @media (max-width: 360px) {
        .card-layout > * {
          --num-cards: 1;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  page = 1;
  pokemonListService = inject(PokemonListService);
  currentPage = this.pokemonListService.currentPage;

  pokemons: Signal<DisplayPokemon[]> = toSignal(
    toObservable(this.currentPage).pipe(
      switchMap(() => this.pokemonListService.getPokemons())
    ),
    { initialValue: [] as DisplayPokemon[] }
  );

  @Input({
    transform: (value: string) => numberAttribute(value, 1),
    alias: "page",
  })
  set _page(value: number) {
    this.page = value;
    this.currentPage.set(this.page - 1);
  }
}
