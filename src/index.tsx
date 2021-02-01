import { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import * as esBuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { unpkgFetchPlugin } from './plugins/unpkg-fetch-plugin';


/*
1. Code Transplie and bundle in browser using EsBuild
2. Dyanamic package loading with versioning from NPM
3. In Browser Caching using indexDb to boost performance while loading packages
4. Load css modules from NPM
5. Run user's code safely using iframe
 - user code errors
 - user might change Dom node
 - handle malicious code


*/

const App = () => {
  const [input, setInput] = useState('');
  const ref = useRef<any>();
  const iframe = useRef<any>();

  useEffect(() => {
    startService();
  }, [])

  const startService = async () => {
    ref.current = await esBuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
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

    // setCode(bundle.outputFiles[0].text);

    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(bundle.outputFiles[0].text, '*');
  }

  const html = `
    <html>
      <head></head>
        <body>
          <div id="root"></div>
          <script>
            window.addEventListener('message', (event) => {
              try{
                eval(event.data);
              }catch(err){
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>'+ err + '</div>'
                console.error(err);
              }
            }, false)
          </script>
        </body>
    </html>
  `
  return <div>
    <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
    <div>
      <button onClick={onClick}>Submit</button>
    </div>

    <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
  </div>
}

ReactDom.render(<App />, document.querySelector('#root'))