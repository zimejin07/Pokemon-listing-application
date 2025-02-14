import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DisplayPokemon} from "../interfaces/pokemon.interface";
import {RouterLink} from "@angular/router";
import {PokemonDetails} from "../pokemon-details/pokemon-details.interface";

@Component({
    selector: "app-pokemon-card",
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div  [routerLink]="['pokemons', pokemon.id]" [state]="{ pokemon }" class="pokemon-card" id="card">
            <div>
                <p id="card-title"><span id="pkm-name">{{ pokemon.name }}</span><span id="pkm-life">120 HP 
                    </span></p>
            </div>
            <div id="card-image">
                <img id="pkm-image" loading="lazy" [src]="pokemon.frontShiny" alt="pokemon image">
                <p id="pkm-image-info">Pokémon. Length: {{ pokemon.height }}, Weight: {{ pokemon.weight }} lbs.</p>
            </div>
        </div>
    `, styles: [`
        #card {
            background-color: var(--red);
            margin: 0 auto;
            position: relative;
            border-radius: 14px;
            border: 15px solid var(--yellow);
            box-shadow: 7.5px 7.5px 5px #888888;
        }
        
        #card-title {
            display: flex;
            width: 100%;
            margin-bottom: 0px;
            margin-top: 0px;
        }

        #pkm-name {
            margin: 0 auto;
            font-size: 20px;
            font-weight: 900;
        }

        #pkm-life {
            font-family: var(--mada);
            text-align: right;
            margin: 0 auto;
            color: #e84206;
            font-weight: 600;
            font-size: 12.5px;
        }

        #pkm-image {
            display: block;
            margin-left: auto;
            margin-right: auto;
            border: 5px solid var(--golden);
            margin-top: 12.5px;
            margin-bottom: 12.5px;
            max-width: 290px;
            height: auto;
        }

        #pkm-image-info {
            text-align: center;
            font-size: 10px;
            font-style: italic;
            font-weight: 600;
            padding: 2.5px;
            border-radius: 2px;
            background-color: var(--golden);
            margin-top: 2.5px;
            margin-right: 25px;
            margin-left: 30px;
        }
    `],
})
export class PokemonCardComponent {
    @Input({required: true}) pokemon!: DisplayPokemon;
}
