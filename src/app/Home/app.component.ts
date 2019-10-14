import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { fetchWasm, bufferToString } from '../../utils/WebAssembly';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'webpack-example';

  ngOnInit() {

    console.log(environment.api);

    const importObject = {/* imports: { consolelog: arg => console.log(arg) }*/ };
    fetchWasm('./hello_wasm_bg.wasm', importObject).then(m => {
       console.log(m.add(5, 10)); // 15
       m.say();
       console.log(bufferToString(m.memory.buffer));
    });

  }

}
