import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent  {
  faCalendarAlt = faCalendarAlt;

  constructor(private meta:Meta, private title:Title) {
    this.title.setTitle('Release Notes | FounderTools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'Details and information on updates, releases and bug fixes for the tools and pages of FounderTools.'})
  }

}
