import { ReactNode } from "react"
import { Heading, ParagraphText, ListItem, Anchor } from "../../components"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

export const markdownComponents = {
  h1: (props: { children: ReactNode }) => (
    <Heading level={2}>{props.children}</Heading>
  ),
  h2: (props: { children: ReactNode }) => (
    <Heading level={3}>{props.children}</Heading>
  ),
  h3: (props: { children: ReactNode }) => (
    <Heading level={4}>{props.children}</Heading>
  ),
  p: ParagraphText,
  li: ListItem,
  a: Anchor,

  code: ({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean
    className?: string
    children: ReactNode
  }) => {
    const match = /language-(?:\w+)/u.exec(className ?? "")
    return !inline && match ? (
      <SyntaxHighlighter
        {...props}
        // style={dark}
        language={match[1]}
        PreTag="div"
      >
        {String(children).replace(/\n$/u, "")}
      </SyntaxHighlighter>
    ) : (
      <code {...props} className={className}>
        {children}
      </code>
    )
  },
}
