import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vtoolbox-update',
  templateUrl: './vtoolbox-update.component.html',
  styleUrls: ['./vtoolbox-update.component.scss']
})
export class VtoolboxUpdateComponent {

  constructor(private meta:Meta, private title:Title) {
    this.title.setTitle('Site Update | FounderTools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'VToolbox is now FounderTools, same great tools just with a much better name.'})
  }
}
