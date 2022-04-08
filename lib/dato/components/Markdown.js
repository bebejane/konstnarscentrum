import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm'
import Link from "next/link";
import truncateMarkdown  from 'markdown-truncate'

const truncateSentance = (markdown, limit) => {
  if(!markdown || markdown.length < limit) return markdown

  if(limit && markdown.length > limit && markdown.substring(0, limit-1).indexOf('.') > -1)
    markdown = markdown.substring(0, markdown.substring(0, limit-1).lastIndexOf('.')+1);
  
  return markdown
}

const Markdown = ({ children, truncate, className}) => {
  if(!children) return null

  children = truncateSentance(children, truncate)
  children = !truncate ? children : truncateMarkdown(children, {limit:truncate, ellipsis:true})
  
  return (
    <ReactMarkdown 
      remarkPlugins={[gfm]} 
      children={children}
      className={className}
      components={{
        a: ({ node, ...props }) => 
        <Link prefetch={false} 
          href={props.href} 
          scroll={false}
        >
          <a>{props.children[0]}</a>
        </Link>
      }}
    />
  )
}

export default Markdown;

