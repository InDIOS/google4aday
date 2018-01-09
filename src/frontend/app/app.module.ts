import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { GraphQLModule } from './gql.module';

import { PageService } from './main/page.service';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from './search/search.component';
import { MainComponent, routes } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	declarations: [
		MainComponent,
		IndexComponent,
		SearchComponent,
		NotFoundComponent
	],
	imports: [
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(routes, { useHash: true }),
		BrowserModule,
		GraphQLModule
	],
	providers: [PageService],
	bootstrap: [MainComponent]
})
export class AppModule { }
