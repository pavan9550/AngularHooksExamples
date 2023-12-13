import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularHooksExamples';
  message:string = "";
  toDestroy:boolean=false;

  constructor(){
    //console.log("AppComponent Constructor Called!!!");
  }
  onBtnClick(inputMessage:HTMLInputElement){
    this.message =inputMessage.value;
  
  }
  destroyComponent(){
    this.toDestroy = !this.toDestroy;
  }

}
