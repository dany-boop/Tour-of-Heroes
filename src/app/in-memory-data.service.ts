import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 23, name: 'Danny', power: 'Super Hot', alterEgo: '' },
      { id: 16, name: 'Ayy', power: 'Super Hot', alterEgo: '' },
      { id: 14, name: 'hyaafz', power: 'Super Hot', alterEgo: '' },
      { id: 15, name: 'jack sparrow', power: 'Weather Changer', alterEgo: '' },
      { id: 99, name: 'RubberMan', power: 'Super Flexible', alterEgo: '' },
      { id: 17, name: 'Leo', power: 'Really Smart', alterEgo: '' },
      { id: 18, name: 'Drew', power: 'Weather Changer', alterEgo: '' },
      { id: 19, name: 'Magma', power: 'Super Hot', alterEgo: '' },
      { id: 20, name: 'Durden', power: 'Super Hot', alterEgo: '' },
    ];
    return { heroes };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1. 
  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
