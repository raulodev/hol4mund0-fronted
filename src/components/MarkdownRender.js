import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export function MarkdownRender({ markdown }) {
  return (
    <div className="prose lg:prose">
      <ReactMarkdown
        className="markdown-editor"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
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
