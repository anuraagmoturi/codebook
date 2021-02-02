import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import EsBuild from '../bundler';
import Resizable from './resizable';

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

const CodeCell: React.FC = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const bundle = await EsBuild(input);
    setCode(bundle);
  }

  return <Resizable direction={'vertical'}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
      <Resizable direction={'horizontal'}>
        <CodeEditor
          initialValue="console.log('hi there');"
          onChange={(value) => setInput(value)}
        />
      </Resizable>


      {/* <div>
        <button onClick={onClick}>Submit</button>
      </div> */}

      <Preview code={code} />
    </div>
  </Resizable>

}

export default CodeCell;