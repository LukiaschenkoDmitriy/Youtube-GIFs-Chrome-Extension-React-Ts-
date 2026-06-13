import TabsWrapper from '@Content/components/wrapper/TabsWrapper';
import Observer from '@Content/observer';
import { DocumentService, ReactMount } from '@Content/service/DocumentService';
import './index.scss';

const observer = new Observer();

observer.addCallback('videoComments', {
	target: (dc: Document) => dc.querySelector('ytd-comments'),
	callback: (mutation: MutationRecord[], target: HTMLElement) => {
		DocumentService.createAndInsertReactComponentBefore('div', 'gc-tabs', target, TabsWrapper, { type: "videos" });
	},
	interruptExpression: (dc: Document) => !!dc.getElementById('gc-tabs'),
});

// Shorts preload several ytd-reel-video-renderer elements; the visible one is marked
// with `is-active`, and its comment panel toggles the `visibility` attribute instead
// of being added/removed from the DOM.
const SHORTS_PANEL_SELECTOR =
	'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-comments-section"]' + '[visibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"]';

let shortsMount: ReactMount | null = null;

observer.addCallback('shortsComments', {
	recurring: true,
	target: (dc: Document) => {
		if (!window.location.pathname.startsWith('/shorts/')) return null;

		return dc.querySelector(`ytd-reel-video-renderer[is-active] ${SHORTS_PANEL_SELECTOR}`) ?? dc.querySelector(SHORTS_PANEL_SELECTOR);
	},
	callback: (mutation: MutationRecord[], panel: HTMLElement) => {
		// Already mounted inside the currently open panel
		if (shortsMount && panel.contains(shortsMount.element)) return;

		// The user scrolled to another short: its panel is a different element,
		// so move the tabs there instead of accumulating roots in hidden panels
		if (shortsMount) DocumentService.unmountReactComponent(shortsMount);

		const content = (panel.querySelector('#content') as HTMLElement | null) ?? panel;
		shortsMount = DocumentService.mountReactComponentInto('div', 'gc-tabs-shorts', content, TabsWrapper, { type: "shorts" });
	},
	interruptExpression: null,
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
	attributes: true,
	attributeFilter: ['is-active', 'visibility'],
});
