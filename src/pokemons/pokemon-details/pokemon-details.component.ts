import {
  Component,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnInit,
  Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { PokemonDetailsService } from "../pokemon-services/pokemon-details.service";
import { PokemonListService } from "../pokemon-services/pokemon-list.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { PokemonDetails } from "./pokemon-details.interface";
import { PokemonColor, POKEMON_BG } from "./pokemon.details.const";

@Component({
  selector: "app-pokemons-details",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pokemon-details-content">
      @if (pokemonDetails$ | async; as pokemonDetails) { @defer {
      <div
        class="poke-card poke-grass"
        [ngStyle]="{
          'background-image':
            'url(' + getBackgroundUrl(pokemonDetails.color) + ')'
        }"
      >
        <div class="poke-back">
          <img [src]="pokemonDetails.frontShiny" alt="pokemon image" />
        </div>
        <div class="poke-data">
          <div class="poke-icon"></div>
          <div class="poke-type">
            <span class="text-name">{{ pokemonDetails.name | titlecase }}</span>
          </div>
          <div class="poke-id">
            Id:
            {{ pokemonDetails.id }}
          </div>
          <div class="poke-lang">
            Height:
            {{ pokemonDetails.height }}
          </div>
          <div class="poke-lang">
            <span>Weight: </span>
            {{ pokemonDetails.weight }}
          </div>

          <div class="poke-lang">
            Color:
            {{ pokemonDetails.color }}
          </div>

          <div class="poke-lang">
            Shape:
            {{ pokemonDetails.shape }}
          </div>
        </div>
      </div>
      } @loading (minimum 200ms) {
      <p>Loading....</p>
      } @placeholder (minimum 500ms) {
      <p>Placeholder of Pokemon</p>
      } @error {
      <p>Failed to load dependencies</p>
      } }

      <div class="button-bar">
        <button (click)="backToPage()">Go back</button>
      </div>
    </div>
  `,
  styles: [
    `
      .pokemon-details-content {
        font: 18px/2 "Ubuntu", "Microsoft JhengHei", sans-serif;
        margin: 0 auto;
        padding: 1rem;

        .poke-card {
          display: flex;
          margin: 1.5em auto;
          border-radius: 1em;
          max-width: 600px;
          background: #fff;
          box-shadow: 0 1rem 40px rgba(34, 35, 58, 0.25);
          flex-direction: row;
          overflow: hidden;
          cursor: default;
          color: #333;
        }

        @media screen and (max-width: 400px) {
          .poke-card {
            margin-top: 4em;
            flex-direction: column;
            overflow: visible;
          }
        }

        .poke-card .poke-back {
          flex: 2;
          position: relative;
          background-position: top center;
          background-size: cover;
        }

        @media screen and (max-width: 400px) {
          .poke-card .poke-back {
            border-radius: 1em 1em 0 0;
            min-height: 150px;
          }
        }

        .poke-card .poke-back img {
          display: block;
          position: absolute;
          max-width: unset;
          height: 100%;
        }

        @media screen and (max-width: 400px) {
          .poke-card .poke-back img {
            width: 100%;
            height: auto;
          }
        }

        .poke-card .poke-data {
          flex: 1;
          position: relative;
          padding: 1.5em 2em;
          text-align: right;
          background: rgba(255, 255, 255, 0.9);
        }

        @media screen and (max-width: 400px) {
          .poke-card .poke-data {
            border-radius: inherit;
            background: linear-gradient(
              135deg,
              transparent,
              rgba(255, 255, 255, 0.6),
              #fff,
              #fff
            );
          }
        }

        @media screen and (max-width: 250px) {
          .poke-card .poke-data {
            padding-top: 3em;
          }
        }

        .poke-card .poke-id {
          font-size: 1.5em;
          text-align: right;
        }

        .poke-card .poke-type {
          font-size: 0.8em;
          font-weight: bold;
          text-transform: capitalize;
        }

        .poke-card .poke-type span {
          display: inline-block;
          margin-left: 0.5em;
        }

        .poke-card .poke-type .text-name {
          color: #a866c8;
        }

        .button-bar {
          padding: 1rem;
          justify-content: center;
          display: flex;
        }

        button {
          padding: 0.25rem;
          border-radius: 4px;
        }
      }
    `,
  ],
})
export class PokemonDetailsComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Input({ required: true, transform: (id: string) => numberAttribute(id, 1) })
  id = 1;

  pokemonDetailsService = inject(PokemonDetailsService);
  pokemonListService = inject(PokemonListService);
  router = inject(Router);
  pokemonDetails$!: Observable<PokemonDetails | undefined>;

  ngOnInit(): void {
    this.pokemonDetails$ = this.pokemonDetailsService.getPokemonDetails(
      this.id,
      history.state?.pokemon
    );
  }

  getBackgroundUrl(selectedColor: PokemonColor | string): string {
    const colorKey = selectedColor as PokemonColor;
    if (colorKey in POKEMON_BG) {
      return POKEMON_BG[colorKey];
    }
    return "";
  }

  backToPage() {
    const page = this.pokemonListService.getPage(this.id);
    this.pokemonListService.currentPage.set(page - 1);
    this.router.navigate(["/list"], { queryParams: { page } });
  }
}
