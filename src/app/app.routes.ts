import {Routes} from "@angular/router";

export const routes: Routes = [{
    path: 'list',
    loadComponent: () => import('../pokemons/pokemon-list/pokemon-list.component')
        .then((m) => m.PokemonListComponent),
    title: 'Pokemon List'
},
    {
    path: 'list/pokemons/:id',
    loadComponent: () => import('../pokemons/pokemon-details/pokemon-details.component')
        .then((m) => m.PokemonDetailsComponent),
    title: 'Pokemon Details'
},
    {
    path: '', pathMatch: 'full',
    redirectTo: '/list?page=1',
},
    {
    path: '**',
    redirectTo: '/list?page=1',
}];
