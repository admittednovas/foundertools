import { Component } from '@angular/core';
import { CheckbreakpointService } from '../../../services/checkbreakpoint.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Papa, ParseConfig, ParseResult } from 'ngx-papaparse';
import { isEmpty as _isEmpty } from 'lodash';
import { saveAs } from 'file-saver';
import { Meta, Title } from '@angular/platform-browser';
import { faFileUpload, faPlay, faFileDownload, faSpinner, faTimes, faSlidersH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-facebook-catalog',
  templateUrl: './facebook-catalog.component.html',
  styleUrls: ['./facebook-catalog.component.scss']
})
export class FacebookCatalogComponent {
  faPlay = faPlay;
  faFileUpload = faFileUpload;
  faFileDownload = faFileDownload;
  faSpinner = faSpinner;
  faTimes = faTimes;
  faSlidersH = faSlidersH;

  isOpen:boolean = false;

  headerForm = new FormGroup({
    csvfile: new FormControl(null, Validators.required)
  })

  csv:any;
  ready:boolean = false;
  complete:boolean = false;
  generatingDL:boolean = false;
  csvError:string = '';

  outputData:[] = [];

  constructor(private bpo:CheckbreakpointService, private papa:Papa, private meta:Meta, private title:Title) {
    this.bpo.screensSizeObserver.subscribe( (res:boolean) => {
      this.isOpen = res;
    });
    this.title.setTitle('Facebook Catalog Creator | FounderTools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'Easily create a Facebook Product feed file from your Volusion store product data.'})
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
    this.ready = true;
    const options:ParseConfig = {
      header: true,
      skipEmptyLines:true,
      transformHeader:(header)=>{
        return header.toLowerCase();
      },
      step:(results:ParseResult) => {
        if(
          results.meta.fields.indexOf('productcode') > -1 &&
          results.meta.fields.indexOf('productname') > -1 &&
          results.meta.fields.indexOf('productdescription') > -1 &&
          results.meta.fields.indexOf('photourl') > -1 &&
          results.meta.fields.indexOf('producturl') > -1 &&
          results.meta.fields.indexOf('google_product_type') > -1 &&
          results.meta.fields.indexOf('google_availability') > -1 
        ){

          let fbData =  this.buildCatalog(results.data);
          // @ts-ignore: Object is possibly 'null'.
          this.outputData.push(fbData);

        } else {
          this.complete = true;
          this.csvError = 'The uploaded CSV file is missin g required Facebook fields ( ProductCode, ProductName, ProductDescription, Google Availability, Google Condition ). Please correct and try again.'
        }

      },
      complete:() => {
        this.complete = true;
      }
    }

    this.papa.parse(this.csv, options)
  }

  buildCatalog(data:any) {
    let fb = {
      id: data['productcode'],
      title: data['productname'],
      description: data['productdescription'].replace(/<(.|\n)*?>/g, '').replace(/\n|\r/g, ''),
      availability: data['google_availability'],
      condition: data['productcondition'],
      price: data['productprice'],
      link: data['producturl'],
      image_link: data['photourl']
    }

    /* ADD BRAND */
    if(!_isEmpty(data['productmanufacturer'])) {
      fb['brand'] = data['productmanufacturer']
    } else if(!_isEmpty(data['mpn'])) {
      fb['brand'] = data['mpn']
    } else if(!_isEmpty(data['upc_code'])) {
      fb['brand'] = data['upc_code']
    } else if(!_isEmpty(data['ean'])) {
      fb['brand'] = data['ean']
    } else if(!_isEmpty(data['book_isbn'])) {
      fb['brand'] = data['book_isbn']
    } else {
      fb['brand'] = data['productcode']
    }

    /*optional sale price*/
    if(!_isEmpty(data['saleprice'])){
      fb['sale_price'] = data['saleprice']
    }

    /*optional visibility*/
    if(!_isEmpty(data['hideproduct'])) {
      if(data['hideproduct'] === 'Y'){
        fb['visibility'] = 'hidden'
      }
    }

    /*optional color*/
    if(!_isEmpty(data['google_color'])){
      fb['color'] = data['google_color']
    }

    /*optional gender*/
    if(!_isEmpty(data['google_gender'])){
      fb['color'] = data['google_gender']
    }

    /*optional size*/
    if(!_isEmpty(data['google_size'])){
      fb['color'] = data['google_size']
    }

    /*optional age group*/
    if(!_isEmpty(data['google_age_group'])){
      fb['color'] = data['google_age_group']
    }

    /*optional material*/
    if(!_isEmpty(data['google_material'])){
      fb['color'] = data['google_material']
    }

    /*optional pattern*/
    if(!_isEmpty(data['google_pattern'])){
      fb['color'] = data['google_pattern']
    }

    /*optional custom labels*/
    if(!_isEmpty(data['custom_label_0'])){
      fb['color'] = data['custom_label_0']
    }
    if(!_isEmpty(data['custom_label_1'])){
      fb['color'] = data['custom_label_1']
    }
    if(!_isEmpty(data['custom_label_2'])){
      fb['color'] = data['custom_label_2']
    }
    if(!_isEmpty(data['custom_label_3'])){
      fb['color'] = data['custom_label_3']
    }
    if(!_isEmpty(data['custom_label_4'])){
      fb['color'] = data['custom_label_4']
    }

    /* OPtional google category*/
    if(!_isEmpty(data['google_product_category'])) {
      fb['google_product_category'] = data['google_product_category']
    }

    /*option stock*/
    if(!_isEmpty(data['stockstatus'])){
      fb['inventory'] = data['stockstatus']
    }

    return fb;
  }

  downloadFile():void {
    this.generatingDL = true;
    let csvOut = new Blob([this.papa.unparse(this.outputData)], {type:"text/plain;charset=utf-8"} );
    saveAs(csvOut, `FacebookProductFeed-${new Date().getUTCMilliseconds()}.csv`);
    this.generatingDL = false;
  }

}
