import React from 'react';
import { AutoComplete, Input, Form, Button } from 'antd';

const renderTitle = (title: string) => (
  <span>
    {title}
  </span>
);

const renderItem = (title: string, label: string) => ({
  value: title + '/',
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
];

const AutoForm: React.FC = () => (
  <>
    <Form
      name="basic"
      className="flex flex-col relative h-16 my-form"
      initialValues={{ remember: true }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      >
      <Form.Item
        className='mb-0 h-16'
        >
        <AutoComplete
          className='h-16 selection:mb-0 bg-slate-700 rounded-2xl resize-none border-0 shadow-md pr-16 placeholder-slate-400'
          options={options}
          backfill={true}
        />
      </Form.Item>
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
    </Form>
  </>
);

export default AutoForm;
