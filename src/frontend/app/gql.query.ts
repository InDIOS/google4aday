import gql from 'graphql-tag';

export const getPages = gql`query {
	pages {
		id
		url
		title
		words
	}
}`;

export const setPages = gql`mutation search($url: String!) {
	search(url: $url) {
		id
		url
		title
		words
	}
}`;

export const clearPages = gql`mutation {
	remove {
		id
	}
}`;
