import DataTable from "./DataTable";
import { MdEditor, MdPreview } from "md-editor-rt"
import ReactMarkdown from "react-markdown"

interface ChatPanelProps {
	data?: any;
	from: 'chat' | 'json' | undefined
}


const ChatPanel = ({data, from}: ChatPanelProps) => {

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
    default:
      return (
        <></>
      )
  }

};

export default ChatPanel;
