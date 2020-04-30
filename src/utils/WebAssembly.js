'use strict';

function fetchWasm (url, imports) {
    return fetch(url) // url could be your .wasm file
    .then(res => {
    if (res.ok)
        return res.arrayBuffer();
    throw new Error(`Unable to fetch Web Assembly file ${url}.`);
    })
    .then(bytes => WebAssembly.compile(bytes))
    .then(module => WebAssembly.instantiate(module, imports || {}))
    .then(instance => instance.exports);
}

function bufferToString (buffer,offset,len) {

    const arr = new Uint8Array(buffer, offset);

    let string ="";
    let char="";

    for(let i=0;i<=arr.length;i++){
        console.log(arr[i]);

        if(arr[i]===0){
            break;
        }
        char=String.fromCharCode(arr[i]);
        string+=char;
    }

    return string;
}

export { fetchWasm, bufferToString};

// const importObject = {
//     imports: { consolelog: arg => console.log(arg) }
// };

// fetchWasm('./pkg/hello_wasm_bg.wasm', importObject).then(m => {
//     console.log(m.add(5, 10)); // 15
//     const offet = m.say();
//     console.log(bufferToString(m.memory.buffer, offet, 6));
// });
