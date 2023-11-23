import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 23, name: 'Danny' },
      { id: 16, name: 'Ayy' },
      { id: 14, name: 'hyaafz' },
      { id: 15, name: 'jack sparrow' },
      { id: 99, name: 'RubberMan' },
      { id: 17, name: 'Leo' },
      { id: 18, name: 'Drew' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Durden' },
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
