import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-pages.component'),
  },
  {
    path: 'pokemons',
    loadComponent: () => import('./pages/pokemons/pokemons-pages.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-pages.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-pages.component'),
  },
  {
    path: '**',
    redirectTo: 'about',
  }
];
