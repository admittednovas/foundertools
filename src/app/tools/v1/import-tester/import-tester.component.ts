import { Component } from '@angular/core';
import { CheckbreakpointService } from '../../../services/checkbreakpoint.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Papa, ParseConfig, ParseResult } from 'ngx-papaparse';
import { ClipboardService } from 'ngx-clipboard';
import { Meta, Title } from '@angular/platform-browser';

import { FieldDef, AllTableDefs } from '../models/all-tables';

import { difference as _difference, find as _find, isMatch as _isMatch, forEach as _forEach, isEmpty as _isEmpty, findKey as _findKey, includes as _includes, unescape as _unescape, split as _split} from 'lodash';
import { faUpload, faPlay, faSlidersH, faTimes, faFileUpload, faCopy } from '@fortawesome/free-solid-svg-icons';

export interface CSVError {
  column:string,
  message:string,
  row?:number,
  info?:string,
  char?:any
}

@Component({
  selector: 'app-import-tester',
  templateUrl: './import-tester.component.html',
  styleUrls: ['./import-tester.component.scss']
})
export class ImportTesterComponent {
  faUpload = faUpload;
  faPlay = faPlay;
  faSlidersH = faSlidersH;
  faTimes = faTimes;
  faFileUpload = faFileUpload;
  faCopy = faCopy;

  isOpen:boolean = false;

  allTables:string[] = ["ArticleCategories","Articles","Categories","Customers","Discounts","Discounts_ApplyTo","GiftCardDetails","GiftCards","KitLnks","Kits","Options","OptionCategories","PageText","Payment_Log","PO_Items","POs","Product_Keys","Products","Recurring","Reviews","ReviewsHelpful","RMA_Items","RMAs","States_Provinces","TrackingNumbers","Tax","Vendors","VendorRules"]
  ready:boolean = false;
  complete:boolean = false;
  generatingDL:boolean = false;
  columnErrors:CSVError[] = [];
  rowErrors:CSVError[] = [];
  totalRows:number = 0;
  totalColumns:number = 0;
  csv:any;

  displayColumnErrors:string[] = ['column','message'];
  displayRowErrors:string[] = ['row','column','message'];

  headerForm = new FormGroup({
    destinationTable: new FormControl(null, Validators.required),
    csvfile: new FormControl(null, Validators.required)
  });
  
  constructor(private papa:Papa, private bpo:CheckbreakpointService, private copyclip: ClipboardService, private meta:Meta, private title:Title) {
    this.bpo.screensSizeObserver.subscribe( (res:boolean) => {
      this.isOpen = res;
    })
    this.title.setTitle('Import Tester | Foundertools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'Easily test your Volusion CSV import file against common errors and formatting issues.'})
  }

  fileUpload(e?:any): void {
    // @ts-ignore: Object is possibly 'null'.
    this.csv = e[0];
  }

  openSidebar():void {
    if(this.isOpen) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  startTool():void {
    /*reset*/
    this.totalRows = 0;
    this.totalColumns = 0;
    this.columnErrors = [];
    this.rowErrors = [];
    
    this.ready = true;
    let indx:number = 1;
    let tableDef:FieldDef = AllTableDefs[this.headerForm.value.destinationTable.toLowerCase()];

    const options:ParseConfig = {
      header:true,
      skipEmptyLines:true,
      encoding: "ISO-8859-1",
      transformHeader: (header) =>{
        return header.toLocaleLowerCase();
      },
      step: async(results:ParseResult, parser) => {
        parser.pause();
        indx = (indx + 1);

        if(indx === 2) {
         this.columnErrors = await this.validateColumns( tableDef,results.meta.fields )
        }

        let validFields:CSVError[] = await this.validateFields(tableDef, results.data, indx);
        if(validFields.length > 0){
          _forEach(validFields, (v,i)=>{
            this.rowErrors.push(v)
          });
        }

        parser.resume();
      },
      complete: () => {
        this.complete = true;
      }
    }

    this.papa.parse(this.csv, options);

  }

  validateColumns(td:any, cols:any) {

    return new Promise<CSVError[]>(resolve => {

      let colDiff = _difference(cols, Object.keys(td) );
      let requiredCol = _findKey(td, ['required', true]);
      let errs:CSVError[] = [];

      if(cols[0] !== requiredCol) {
        errs.push({
          column: requiredCol || 'Unknown',
          message: `The required column ${requiredCol} is not present or is not the first column in the CSV file.`
        });
      }
  
      if(colDiff.length !== 0) {
        _forEach(colDiff, (v,k) => {
          errs.push({
            column: v,
            message: `The column ${v} does not exist on the selected table or is not eligible for import.`
          })
        })
      }
      resolve(errs);

    });

  }

  validateFields(td:any, data:any, i:number) {

    return new Promise<CSVError[]>(resolve => {
      let errs:CSVError[] = [];

      Object.keys(data).forEach(e => {
        let fieldTest:FieldDef = td[e];
        if(fieldTest) {
          switch(fieldTest.type) {

            case "text":
              if( !_isEmpty(data[e]) ) {
  
                if( data[e].match(/[^\x00-\x7F]+/g) ) {
                  let invalidChars = data[e].match(/[^\x00-\x7F]+/g);
                  let invalidCharsList:any = [];
                  _forEach(invalidChars, (c) => {
                    invalidCharsList.push('&#'+c.charCodeAt(0)+';');
                  })

                  errs.push({
                    row:i,
                    column:e,
                    message: `The field value contains non UTF-8 characters: `,
                    char: invalidCharsList
                  })
                }
    
                if(fieldTest.maxLength) {
                  if(String(data[e]).length > fieldTest.maxLength ) {
                    errs.push({
                      row:i,
                      column:e,
                      message: `The field value exceeds the fields maximum length of ${fieldTest.maxLength}.`
                    })
                  }
                }
    
                if(fieldTest.pattern){
                  if(String(data[e]).match(fieldTest.pattern)) {
                    errs.push({
                      row:i,
                      column:e,
                      message: `The field value ${fieldTest.patternMessage}`
                    })
                  }
                }
    
              } else {
                if(fieldTest.required){
                  errs.push({
                    row:i,
                    column:e,
                    message:`The field value is required and can not be empty.`
                  })
                }
              }
            break;
            case "integer":
                if(!_isEmpty(data[e])) {
                  if(Number(data[e]) !== parseFloat(data[e])) {
                    errs.push({
                      row:i,
                      column:e,
                      message: `The field value must contain an integer value.`
                    })
                  }
                }
            break;
            case "enum":
                if(!_isEmpty(data[e])) {
                  if( !_includes(fieldTest.enumvals, data[e].toUpperCase()) ) {
                    errs.push({
                      row:i,
                      column:e,
                       // @ts-ignore: Object is possibly 'null'.
                      message: `The field value must contain on of the following values: ${ fieldTest.enumvals.toString() }.`
                    })
                  }
                }
            break;
            case "date-time":
                  if(!_isEmpty(data[e])) {
                    let dateReg = new RegExp(/^([0]?[1-9]|[1][012])\/([0]?[1-9]|[12]\d|[3][01])\/([12]\d{3})(?:\s+(?:(?:(0?[1-9]|1[0-2])):(0?\d|[1-5]\d)(?::(0?\d|[1-5]\d))?\s+[AaPp][Mm]|(?:(0?\d|1\d|2[0-3])):(0?\d|[1-5]\d)(?::(0?\d|[1-5]\d))?))?$/g);
                    if(!data[e].match(dateReg)){
                      errs.push({
                        row:i,
                        column:e,
                        message: `The field value does not match a valid DateTime format.`
                      })
                    }
                }
            break;
            case "comma":
              if(!_isEmpty(data[e])) {
                let spaceReg = new RegExp(/(\s,)|(,\s)/g);
                if(data[e].match(spaceReg)) {
                  errs.push({
                    row:i,
                    column:e,
                    message: `The field value should be comma seperated with no spaces between entries.`
                  })
                }

                if(fieldTest.items) {
                  if(fieldTest.items == 'integer') {
                    let commaIntReg = new RegExp(/(\d\s,)|(,\s\d)/g)
                    if(data[e].match(commaIntReg)) {
                      errs.push({
                        row:i,
                        column:e,
                        message: `The field value should be comma seperated integers with no spaces between entries.`
                      })
                    }
                  }
                }
              }
            break;
          }
        }
  
      });
  
      resolve(errs);

    });
  }

  convertChar(chars:any) {
    _forEach(chars, (c) => {
      return '&#'+c.charCodeAt(0)+';';
    })
  }

  decodeChar(chars:any) {
    console.log(chars);
    let char_array = _split(chars, ',');
    let outString = '';
    _forEach(char_array, (c)=>{
      let char = c.replace('&#','').replace(';','');
      outString += String.fromCharCode(Number(char));
    });
    return outString;
  }

  copyErrors() {
    let copyText = '';
    if(this.columnErrors.length > 0) {
      _forEach(this.columnErrors, (ce)=>{
        copyText += `column ${ce.column}:${ce.message}\r\n`;
      });
    }
    if(this.rowErrors.length > 0) {
      _forEach(this.rowErrors, (fe)=>{
        copyText += `row ${fe.row}: [${fe.column}] ${fe.message} ${fe.char? this.decodeChar(fe.char) : ''}\r\n`
      })
    }
    this.copyclip.copy(copyText);
  }

}
