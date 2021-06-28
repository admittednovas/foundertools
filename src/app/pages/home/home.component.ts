import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { faBolt, faCalculator, faCode, faCogs, faDatabase, faDivide, faExchangeAlt, faFileCsv, faCompress, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import { Tool, Tools } from './tool-list';

export const VolusionIcon:IconDefinition = {
  prefix:'fac',
  iconName:'volusion',
  icon: [
    605.348, 641.896, [], '', 'M363.444,0.06c59.462,0,118.925-0.027,178.389,0.009c53.102,0.031,83.36,52.49,56.807,98.484   c-97.979,169.702-195.954,339.404-293.983,509.076c-21.69,37.541-69.497,45.766-100.427,17.041   c-5.719-5.311-10.433-12.068-14.374-18.873C130.934,504.055,72.279,402.162,13.413,300.39   c-13.473-23.292-13.907-46.378-0.453-69.673C51.086,164.7,89.162,98.652,127.421,32.715C140.18,10.727,159.431-0.08,185.057,0   C244.519,0.188,303.982,0.06,363.444,0.06z M354.188,439.979c-28.368-4.463-42.236-23.477-54.528-45.32   c-27.462-48.812-55.886-97.084-83.703-145.701c-3.052-5.334-6.277-7.715-12.797-7.665c-43.814,0.337-87.631,0.127-131.448,0.195   c-23.818,0.036-34.508,17.944-22.762,38.327c58.835,102.098,117.729,204.165,176.687,306.189   c11.807,20.43,32.558,20.104,44.539-0.508c8.923-15.346,17.791-30.725,26.665-46.103   C315.641,506.818,334.428,474.232,354.188,439.979z M478.386,224.973c29.506-51.205,58.136-100.786,86.625-150.448   c4.143-7.221,3.505-14.681-0.628-21.891c-5.808-10.124-15.105-12.156-25.886-12.144c-116.511,0.123-233.021,0.06-349.531,0.09   c-25.75,0.007-36.05,17.532-23.298,39.69c21.691,37.692,43.642,75.238,65.127,113.047c3.3,5.807,6.835,7.973,13.585,7.938   c56.414-0.291,112.838,0.39,169.243-0.422C438.267,200.477,460.75,203.517,478.386,224.973z M259.999,241.468   c0.531,2.088,0.566,3.037,0.985,3.764c27.494,47.713,54.803,95.535,82.66,143.037c9.764,16.651,31.006,15.755,41.104-1.463   c21.202-36.156,42.166-72.454,62.923-108.866c10.101-17.713-0.849-36.142-21.373-36.427c-15.616-0.218-31.238-0.045-46.856-0.045   C339.953,241.466,300.467,241.468,259.999,241.468z M188,200.829c-18.753-32.464-36.64-63.43-55.282-95.699   c-18.782,32.595-36.658,63.616-55.146,95.699C115.025,200.829,150.457,200.829,188,200.829z'
  ]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filterTerm:string = '';
  activeTools:Tool[] = [];
  activeToolsCopy:Tool[] = [];

  constructor(private library:FaIconLibrary) {
    library.addIcons(faFileCsv, faDivide, faExchangeAlt, faCode, faCalculator, faFacebookF, faDatabase, faCogs,faBolt, faCompress, faNetworkWired, VolusionIcon, faHtml5)
  }

  ngOnInit(): void {
    this.activeTools = Object.assign([], Tools).filter((t:Tool)=>{
      return t.active === true;
    });
    this.activeToolsCopy = this.activeTools;
  }


  filterTools(term:string): void {
    this.filterTerm = term;
    this.activeToolsCopy = Object.assign([], this.activeTools).filter( (t:Tool) => {
      return t.type === term;
    })
  }

}
