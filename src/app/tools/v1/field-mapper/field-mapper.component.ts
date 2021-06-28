import { Component } from '@angular/core';
import { CheckbreakpointService } from '../../../services/checkbreakpoint.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { FieldDef, AllTableDefs } from '../models/all-tables';
import { Papa, ParseConfig, ParseResult } from 'ngx-papaparse';
import { saveAs } from 'file-saver';
import { keys as _keys, forEach as _forEach, includes as _includes, filter as _filter} from 'lodash';
import { faFileUpload, faPlay, faTable, faChevronDown, faAngleDoubleRight, faTrashAlt, faCog, faSpinner,faSlidersH,faTimes } from '@fortawesome/free-solid-svg-icons';
import { Meta, Title } from '@angular/platform-browser'

@Component({
  selector: 'app-field-mapper',
  templateUrl: './field-mapper.component.html',
  styleUrls: ['./field-mapper.component.scss']
})
export class FieldMapperComponent {
  faFileUpload = faFileUpload;
  faPlay = faPlay;
  faTable = faTable;
  faChevronDown = faChevronDown;
  faAngleDoubleRight = faAngleDoubleRight;
  faTrashAlt = faTrashAlt;
  faCog = faCog;
  faSpinner = faSpinner;
  faSlidersH = faSlidersH;
  faTimes = faTimes;
  
  isOpen:boolean = false;

  headerForm = new FormGroup({
    destinationTable: new FormControl('Products', Validators.required),
    csvfile: new FormControl(null, Validators.required)
  });

  mapperForm:FormGroup = this.fb.group({
    maprow:this.fb.array([])
  })

  allTables:string[] = ["ArticleCategories","Articles","Categories","Customers","Discounts","Discounts_ApplyTo","GiftCardDetails","GiftCards","KitLnks","Kits","Options","OptionCategories","PageText","Payment_Log","PO_Items","POs","Product_Keys","Products","Recurring","Reviews","ReviewsHelpful","RMA_Items","RMAs","States_Provinces","TrackingNumbers","Tax","Vendors","VendorRules"]

  csv:any;
  ready:boolean = false;
  complete:boolean = false;
  generatingDL:boolean = false;

  tableFields:string[] = [];
  originalData:[] = [];
  deleteItems:string[] = [];
  errors:string[] = [];

  constructor(private bpo:CheckbreakpointService, private papa:Papa, private fb: FormBuilder, private meta:Meta, private title:Title) {
    this.bpo.screensSizeObserver.subscribe( (res:boolean) => {
      this.isOpen = res;
    });
    this.title.setTitle('Field Mapper | FounderTools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'Quickly convert a third party provided CSV file to a Volusion import file by mapping the csv columns to Volusion fields.'})
  }


  fileUpload(e:any): void {
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

  get maprows():FormArray {
    return this.mapperForm.get('maprow') as FormArray
  }

  startTool():void {
    this.ready = true;
    let indx:number = 1;
    let tableDef:FieldDef = AllTableDefs[this.headerForm.value.destinationTable.toLowerCase()];
    this.tableFields = _keys(tableDef);

    const options:ParseConfig = {
      header: true,
      skipEmptyLines:true,
      transformHeader:(header) => {

        let group = this.fb.group({
          thirdparty: header,
          volusion: ['', Validators.required]
        });
        let maparray = this.mapperForm.get('maprow') as FormArray
        maparray.push(group);

        return header
      },
      step:(results:ParseResult) => {
        // @ts-ignore: Object is possibly 'null'.
        this.originalData.push(results.data);
      },
      complete:() =>{
        this.complete = true;
      }
    }
    this.papa.parse(this.csv, options);
  }

  deleteRow(indx:number, entry:any):void {
    this.deleteItems.push(entry);
    let maparray = this.mapperForm.get('maprow') as FormArray;
    maparray.removeAt(indx);
  }

  mapFields(): void {

    // @ts-ignore
    let dupeVals = this.mapperForm.value.maprow.map( (e:any) => e['volusion']).map( (e, i, fin) => fin.indexOf(e) !== i && i).filter((obj:any) => this.mapperForm.value.maprow[obj]).map((e:any) => this.mapperForm.value.maprow[e]['volusion']);

    if(dupeVals.length > 0) {
      this.errors = Object.assign([], dupeVals);
      window.scroll(0,0);
    } else {
      let cleanedArr = this.originalData.map((t)=>{
        _forEach(this.deleteItems, (d) =>{
          delete t[d];
        });
        return t
      });
      
      let updatedArr = cleanedArr.map((r)=> {
        _forEach(this.mapperForm.value.maprow, (n)=>{
          r[n.volusion] = r[n.thirdparty];
          delete r[n.thirdparty]
        });
        return r;
      });

      let csvOut = new Blob([this.papa.unparse(updatedArr)], {type:"text/plain;charset=utf-8"} );
      saveAs(csvOut, `MappedCSV-${new Date().getUTCMilliseconds()}.csv`);
      this.generatingDL = false;
      
    }

  }

}
