import '../css/code-editor.css';
import '../css/syntax.css';
import React, { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    // to fix jsx highlighting in monaco editor
    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );

    // to avoid console logs of invalid syntax errors on every key press
    highlighter.highLightOnDidChangeModelContent(
      () => { },
      () => { },
      undefined,
      () => { }
    );
  }

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();

    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  }

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small " onClick={onFormatClick}>Format</button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={onEditorDidMount}
        height="100%"
        language="javascript"
        theme="dark"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false }, // hide right preview scroll bar
          showUnused: false, // hide unused error highlighting 
          folding: false, // space to the right of line numbers
          lineNumbersMinChars: 3, // space to the left of line numbers
          fontSize: 16,
          scrollBeyondLastLine: false, // to avoid scrolling beyong last line
          automaticLayout: true // allow us to automatically layout our component
        }}
      />
    </div>
  )
}

export default CodeEditor;