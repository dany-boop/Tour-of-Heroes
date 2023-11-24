import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: ['table.mat-table {width: 100%}', '.mat-flat-button {margin: 1em}'],
})
export class HeroesComponent implements OnInit {
  /* Importante declarar dataSource y actualizarlo en get y add */
  dataSource = new MatTableDataSource<Hero>();
  heroes: Hero[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'power',
    'alterEgo',
    'delete',
    'details',
  ];
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.heroes = heroes;
      this.dataSource.data = this.heroes;
    });
  }

  add(name: string, alterEgo: string, power: string): void {
    name = name.trim();
    alterEgo = alterEgo.trim();
    power = power.trim();

    if (!name || !alterEgo || !power) {
      return;
    }

    const newHero: Hero = { name, alterEgo, power } as Hero;

    this.heroService.addHero(newHero).subscribe((hero) => {
      this.heroes.push(hero);
      this.dataSource.data = this.heroes;
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
