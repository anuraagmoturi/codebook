import '../css/code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from "../state";
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-type-selector';
interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundles }) => bundles[cell.id]);

  const content = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';

        const show = (value) => {
          const root = document.querySelector('#root');
          if(typeof value === 'object'){
            if(value.$$typeof && value.props)
              _ReactDOM.render(value, root);
            else
              root.innerHTML = JSON.stringify(value, null, 2);
          }else
            root.innerHTML = value;
        }

        ${cell.content}
      `;


  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, content);
    }, 750);

    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, content, createBundle]);

  const onChange = (value: string) => {
    updateCell(cell.id, value);
  }

  return <Resizable direction={'vertical'}>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
      <Resizable direction={'horizontal'}>
        <CodeEditor
          initialValue={cell.content}
          onChange={onChange}
        />
      </Resizable>
      <div className="progress-wrapper">
        {
          !bundle || bundle.loading
            ?
            <div className="progress-cover">
              <progress className="progress is-small is-primary">
                Loading
            </progress>
            </div>

            : <Preview code={bundle.code} error={bundle.error} />
        }
      </div>
    </div>
  </Resizable>

}

export default CodeCell;