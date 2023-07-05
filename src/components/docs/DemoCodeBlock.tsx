import React from 'react';
import DemoBlock from './DemoBlock';

const DemoCodeBlock: React.FC = () => {
	return <DemoBlock fileUrl="/docs/demo-code.md" syntaxHighlighterProps={{ language: 'js' }} />;
};
export default DemoCodeBlock;
