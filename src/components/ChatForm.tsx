import { useEffect, useRef, useState } from "react";
import { bots, Bot } from "@/lib/bot";

interface ChatFormProps {

	onPrompt: (prompt: string) => void;

}

const PromptHints = (props:{
	onPromptSelect: (bot: Bot) => void,
	promptId: string,
}) => {
  const [selectIndex, setSelectIndex] = useState(0);
  const selectedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectIndex(0);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ( e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }
      // arrow up / down to select prompt
      const changeIndex = (delta: number) => {
        e.stopPropagation();
        e.preventDefault();
        const nextIndex = Math.max(
          0,
          Math.min(props.prompts.length - 1, selectIndex + delta),
        );
        setSelectIndex(nextIndex);
        selectedRef.current?.scrollIntoView({
          block: "center",
        });
      };

      if (e.key === "ArrowUp") {
        changeIndex(1);
      } else if (e.key === "ArrowDown") {
        changeIndex(-1);
      } else if (e.key === "Enter") {
        const selectedPrompt = props.prompts.at(selectIndex);
        if (selectedPrompt) {
          props.onPromptSelect(selectedPrompt);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectIndex]);

  return (
    <div className="">
      {bots.map((prompt, i) => (
        <div
          ref={i === selectIndex ? selectedRef : null}
          className={i === selectIndex ? "prompt-hint" : "prompt-hint-selected"}
          key={prompt.name + i.toString()}
          onClick={() => props.onPromptSelect(prompt)}
          onMouseEnter={() => setSelectIndex(i)}
        >
          <div className={"hint-title"}>{prompt.name}</div>
          <div className={"hint-content"}>{prompt.description}</div>
        </div>
      ))}
    </div>
  );
}

const ChatForm = (props: ChatFormProps) => {

	const [setshowSelection, setSetshowSelection] = useState(false)
	const [botId, setBotId] = useState<string>('NULL')
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
		if (inputRef.current) {
			inputRef.current.addEventListener("keydown", (e) => {
				if (e.key == '/') {
					setSetshowSelection(true)
				}
			})
			// if input value not start with '/'
			if(!inputRef.current.value.startsWith('/')){
				setSetshowSelection(false)
			}
		}
	}, [inputRef]);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		if (inputRef.current) {
			e.preventDefault();				
			const value = inputRef.current.value;
			inputRef.current.value = "";
			props.onPrompt(value);
		}
	};

	const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
	}

	const onPromptSelect = (prompt:Bot) => {
		setBotId(prompt.id)
		setSetshowSelection(false)
		inputRef.current?.focus()
	}

	return (
		<form onSubmit={handleFormSubmit} className="flex flex-col relative">
			{
				setshowSelection ? 
					<PromptHints 
						onPromptSelect={onPromptSelect} 
						promptId={botId}	
					/> : null
			}
			<input
				type="text"
				name="query"
				id="query"
				ref={inputRef}
				autoFocus={true}
				autoComplete="off"
				placeholder="What do you want from the database?"
				onKeyDown={handleKeyboardEvent}
				className="bg-slate-700 rounded-2xl resize-none border-0 shadow-md h-16 pr-16 placeholder-slate-400"
			></input>
			<button className="absolute right-1 top-1/2 -translate-y-1/2 p-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
					/>
				</svg>
			</button>
		</form>
	);
};

export default ChatForm;
