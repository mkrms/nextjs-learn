"use client";
import Editor from "@monaco-editor/react";
import { ReactNode, useState } from "react";

type Props = {
  language: string;
  children: ReactNode;
  fileName?: string;
  minHeight?: number;
  maxHeight?: number;
};

// インデントを正規化する関数
const normalizeIndent = (code: string): string => {
  const lines = code.split("\n");

  // 空行を除いた最初と最後の行を削除（テンプレートリテラルの改行対応）
  while (lines.length && lines[0].trim() === "") lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

  if (lines.length === 0) return "";

  // 最小インデントを計算
  const minIndent = Math.min(
    ...lines
      .filter((line) => line.trim() !== "")
      .map((line) => line.match(/^ */)?.[0].length || 0)
  );

  // 最小インデントを削除
  return lines.map((line) => line.slice(minIndent)).join("\n");
};

// 行数に基づいて高さを計算
const calculateHeight = (
  code: string,
  minHeight: number = 100,
  maxHeight: number = 400
): number => {
  const lines = code.split("\n").length;
  const lineHeight = 19; // Monaco Editorの標準行高
  const padding = 32; // 上下のパディング
  const calculatedHeight = lines * lineHeight + padding;

  return Math.min(Math.max(calculatedHeight, minHeight), maxHeight);
};

export const CodeDisplay = (props: Props) => {
  const [copied, setCopied] = useState(false);

  const rawCode =
    typeof props.children === "string"
      ? props.children
      : String(props.children);

  const code = normalizeIndent(rawCode);
  const height = calculateHeight(code, props.minHeight, props.maxHeight);

  // JSX対応のための言語マッピング
  const getLanguageForEditor = (language: string): string => {
    switch (language.toLowerCase()) {
      case "jsx":
        return "javascript";
      case "tsx":
        return "typescript";
      default:
        return language;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("コピーに失敗しました:", error);
      // フォールバック: 古いブラウザ対応
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-3 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      {/* ヘッダー部分（ファイル名とコピーボタン） */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          {props.fileName ? (
            <>
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                {props.fileName}
              </span>
            </>
          ) : (
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
              {props.language}
            </span>
          )}
        </div>

        <button
          onClick={copyToClipboard}
          className={`
            px-3 py-1 text-xs font-medium rounded transition-all duration-200
            ${
              copied
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }
          `}
          disabled={copied}
        >
          {copied ? (
            <span className="flex items-center space-x-1">
              <span>✓</span>
              <span>コピー済み</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1">
              <span>コピー</span>
            </span>
          )}
        </button>
      </div>

      {/* エディター部分 */}
      <div style={{ height: `${height}px` }}>
        <Editor
          height="100%"
          language={getLanguageForEditor(props.language)}
          value={code}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: "on",
            folding: true,
            renderWhitespace: "selection",
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 10 },
            scrollbar: {
              vertical: "auto",
              horizontal: "auto",
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
          }}
        />
      </div>
    </div>
  );
};
