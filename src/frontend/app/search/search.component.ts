import { Component } from '@angular/core';
import { PageService, Page } from '../main/page.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	pages: Page[];
	isSearching: boolean;
	private _pages: Page[];
	search: HTMLInputElement;

	constructor(private _pageService: PageService) {
		this.pages = [];
		this._pages = [];
		this.isSearching = false;
	}

	ngOnInit(): void {
		this._pageService.getPages().subscribe(pages => {
			this._pages = pages;
		}, err => {
			console.log(err);
		});
	}

	searchInPages(search: string) {
		if (search) {
			this.isSearching = true;
			this.pages = this._pages
				.filter(page => typeof page.words[search] === 'number')
				.sort((a, b) => {
					const aOcurrence = a.words[search];
					const bOcurrence = b.words[search];
					if (aOcurrence > bOcurrence) {
						return -1;
					}
					if (aOcurrence < bOcurrence) {
						return 1;
					}
					return 0;
				});
		}
	}
}
