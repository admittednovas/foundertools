import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faCompressArrowsAlt, faCopy } from '@fortawesome/free-solid-svg-icons';
import { ClipboardService } from 'ngx-clipboard';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-minifier',
  templateUrl: './minifier.component.html',
  styleUrls: ['./minifier.component.scss']
})
export class MinifierComponent {

  faCompressArrowsAlt = faCompressArrowsAlt;
  faCopy = faCopy;

  contentField = new FormControl('');
  results:string = '';
  ready:boolean = false;
  copied:boolean = false;

  constructor(private copyclip: ClipboardService, private title:Title, private meta:Meta) {
    this.title.setTitle('Minifier | FounderTools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'Easily Minify your Volusion template and article HTML and CSS to improve page loading times and lower page file size.'})
  }

  readContent(): void {
    this.results = this.contentField.value
      .replace(/([^0-9a-zA-Z\.#])\s+/g, "$1")
      .replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1")
      .replace(/;}/g, "}")
      .replace(/\/\*.*?\*\//g, "");

    this.ready = true;
  }

  copyResults():void {
    this.copyclip.copy(this.results);
    this.copied = true;
  }

}
