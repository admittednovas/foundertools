import { Component } from '@angular/core';
import { words as _words } from 'lodash';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-character-counter',
  templateUrl: './character-counter.component.html',
  styleUrls: ['./character-counter.component.scss']
})
export class CharacterCounterComponent  {

  counterText:string = '';
  totalCharacters:number = 0;
  totalWords:number = 0;

  constructor(private title:Title, private meta:Meta) {
    this.title.setTitle('Character Counter | FounderTools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'A number of Volusion fields have a maximum character limit, and this tool provides an easy method to test your values to ensure that fall within that limit.'})
  }

  readText():void {
    this.totalCharacters = this.counterText.length;
    let wordcount = _words(this.counterText);
    this.totalWords = wordcount.length;
  }


}
