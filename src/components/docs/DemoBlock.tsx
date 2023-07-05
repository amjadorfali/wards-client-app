import React, { useEffect, useState } from 'react';
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import CodeCopyBtn from './CodeCopyBtn';
import atomDark from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
type SyntaxHighlighterProps = React.ComponentProps<typeof SyntaxHighlighter>;

interface DemoBlockProps {
	fileUrl: string;
	syntaxHighlighterProps: Partial<SyntaxHighlighterProps>;
}
const DemoBlock: React.FC<DemoBlockProps> = ({ fileUrl, syntaxHighlighterProps }) => {
	const [content, setContent] = useState('');
	useEffect(() => {
		fetch(fileUrl).then((res) => {
			res.text().then((res) => setContent(res));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					<SyntaxHighlighter {...props} children={String(children).replace(/\n$/, '')} style={atomDark} {...syntaxHighlighterProps} />
				)
			}}
		/>
	);
};
export default DemoBlock;
