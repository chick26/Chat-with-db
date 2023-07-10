import DataTable from "./DataTable";
import ReactMarkdown from "react-markdown"
import mermaid from "mermaid";
import { useEffect } from "react";

interface ChatPanelProps {
	data?: any;
	from: 'chat' | 'json' | 'mermaid' | undefined
}

const ChatPanel = ({data, from}: ChatPanelProps) => {

  useEffect(() => {
    if (from === 'mermaid') {
      mermaid.initialize({ 
        startOnLoad: true 
      });
      mermaid.init(
        {
          theme: 'dark'
        }
      )
    }
  }, [from, data])

  switch(from) {
    case "chat":
      return (
        <DataTable data={data} />
      )
    case "json":
      return (
        <div className="m-10">
          <div className="prose dark:prose-invert max-w-full">
            <ReactMarkdown>
              {data}
            </ReactMarkdown>
          </div>
        </div>
      )
    case "mermaid":
        return (
          <div className="m-10">
            <div className="prose dark:prose-invert max-w-full">
              <pre className="mermaid" id="graphDiv" >
                {data}
              </pre>
            </div>
          </div>
        )
    default:
      return (
        <></>
      )
  }

};

export default ChatPanel;
