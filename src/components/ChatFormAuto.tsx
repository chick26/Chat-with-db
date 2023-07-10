import React, {useState} from 'react';
import { AutoComplete, Input, Form, message } from 'antd';

export type Prompt = {
  type: 'json' | 'mermaid' | 'chat',
  prompt: string,
}

interface ChatFormAutoProps {
  onPrompt: (prompt:Prompt) => void
}

const renderTitle = (title: string) => (
  <span>
    {title}
  </span>
);

const renderItem = (title: string, label: string) => ({
  value: label.includes('example') ? title : title + '/',
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {title}
      <span>
        {label}
      </span>
    </div>
  ),
});

const options = [
  {
    label: renderTitle('Cable Fault'),
    options: [
      renderItem('Chat to database', 'ct_pop_fault'), 
    ],
  },
  {
    label: renderTitle('Circuit Scheme'),
    options: [
      renderItem('Visualization', 'mermaid'),
      renderItem('Chat to API', 'json')
    ],
  },
  {
    label: renderTitle('Example'),
    options: [
      renderItem('Chat to database/help me to find the latest record of ct fault', 'ct_pop_example'),
      renderItem('Visualization/请告诉我从法兰克福到新加坡的传输路由方案，要求速率500M', 'mermaid_example'), 
    ],
  }
    
  
];

const AutoForm: React.FC<ChatFormAutoProps> = ({ onPrompt }) => {

  const [prompt, setPrompt] = useState('')

  const onFinish = (values: any) => {
    if (values.prompt.indexOf('/') == -1) {
      message.warning({ content: 'Please select one command'});
    }
    switch (values.prompt.split('/')[0]) {
      case 'Chat to database':
        onPrompt({
          type: 'chat',
          prompt: values.prompt.split('/')[1]
        })
        break;
      case 'Visualization':
        onPrompt({
          type: 'mermaid',
          prompt: values.prompt.split('/')[1]
        })
        break;
      case 'Chat to API':
        onPrompt({
          type: 'json',
          prompt: values.prompt.split('/')[1]
        })
        break;
      default:
        break;
    }
  };
  

  return (
    <div className="my-form">
      <Form
        name="basic"
        className="flex flex-col relative h-16"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
          className='mb-0 h-16'
          name="prompt"
          >
          <AutoComplete
            placeholder="Type here"
            className='h-16 selection:mb-0 bg-slate-700 rounded-2xl resize-none border-0 shadow-md pr-16 placeholder-slate-400 '
            options={options}
            value={prompt}
            onChange={e => setPrompt(e)}
            backfill={true}
          />
        </Form.Item>
        <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-700 border-none">
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
      </Form>
    </div>

  )
}

export default AutoForm;
