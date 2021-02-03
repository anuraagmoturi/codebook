import * as esBuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { unpkgFetchPlugin } from './plugins/unpkg-fetch-plugin';

let service: esBuild.Service;

const bundler = async (rawCode: string) => {
  if (!service) {
    service = await esBuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  }

  //   Transpile 
  // const result = await ref.current.transform(bundle, {
  //   loader: 'jsx',
  //   target: 'es2015'
  // });


  try {
    const bundledCode = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), unpkgFetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });

    return {
      code: bundledCode.outputFiles[0].text,
      error: ''
    };
  } catch (error) {
    return {
      code: '',
      error: error.message
    }
  }
}

export default bundler