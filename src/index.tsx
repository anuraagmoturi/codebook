import { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import * as esBuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { unpkgFetchPlugin } from './plugins/unpkg-fetch-plugin';


/*
1. Code Transplie and bundle in browser using EsBuild
  Execute code provided in string format safely

2. Dyanamic package loading with versioning from NPM
3. In Browser Caching using indexDb to boost performance while loading packages
4. Load css modules from NPM


*/

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();

  useEffect(() => {
    startService();
  }, [])

  const startService = async () => {
    ref.current = await esBuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });
  }

  const onClick = async () => {
    if (!ref.current)
      return;

    const bundle = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), unpkgFetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });

    //   Transpile 
    // const result = await ref.current.transform(bundle, {
    //   loader: 'jsx',
    //   target: 'es2015'
    // });

    setCode(bundle.outputFiles[0].text);
  }
  return <div>
    <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>
    <pre>{code}</pre>
  </div>
}

ReactDom.render(<App />, document.querySelector('#root'))