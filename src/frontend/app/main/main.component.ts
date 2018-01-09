import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { PageService } from './page.service';
import { IndexComponent } from '../index/index.component';
import { SearchComponent } from '../search/search.component';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
	selector: 'app-root',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent {
	apiInUse: boolean;
	title = 'Angular 5';

	constructor(private _pageService: PageService) { }

	toggleApi() {
		this._pageService.useGraphQL = !this._pageService.useGraphQL;
		this.apiInUse = this._pageService.useGraphQL;
	}
}

export const routes: Routes = [
	{ path: 'index', component: IndexComponent },
	{ path: 'search', component: SearchComponent },
	{ path: '', redirectTo: 'search', pathMatch: 'full' },
	{ path: '**', component: NotFoundComponent }
];
