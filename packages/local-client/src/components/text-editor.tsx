import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import '../css/text-editor.css';
import { Cell } from "../state";
import { useActions } from '../hooks/use-actions';
interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (editorRef.current && event.target && editorRef.current.contains(event.target as Node))
        return;
      setEditing(false);
    }
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    }
  }, []);
  return <div>
    {editing ?
      <div className="text-editor" ref={editorRef}>
        <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || '')} />
      </div>
      : <div className="text-editor card" onClick={() => setEditing(true)}>
        <div className="card-content">
          <MDEditor.Markdown source={cell.content || 'Click to edit'} />
        </div>
      </div>
    }

  </div>
}

export default TextEditor;