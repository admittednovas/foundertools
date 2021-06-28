import { Injectable, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface LinkDefinition {
    charset?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
    type?: string;
}

@Injectable({
    providedIn: 'root'
})
export class LinkService implements OnDestroy {

    // @ts-ignore
    private routeListener: Subscription;

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly router: Router,
    ) { }

    /**
     * Start listening on NavigationEnd router events
     */
    public startRouteListener(): void {
        this.routeListener = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(
            () => {
                let url = '';
                const urlTree = this.router.parseUrl(this.router.url);

                if (urlTree.root.hasChildren()) {

                    const segments = urlTree.root.children['primary'].segments;

                    if (segments && segments.length > 0) {
                        url = segments.map(segment => segment.path).join('/');
                    }
                }

                this.updateTag({
                    rel: 'canonical',
                    href: `https://foundertools.app/${url}`
                });
            }
        );
    }

    /**
     * Create or update a link tag
     * @param  {LinkDefinition} tag
     */
    public updateTag(tag: LinkDefinition): void {
        const selector = this._parseSelector(tag);
        const linkElement = <HTMLLinkElement> this.document.head.querySelector(selector)
            || this.document.head.appendChild(this.document.createElement('link'));

        if (linkElement) {
            Object.keys(tag).forEach((prop: string) => {
                linkElement[prop] = tag[prop];
            });
        }
    }

    /**
     * Remove a link tag from DOM
     * @param  tag
     */
    public removeTag(tag: LinkDefinition): void {
        const selector = this._parseSelector(tag);
        const linkElement = <HTMLLinkElement> this.document.head.querySelector(selector);

        if (linkElement) {
            this.document.head.removeChild(linkElement);
        }
    }

    /**
     * Get link tag
     * @param  tag
     * @return {HTMLLinkElement}
     */
    public getTag(tag: LinkDefinition): HTMLLinkElement {
        const selector = this._parseSelector(tag);
         // @ts-ignore: Object is possibly 'null'.
        return this.document.head.querySelector(selector);
    }

    /**
     * Get all link tags
     * @return {NodeListOf<HTMLLinkElement>}
     */
    public getTags(): NodeListOf<HTMLLinkElement> {
        return this.document.head.querySelectorAll('link');
    }

    /**
     * Parse tag to create a selector
     * @param  tag
     * @return {string} selector to use in querySelector
     */
    private _parseSelector(tag: LinkDefinition): string {
        const attr: string = tag.rel ? 'rel' : 'hreflang';
        return `link[${attr}="${tag[attr]}"]`;
    }

    /**
     * Destroy route listener when service is destroyed
     */
    ngOnDestroy(): void {
        this.routeListener.unsubscribe();
    }
}