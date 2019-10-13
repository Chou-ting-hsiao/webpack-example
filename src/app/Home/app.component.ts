import { Component,OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements  OnInit {
  title = 'webpack-example';

  ngOnInit() {
   
    console.log(environment.api);

    // var importObject = { imports: { consolelog: arg => console.log(arg) } };

    fetch('./hello_wasm_bg.wasm').then(response =>
      response.arrayBuffer()
    ).then(bytes =>
      WebAssembly.instantiate(bytes, {})
    ).then(results => {
      console.log(results.instance.exports.get_number());
    });

  }
  
}
