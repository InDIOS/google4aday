import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Apollo, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';

@NgModule({
	exports: [ApolloModule, HttpClientModule, HttpLinkModule]
})
export class GraphQLModule {
	constructor(apollo: Apollo, httpLink: HttpLink) {
		apollo.create({
			cache: new InMemoryCache(),
			link: httpLink.create({ uri: 'http://127.0.0.1:3000/gql' })
		});
	}
}
