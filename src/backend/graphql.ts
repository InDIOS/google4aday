import { deepScrapping } from './router';
import { PageModel, Page } from './pageModel';
import {
	GraphQLObjectType, GraphQLScalarType, GraphQLNonNull,
	GraphQLSchema, GraphQLString, GraphQLList, GraphQLID,
} from 'graphql/type';

const WordType = new GraphQLScalarType({
	name: 'Word',
	description: 'Word Map.',
	serialize(value: { [key: string]: number }) {
		return value;
	}
});

const PageType = new GraphQLObjectType({
	name: 'page',
	description: 'Page object.',
	fields: {
		id: {
			type: GraphQLID,
			description: 'MongoDB ObjectID representation.'
		},
		title: {
			type: GraphQLString,
			description: 'Title of the page.'
		},
		url: {
			type: GraphQLString,
			description: 'Url of the page.',
		},
		words: {
			type: WordType,
			description: 'Words in the page.'
		}
	}
});

const query = new GraphQLObjectType({
	name: 'Query',
	description: 'Query object.',
	fields: {
		pages: {
			type: new GraphQLList(PageType),
			description: 'List of pages.',
			resolve() {
				return PageModel.find().exec();
			}
		}
	}
});

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Mutation object.',
	fields: {
		search: {
			type: new GraphQLList(PageType),
			description: 'Scrap the url and extract all words in it',
			args: {
				url: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve(_, { url }) {
				return deepScrapping(url, '');
			}
		},
		remove: {
			type: new GraphQLList(PageType),
			description: 'Remove all indexed pages',
			resolve() {
				return PageModel.remove({}).exec().then<Page[]>(() => []);
			}
		}
	}
});

export default new GraphQLSchema({ query, mutation });
