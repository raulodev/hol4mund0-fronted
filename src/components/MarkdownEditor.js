import { useState, useEffect } from "react";
import { MarkdownRender } from "./MarkdownRender";
import { TextArea } from "./TextareaAutosize";
import { BsTypeBold, BsTypeItalic, BsLink45Deg, BsCode } from "react-icons/bs";

export function Editor({ show, onChangeContent, initialContent }) {
  const [markdown, setMarkDown] = useState(
    `### Ejemplos de como usar markdown para crear tu publicación

#### Tabla

| Escribir así | O de esta forma|
| ---------    | ---------------|
| *Italic*     | _Italic_       |
| **Bold**     | __Bold__       |

#### Lista sin ordenar

* Elemento uno
* Elemento dos
* Elemento tres

#### Lista ordenada

1. One
2. Two
3. Three

> Bloque de comillas

#### Resaltado de código

  \`\`\`js
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
)
\`\`\`

~~Texto subrayado~~

* [ ] tarea 1
* [x] tarea 2 cumplida

<blockquote>
  👆 También puedes usar html
</blockquote>

`);
  const [selectedText, setSelectedText] = useState({ startIndex: 0, endIndex: 0, text: "" });

  useEffect(() => {
    if (initialContent) {
      setMarkDown(initialContent)
    }
  }, [initialContent])

  const handleSelect = (e) => {
    const startIndex = e.target.selectionStart;
    const endIndex = e.target.selectionEnd;
    const text = e.target.value.substring(startIndex, endIndex);
    if (text != "") {
      setSelectedText({ startIndex: startIndex, endIndex: endIndex, text: text });
    }
  };

  const addBold = () => {
    if (markdown != undefined) {
      const newMarkdown =
        markdown.substring(0, selectedText.startIndex) +
        "**" +
        selectedText.text +
        "**" +
        markdown.substring(selectedText.endIndex);
      setMarkDown(newMarkdown);
      onChangeContent(newMarkdown);
    }
  }

  const addItalic = () => {
    if (markdown != undefined) {
      const newMarkdown =
        markdown.substring(0, selectedText.startIndex) +
        "_" +
        selectedText.text +
        "_" +
        markdown.substring(selectedText.endIndex);
      setMarkDown(newMarkdown);
      onChangeContent(newMarkdown);
    }
  }

  const addLink = () => {
    if (markdown != undefined) {
      const newMarkdown =
        markdown.substring(0, selectedText.startIndex) +
        "[" +
        selectedText.text +
        "](url)" +
        markdown.substring(selectedText.endIndex);
      setMarkDown(newMarkdown);
      onChangeContent(newMarkdown);
    }
  }
  const addCodeBlock = () => {
    if (markdown != undefined) {
      const newMarkdown =
        markdown.substring(0, selectedText.startIndex) +
        "```\n" +
        selectedText.text +
        "\n```" +
        markdown.substring(selectedText.endIndex);
      setMarkDown(newMarkdown);
      onChangeContent(newMarkdown);
    }
  }

  const addCode = () => {
    if (markdown != undefined) {
      const newMarkdown =
        markdown.substring(0, selectedText.startIndex) +
        "`" +
        selectedText.text +
        "`" +
        markdown.substring(selectedText.endIndex);
      setMarkDown(newMarkdown);
      onChangeContent(newMarkdown);
    }
  }
  const addKbd = () => {
    if (markdown != undefined) {
      const newMarkdown =
        markdown.substring(0, selectedText.startIndex) +
        "<kbd>" +
        selectedText.text +
        "</kbd>" +
        markdown.substring(selectedText.endIndex);
      setMarkDown(newMarkdown);
      onChangeContent(newMarkdown);
    }
  }

  const handlerContent = (event) => {
    const mkd = event.target.value;
    setMarkDown(mkd);
    onChangeContent(mkd);
  };

  return (
    <div className="w-full px-2"
    >

      <TextArea
        value={markdown}
        onChange={handlerContent}
        onSelect={handleSelect}
        onDoubleClick={handleSelect}
        className={
          show
            ? "hidden"
            : "w-full text-base md:text-lg font-mono outline-none break-words overflow-y-hidden resize-none"
        }
      />


      {show && <MarkdownRender markdown={markdown} />}


      <div
        className={show ? "hidden" : "hidden fixed gap-1 left-0 right-0 lg:flex justify-center bottom-5"}
      >
        <div className="tooltip tooltip-top" data-tip="negrita">
          <button onClick={addBold} className="shadow-xl btn btn-sm btn-neutral">
            <BsTypeBold className="text-2xl" />
          </button>
        </div>
        <div className="tooltip tooltip-top" data-tip="italic">
          <button onClick={addItalic} className="shadow-xl btn btn-sm btn-neutral">
            <BsTypeItalic className="text-2xl" />
          </button>
        </div>
        <div className="tooltip tooltip-top" data-tip="enlace">

          <button onClick={addLink} className="shadow-xl btn btn-sm btn-neutral">
            <BsLink45Deg className="text-2xl" />
          </button>
        </div>
        <div className="tooltip tooltip-top" data-tip="bloque código">

          <button onClick={addCodeBlock} className="shadow-xl btn btn-sm btn-neutral">
            <BsCode className="text-2xl" />
          </button>
        </div>
        <div className="tooltip tooltip-top" data-tip="código">
          <button onClick={addCode} className="shadow-xl btn btn-sm btn-neutral font-mono w-10 text-lg">
            M
          </button>
        </div>
        <div className="tooltip tooltip-top" data-tip="Kbd">
          <button onClick={addKbd} className="shadow-xl btn btn-sm btn-neutral font-mono w-10 text-lg">
            Kb
          </button>
        </div>
      </div>
    </div>
  );
}
