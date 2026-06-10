import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';

export class DocumentService {
	public static createElementWithId(tag: string, id: string): HTMLElement {
		const element = document.createElement('div');
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
}
