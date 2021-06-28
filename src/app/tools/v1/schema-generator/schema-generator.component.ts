import { Component, OnInit } from '@angular/core';
import { CheckbreakpointService } from '../../../services/checkbreakpoint.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Papa, ParseConfig, ParseResult } from 'ngx-papaparse';
import {isEmpty as _isEmpty, trim as _trim, toString as _toString } from 'lodash';
import { saveAs } from 'file-saver';
import { Title, Meta } from '@angular/platform-browser';
import { faChevronDown, faFileUpload, faPlay, faSpinner, faFileDownload, faSlidersH , faTimes} from '@fortawesome/free-solid-svg-icons';

export interface SData {
  productCode:string,
  data:{}
}

@Component({
  selector: 'app-schema-generator',
  templateUrl: './schema-generator.component.html',
  styleUrls: ['./schema-generator.component.scss']
})
export class SchemaGeneratorComponent implements OnInit {
  faChevronDown = faChevronDown;
  faFileUpload = faFileUpload;
  faPlay = faPlay;
  faSpinner = faSpinner;
  faFileDownload = faFileDownload;
  faTimes = faTimes;
  faSlidersH = faSlidersH;
  
  isOpen:boolean = false;

  structedData:SData[] = [];
  currencies =  ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYI", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XFU", "XOF", "XPD", "XPF", "XPT", "XTS", "XXX", "YER", "ZAR", "ZMW"];
  csv:any;
  ready:boolean = false;
  complete:boolean = false;
  preview:string = '';
  generatingDL:boolean = false;
  csvError:string = '';
  originalData:[] = [];

  headerForm = new FormGroup({
    currencyCode: new FormControl(null, Validators.required),
    csvfile: new FormControl(null, Validators.required)
  });

  outFieldForm = new FormGroup({
    outfield: new FormControl('', Validators.required),
    overwriteField: new FormControl('')
  })

  constructor(private bpo:CheckbreakpointService, private papa:Papa, private title:Title, private meta:Meta) {
    this.bpo.screensSizeObserver.subscribe( (res:boolean) => {
      this.isOpen = res;
    });
    this.title.setTitle('Schema Generator | FounderTools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'Generate Google Structured Data for your stores products that can easily be imported into your Volusion store.'})
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

  ngOnInit():void {
    this.headerForm.controls['currencyCode'].setValue('USD', {onlySelf:true})
  }

  startTool():void {
    /*reset */
    this.ready = false;
    this.complete = false;
    this.preview = '';
    this.csvError = '';
    this.originalData = [];

    this.ready = true;
    let currency = this.headerForm.value.currencyCode;
    let indx:number = 0;
    const options:ParseConfig = {
      header:true,
      skipEmptyLines:true,
      transformHeader:(header)=>{
        return header.toLowerCase();
      },
      step:(results:ParseResult) => {
        indx = (indx + 1);
        if(
          results.meta.fields.indexOf('productcode') > -1 &&
          results.meta.fields.indexOf('productname') > -1 &&
          results.meta.fields.indexOf('photourl') > -1 &&
          results.meta.fields.indexOf('productdescription') > -1 &&
          results.meta.fields.indexOf('producturl') > -1 &&
          results.meta.fields.indexOf('productprice') > -1 
        ) {

          let sData =  this.buildSchema(results.data, currency);
          if(indx === 1) {
            this.preview = JSON.stringify( sData ,null,'\t');
          }
          this.structedData.push({
            productCode: results.data.productcode,
            data: sData
          })

        } else {
          this.csvError = 'Missing required fields ( ProductCode, ProductName, ProductDescription, ProductPrice, PhotoURL, ProductURL ). Please update your CSV and try again.';
        }

        // @ts-ignore: Object is possibly 'null'.
        this.originalData.push(results.data)
      },
      complete:() =>{
        this.complete = true;
      }
    }
    this.papa.parse(this.csv,options);
  }

  buildSchema(data:any, currency:string) {
    let output = {
      "@context": "http://schema.org/",
      "@type": "Product",
      "name": data['productname'],
      "image": data['photourl'],
      "description": data['productdescription'].replace(/<(.|\n)*?>/g, '').replace(/\n|\r/g, ''),
      "offers": {
        "@type": "Offer",
        "url": data['producturl'],
        "priceCurrency": currency,
        "price": data['productprice']
      }
    };
    
    /* add itemCondition */
    if(!_isEmpty(data['productcondition'])) {
      output["offers"]["itemCondition"] = data['productcondition']
    }

    /* add Availability */
    if(!_isEmpty(data['google_availability'])) {
      switch(data['google_availability']){
        case 'In stock': 
          output["offers"]["availability"] = 'http://schema.org/InStock';
          break;
        case 'Out of stock':
          output["offers"]["availability"] = 'http://schema.org/OutOfStock';
          break;
        case 'Preorder':
          output["offers"]["availability"] = 'http://schema.org/PreOrder';
          break;
      }
    }

    /* add SKU */
    if(!_isEmpty(data['vendor_partno'])) {
      output['sku'] = data['vendor_partno']
    } else {
      output['sku'] = data['productcode']
    }

    /* add MPN */
    if(!_isEmpty(data['mpn'])) {
      output['mpn'] = data['mpn']
    }

    /* add GTIN */
    if(!_isEmpty(data['upc_code'])) {
      if(data['upc_code'].length === 12) {
        output['gtin12'] = data['upc_code']
      } else {
        output['gtin13'] = data['upc_code']
      }
    } else if(!_isEmpty(data['ean'])){
      if(data['ean'].length === 8) {
        output['gtin8'] = data['ean']
      } else {
        output['gtin13'] = data['ean']
      }
    } else if(!_isEmpty(data['book_isbn'])){
      output['gtin13'] = data['book_isbn']
    }

    /* add Brand */
    if(!_isEmpty(data['productmanufacturer'])){
      output['brand'] = {
        "@type": "Brand",
        "name": data['productmanufacturer']
      }
    }

    return output;
  }

  downloadFile():void {
    this.generatingDL = true;
    let dataOut = [];
    for(let i=0;i<this.structedData.length;i++) {
      dataOut.push({
        // @ts-ignore: Object is possibly 'null'.
        'productcode': this.structedData[i].productCode,
        [ this.outFieldForm.value['outfield'] ]: `<script type="application/ld+json">${JSON.stringify(this.structedData[i].data)}</script>${ this.outFieldForm['overwriteField'] ? ( this.originalData[i][this.outFieldForm.value['outfield']] || '' ) : ''}`
      });
    }

    let csvOut = new Blob([this.papa.unparse(dataOut)], {type:"text/plain;charset=utf-8"} );
    saveAs(csvOut, `StructuredData-${new Date().getUTCMilliseconds()}.csv`);
    this.generatingDL = false;

  }

}
