import Observer from '@Content/observer';
import Tabs from '@Content/components/Tabs';
import { DocumentService } from '@Content/service/DocumentService';
import './index.scss';

const observer = new Observer();

observer.addCallback('comments', {
	target: (dc: Document) => dc.querySelector('ytd-comments'),
	callback: (mutation: MutationRecord[], target: HTMLElement) => {
		DocumentService.createAndInsertReactComponentBefore('div', 'gc-tabs', target, Tabs);
	},
	interruptExpression: (dc: Document) => !!dc.getElementById('gc-tabs'),
});

observer.observe(document.body, { childList: true, subtree: true });
