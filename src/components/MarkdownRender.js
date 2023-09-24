import { useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { LuCopy, LuCopyCheck } from "react-icons/lu"
import { Prism } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export function MarkdownRender({ markdown }) {


  const Pre = ({ children }) => <pre>
    <CodeCopyBtn>{children}</CodeCopyBtn>
    {children}
  </pre>

  return (
    <div className="prose lg:prose">
      <ReactMarkdown
        className="markdown-editor"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          pre: Pre,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <Prism
                {...props}
                style={oneDark}
                language={match[1]}
                PreTag="div"
                showLineNumbers={true}
              >
                {String(children).replace(/\n$/, "")}
              </Prism>
            ) : (
              <div {...props} className={className}>
                {children}
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}


function CodeCopyBtn({ children }) {
  const [copyOk, setCopyOk] = useState(false);
  const handleClick = (e) => {
    navigator.clipboard.writeText(children[0].props.children[0]);
    console.log(children)
    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 1000);
  }
  return (
    <div className="absolute top-5 right-5">
      {copyOk ?
        <LuCopyCheck className="text-lg text-green-300" /> :
        <LuCopy className="text-lg" onClick={handleClick} />
      }
    </div>
  )
}