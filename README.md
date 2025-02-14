## Setup & Installation
1. Clone the repository:
   ```sh
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`.

## Technologies Used
- **Angular 19** (Framework)
- **TypeScript** (Language)

## Notes
Implementation:

    The tests are written for Angular components: PokemonCardComponent, PokemonDetailsComponent and PokemonListComponent.
    
    The main goal is to validate that the components render the correct view based on the data returned from their respective services (like getPokemonDetails and getPokemons).
    
    The tests use Jasmine for mocking the services and Angular's testing utilities like TestBed and ComponentFixture to create and interact with the components.

Optimizations Implemented:

    In the templates of both components, I used Angular's @defer, @loading, and @error directives to handle async states.

    Images in the Pokémon list are lazy-loaded using the HTML loading="lazy" attribute.
    
    The components are standalone and lazy-loaded using Angular's module lazy loading feature.

Responsiveness: 

   The .card-layout class is set to use Flexbox (display: flex), which provides a responsive and flexible layout for the Pokémon cards.

   Media Queries for Mobile Optimization:

   For small screens (max-width: 576px): The cards are displayed as a single column by setting --num-cards: 1


## License
This project is for assessment purposes only.
