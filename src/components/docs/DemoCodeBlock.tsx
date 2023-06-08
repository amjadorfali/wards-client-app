import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeCopyBtn from './CodeCopyBtn';

/** //TODO Refactor into one component */
const DemoCodeBlock: React.FC = () => {
	const [content, setContent] = useState('');
	useEffect(() => {
		fetch('/docs/demo-code.md').then((res) => {
			res.text().then((res) => setContent(res));
		});
	}, []);

	return (
		<ReactMarkdown
			children={content}
			components={{
				pre: ({ children, ...props }) => (
					<pre {...props}>
						<CodeCopyBtn children={children} />
						{children}
					</pre>
				),
				code: ({ children, ...props }) => (
					<SyntaxHighlighter {...props} children={String(children).replace(/\n$/, '')} style={atomDark} language={'js'} PreTag="div" />
				)
			}}
		/>
	);
};
export default DemoCodeBlock;
