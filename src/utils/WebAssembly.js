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

function bufferToString (buffer) {
    const enc = new TextDecoder('utf-8');

    const arr = new Uint8Array(buffer);

    return enc.decode(arr);
}

const _fetchWasm = fetchWasm;
const _bufferToString = bufferToString;

export { _fetchWasm as fetchWasm,_bufferToString as  bufferToString};