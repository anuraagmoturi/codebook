import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import '../css/text-editor.css';

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Header');

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
        <MDEditor value={value} onChange={(v) => setValue(v || '')} />
      </div>
      : <div className="text-editor card" onClick={() => setEditing(true)}>
        <div className="card-content">
          <MDEditor.Markdown source={value} />
        </div>
      </div>
    }

  </div>
}

export default TextEditor;