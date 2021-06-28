import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private meta:Meta, private title:Title) {
    this.title.setTitle('404 | FounderTools: Lost pages for Volusion Founders');
    this.meta.updateTag({name:'description', content:'Everyone makes mistakes, or breaks things when trying to fix other things. Thats probably what happened.'})
  }

}
