import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPagesComponent implements OnInit{

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {

//document.title = 'Pricing Page';
//    console.log(isPlatformServer(this.platform));
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Pricing Page'});
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page'});
    this.meta.updateTag({ name: 'keywords',
      content: 'Hola, Mundo, Jonathan, Yaguana, Curso, Angular, PRO'});
  }
}
