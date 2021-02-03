import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDom from 'react-dom';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';

/*
1. Code Transplie and bundle in browser using EsBuild
2. Dyanamic package loading with versioning from NPM
3. In Browser Caching using indexDb to boost performance while loading packages
4. Load css modules from NPM
5. Run user's code safely using iframe
 - user code errors
 - user might change Dom node
 - handle malicious code

challenges:
solve conflicting css by using - unset !important;

*/

const App = () => {

  return <div>
    <TextEditor />
  </div>
}

ReactDom.render(<App />, document.querySelector('#root'))