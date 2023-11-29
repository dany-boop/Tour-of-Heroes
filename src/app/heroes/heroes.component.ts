import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MatTableDataSource } from '@angular/material/table';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
    'table.mat-table {width: 100%;border-radius:20px}',
    '.mat-flat-button {margin: 2em ;border-radius:20px}',
    '.mat-header-cell {color: #ffff}',
    'tr.mat-header-row { background-color: #3f51b5; color: #ffff; }',
  ],
  // styleUrls: ['./heroes.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            stagger(100, [
              animate(
                '500ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HeroesComponent implements OnInit {
  /* Importante declarar dataSource y actualizarlo en get y add */
  dataSource = new MatTableDataSource<Hero>();
  heroes: Hero[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'power',
    'keterangan',
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
      // Use a timer to simulate staggered loading
      let index = 0;
      const intervalId = setInterval(() => {
        this.dataSource.data = [...this.dataSource.data, heroes[index]];
        index++;
        if (index === heroes.length) {
          clearInterval(intervalId);
        }
      }, 200);
    });
  }

  add(name: string, alterEgo: string, keterangan: string, power: string): void {
    name = name.trim();
    alterEgo = alterEgo.trim();
    keterangan = keterangan.trim();
    power = power.trim();

    if (!name || !alterEgo || !power || !keterangan) {
      return;
    }

    const newHero: Hero = { name, alterEgo, keterangan, power } as Hero;

    this.heroService.addHero(newHero).subscribe((hero) => {
      this.heroes.push(hero);
      this.dataSource.data = this.heroes;

      this.getHeroes();
    });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe(() => {
      // Filter out the deleted hero
      this.heroes = this.heroes.filter((h) => h !== hero);
      this.dataSource.data = this.heroes;

      // Fetch all heroes again
      this.getHeroes();
    });
  }
  getDelay(index: number): string {
    return `${index * 10000}ms`;
  }
}
