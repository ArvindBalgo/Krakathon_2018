import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  val:number;
  initVal:number = -1;
  randomVal:number = Math.floor(Math.random() * 101);
  max: number;
  min:number;
  computeNum: number = -1;
  result:string = '';
  prevMin = 0;
  prevMax = 0;

  compare() {
    if(this.val > this.randomVal){
      console.log('Smaller')
    }
    else if(this.val < this.randomVal) {
      console.log('Bigger');
    }
    else {
      console.log('You win');
    }
  }


  computerCheck(flag) {
    if(this.computeNum == -1) {
      this.computeNum = Math.ceil(Math.floor(Math.random() * 5001)/2);
      this.prevMax = this.computeNum;
      this.prevMin = 0;
      this.max =  5000;
      this.min = 0;
    }
    if(flag == 'BIGGER') {

      this.min = this.computeNum;
      this.computeNum = Math.ceil(((this.max - this.min) + this.min )/2);
      console.log('bigger', this.min, this.max)
    }
    if(flag == 'SMALLER') {

      this.max = this.computeNum;
      this.computeNum =  Math.ceil((this.max - this.min)/2);
      console.log('smaller', this.min, this.max)
    }
    if(flag == 'EQUALS') {
      this.result = 'Computer wins';
    }
  }
}
