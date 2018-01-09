import { Component } from '@angular/core';
import { PageService } from '../main/page.service';
import { error } from 'util';

export interface WordMap {
	[key: string]: number;
}

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent {
	numOfPages = 0;
	numOfWords = 0;
	cleared: boolean;
	indexDisable: boolean;
	clearDisable: boolean;

	constructor(private _pageService: PageService) {
		this.cleared = false;
		this.numOfPages = this.numOfWords = 0;
		this.indexDisable = this.clearDisable = false;
	}

	setIndex(indexer: string): void {
		if (indexer) {
			this.indexDisable = true;
			this._pageService
				.setPage(indexer)
				.subscribe(pages => {
					this.numOfPages = pages.length;
					const wordsHelper: WordMap = {};
					for (let i = 0; i < pages.length; i++) {
						this.joinWordsObj(wordsHelper, pages[i].words);
					}
					this.numOfWords = Object.keys(wordsHelper).length;
				}, err => {
					console.log(err);
				}, () => {
					this.cleared = false;
					this.indexDisable = false;
				});
		}
	}

	clearIndex(indexer: HTMLInputElement) {
		this._pageService.clearPages().subscribe(pages => {
			indexer.value = '';
			this.numOfWords = 0;
			this.cleared = true;
			this.numOfPages = pages.length;
		}, err => {
			console.log(err);
		});
	}

	joinWordsObj(w1: WordMap , w2: WordMap): void {
		for (const key in w2) {
			if (w2.hasOwnProperty(key)) {
				w1[key] = typeof w1[key] === 'number' ? w1[key] + w2[key] : w2[key];
			}
		}
	}
}
