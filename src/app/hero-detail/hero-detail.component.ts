import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
// import { HeroFormComponent } from '../path-to-hero-form/hero-form.component';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styles: ['.mat-flat-button{ margin: 1em }'],
})
export class HeroDetailComponent implements OnInit {
  hideRequiredControl: any;
  getFloatLabelValue(): import('@angular/material/form-field').FloatLabelType {
    throw new Error('Method not implemented.');
  }

  @Input() hero?: Hero;

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
