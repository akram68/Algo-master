import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export default function CodeEditor({
  value,
  onChange,
  language = "c",
}: CodeEditorProps) {
  return (
    <Editor
      height="200px"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(val) => onChange(val || "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
        wordWrap: "on",
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
      }}
    />
  );
}
