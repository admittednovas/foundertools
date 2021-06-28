import { Component, OnInit } from '@angular/core';
import { CheckbreakpointService } from '../../../services/checkbreakpoint.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Papa, ParseConfig, ParseResult } from 'ngx-papaparse';
import { chunk as _chunk, zip } from 'lodash';
import { saveAs } from 'file-saver';
// @ts-ignore
import * as JSZip from 'jszip';

import { faDivide, faChevronDown, faSlidersH, faTimes, faFileUpload, faFileDownload,faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-csv-splitter',
  templateUrl: './csv-splitter.component.html',
  styleUrls: ['./csv-splitter.component.scss']
})
export class CsvSplitterComponent implements OnInit {
  faDivide = faDivide;
  faChevronDown = faChevronDown;
  faPlay = faPlay;
  faFileUpload = faFileUpload;
  faFileDownload = faFileDownload;
  faSlidersH = faSlidersH;
  faTimes = faTimes;
  faSpinner = faSpinner;

  selectSizes:number[] = [50,100,500,1500,2000,2500,5000];

  csv:any;
  progress:number = 0;
  ready:boolean = false;
  complete:boolean = false;
  generatingDL:boolean = false;

  csvTotalColumns:number = 0;
  csvTotalRows:number = 0;
  csvSplitCount:number = 0;
  csvFileSize:string = '';

  isOpen:boolean = false;

  zipFile: JSZip = new JSZip();
  zipFolder = this.zipFile.folder('Split_Files')

  headerForm = new FormGroup({
    splitsize: new FormControl(null, Validators.required),
    csvfile: new FormControl(null, Validators.required)
  })

  constructor(private papa:Papa, private title:Title, private meta:Meta, private bpo:CheckbreakpointService) {
    this.bpo.screensSizeObserver.subscribe( (res:boolean) => {
      this.isOpen = res;
    })

    this.title.setTitle('CSV Splitter | FounderTools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'Avoid Volusion import file time out errors by splitting your large CSV files into multiple smaller more managable and easier to upload files.'})
  }

  ngOnInit(): void {
    this.headerForm.controls['splitsize'].setValue(1500, {onlySelf:true})
  }

  openSidebar():void {
    if(this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }
  
  fileUpload(e:any): void {
    // @ts-ignore: Object is possibly 'null'.
    this.csv = e[0];
  }

  startTool():void {
    /* reset */
    this.csvTotalColumns = 0;
    this.csvTotalRows = 0;
    this.csvSplitCount = 0;
    this.csvFileSize = '';
    this.complete = false;


    this.ready = true;
    const split = this.headerForm.value.splitsize;
    let index:number = 0;
    this.csvFileSize = this.formatFileSize(this.csv.size, 1);
    const options:ParseConfig = {
      header: true,
      skipEmptyLines:true,
      chunk:(results:ParseResult, parser) => {
        index = (index + 1);
        this.csvTotalColumns = results.meta.fields.length;
        this.csvTotalRows = (this.csvTotalRows + results.data.length);

        let chunks = _chunk(results.data, split);
        for(let i=0;i<chunks.length;i++){
          this.csvSplitCount++;
          let splitCSV = this.papa.unparse(chunks[i], {header:true,skipEmptyLines:true});
          console.log(index, splitCSV)
          this.zipFolder.file(`SplitFile-${index}-${i}.csv`, splitCSV);
          console.log(this.zipFolder)
        }
      },
      complete:() => {
        setTimeout(() => {this.complete = true;}, 2000)
      }
    }
    this.papa.parse(this.csv, options)
  }

  downloadFiles():void {
    this.generatingDL = true;
    this.zipFile.generateAsync({type:"blob"})
      .then( (content:any)=> {
        saveAs(content, `SplitCSV-${new Date().getUTCMilliseconds()}.zip`)
      }).then( ()=> {this.generatingDL = false})
  }


  formatFileSize(bytes:number,decimalPoint:number) {
    if(bytes == 0) return '0 Bytes';
    var k = 1000,
        dm = decimalPoint || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


}
