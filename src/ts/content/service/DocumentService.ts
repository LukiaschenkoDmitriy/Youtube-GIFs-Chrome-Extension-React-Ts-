import React, { createElement } from 'react';
import { createRoot, Root } from 'react-dom/client';

export type ReactMount = { element: HTMLElement; root: Root };

export class DocumentService {
	public static createElementWithId(tag: string, id: string): HTMLElement {
		const element = document.createElement(tag);
		element.id = id;

		return element;
	}

	public static createAndInsertReactComponentBefore(tag: string, id: string, parent: HTMLElement, component: React.FC): void {
		const element = DocumentService.createElementWithId(tag, id);
		parent.before(element);
		createRoot(element).render(createElement(component));
	}

	public static createAndInsertReactComponentAfter(tag: string, id: string, parent: HTMLElement, component: React.FC): void {
		const element = DocumentService.createElementWithId(tag, id);
		parent.after(element);
		createRoot(element).render(createElement(component));
	}

	public static mountReactComponentInto(tag: string, id: string, parent: HTMLElement, component: React.FC): ReactMount {
		const element = DocumentService.createElementWithId(tag, id);
		parent.prepend(element);

		const root = createRoot(element);
		root.render(createElement(component));

		return { element, root };
	}

	public static unmountReactComponent(mount: ReactMount): void {
		mount.root.unmount();
		mount.element.remove();
	}
}
