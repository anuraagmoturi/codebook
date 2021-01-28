import { useEffect, useState, useRef } from 'react';
import ReactDom from 'react-dom';
import * as esBuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

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
      plugins: [unpkgPathPlugin()],
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