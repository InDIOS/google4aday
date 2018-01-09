import 'rxjs/add/operator/map';
import { Apollo } from 'apollo-angular';
import { ExecutionResult } from 'graphql';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { WordMap } from '../index/index.component';
import { getPages, setPages, clearPages } from '../gql.query';


export interface Page {
	id: string;
	url: string;
	title: string;
	words: WordMap;
}

@Injectable()
export class PageService {
	useGraphQL = false;

	constructor(private _http: HttpClient, private _apollo: Apollo) { }

	getPages(): Observable<Page[]> {
		if (this.useGraphQL) {
			return this.graphQlMapper(this._apollo.watchQuery<Page[]>({ query: getPages }).valueChanges);
		} else {
			return this.restMapper(this._http.get('/api/pages'));
		}
	}

	setPage(url: string): Observable<Page[]> {
		if (this.useGraphQL) {
			const variables = { url };
			return this.graphQlMapper(this._apollo.mutate({
				mutation: setPages, variables,
				update(proxy, { data: { search } }) {
					const pages = <Page[]>search;
					const data = proxy.readQuery<{ pages: Page[] }>({ query: getPages });
					pages.forEach(page => {
						if (!data.pages.filter(p => p.id === page.id).length) {
							data.pages.push(page);
						}
					});
					proxy.writeQuery({ query: getPages, data });
				}
			}), 'search');
		} else {
			return this.restMapper(this._http.post('/api/pages', { url }));
		}
	}

	clearPages() {
		if (this.useGraphQL) {
			return this.graphQlMapper(this._apollo.mutate({
				mutation: clearPages,
				update(proxy, { data: { remove } }) {
					proxy.writeQuery({ query: getPages, data: { pages: remove } });
				}
			}), 'remove');
		} else {
			return this.restMapper(this._http.delete('/api/pages'));
		}
	}

	private graphQlMapper(result: Observable<ExecutionResult>, pages?: string) {
		return result.map(({ data }) => <Page[]>data[pages || 'pages']);
	}

	private restMapper(result: Observable<Object>): Observable<Page[]> {
		return result.map((res: { pages: Page[] }) => res.pages);
	}
}
