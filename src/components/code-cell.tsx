import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import EsBuild from '../bundler';
import Resizable from './resizable';
import { Cell } from "../state";
import { useActions } from '../hooks/use-actions';
interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    let timer = setTimeout(async () => {
      const bundle = await EsBuild(cell.content);
      setCode(bundle.code);
      setError(bundle.error);
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [cell.content]);

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


      <Preview code={code} error={error} />
    </div>
  </Resizable>

}

export default CodeCell;