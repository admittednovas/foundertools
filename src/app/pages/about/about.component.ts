import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPaperPlane, faUser, faAt } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface contactResponse {
  next:string,
  ok:boolean
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent  {
  faPaperPlane = faPaperPlane;
  faUser = faUser;
  faAt = faAt;

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    emailaddress: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
    recaptcha: new FormControl(null, Validators.required)
  });

  constructor(private meta:Meta, private title:Title, private http: HttpClient, private snackbar: MatSnackBar) {
    this.title.setTitle('About | FounderTools: Tools for Volusion Founders');
    this.meta.updateTag({name:'description', content:'Learn about FounderTools, its creation and creator, and how it can enhance your Volusion experience'})
  }

  submitForm():void {
    console.log(this.contactForm.value);
    this.http.post<contactResponse>('https://formspree.io/f/mayaobkl', this.contactForm.value).subscribe(
      (response:contactResponse) => {
        if(response.ok) {
          this.snackbar.open('Message Sent')
        }
      },
      (error) => console.log(`ERROR: ${error}`)
    )
  }


}
