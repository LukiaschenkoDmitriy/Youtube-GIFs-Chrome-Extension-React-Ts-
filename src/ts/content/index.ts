import TabsWrapper from '@Content/components/wrapper/TabsWrapper';
import Observer from '@Content/observer';
import { DocumentService } from '@Content/service/DocumentService';
import './index.scss';

const observer = new Observer();

observer.addCallback('videoComments', {
	target: (dc: Document) => dc.querySelector('ytd-comments'),
	callback: (mutation: MutationRecord[], target: HTMLElement) => {
		DocumentService.createAndInsertReactComponentBefore('div', 'gc-tabs', target, TabsWrapper);
	},
	interruptExpression: (dc: Document) => !!dc.getElementById('gc-tabs'),
});

observer.addCallback('shortComments', {
	target: (dc: Document) => dc.querySelector('ytd-engagement-panel-section-list-renderer[match-content-theme="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"]'),
	callback: (mutation: MutationRecord[], target: HTMLElement) => {
		DocumentService.createAndInsertReactComponentBefore('div', 'gc-tabs', target, TabsWrapper);
	},
	interruptExpression: (dc: Document) => !!dc.getElementById('gc-tabs'),
});

observer.observe(document.body, { childList: true, subtree: true });
