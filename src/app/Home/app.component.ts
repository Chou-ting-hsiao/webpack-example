import { Component,OnInit } from '@angular/core';
// import * as wasm from 'wasm-game-of-life';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements  OnInit {
  title = 'webpack-example';

  ngOnInit() {
   
    // console.log(wasm.get_number());
    console.log(environment.api);

  }
  
}
