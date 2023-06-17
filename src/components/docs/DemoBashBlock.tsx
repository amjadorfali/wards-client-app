import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import CodeCopyBtn from './CodeCopyBtn';

/** //TODO Refactor into one component */
const DemoBashBlock: React.FC = () => {
	const [content, setContent] = useState('');
	useEffect(() => {
		fetch('/docs/demo-bash.md').then((res) => {
			res.text().then((res) => setContent(res));
		});
	}, []);

	return (
		<ReactMarkdown
			children={content}
			components={{
				code: ({ children, ...props }) => (
					<SyntaxHighlighter
						{...props}
						children={String(children).replace(/\n$/, '')}
						style={atomDark}
						language={'bash'}
						PreTag="div"
					/>
				),
				pre: ({ children, ...props }) => (
					<pre {...props}>
						<CodeCopyBtn children={children} />
						{children}
					</pre>
				)
			}}
		/>
	);
};
export default DemoBashBlock;
