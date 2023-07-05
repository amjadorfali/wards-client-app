import React from 'react';
import DemoBlock from './DemoBlock';

const DemoBashBlock: React.FC = () => {
	return <DemoBlock fileUrl="/docs/demo-bash.md" syntaxHighlighterProps={{ language: 'bash' }} />;
};
export default DemoBashBlock;
