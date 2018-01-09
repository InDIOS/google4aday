import { parse } from 'himalaya';
import request = require('request');

export interface Scrap {
	title: string;
	links: string[];
	words: { [key: string]: number };
}

export function scrapping(url: string) {
	return new Promise<Scrap>((resolve, reject) => {
		request(url, { timeout: 5000 }, (error, response, body: string) => {
			if (error) {
				reject(error);
			} else {
				if (response.statusCode === 200) {
					const ast = parse(body);
					const scrap = { title: '', words: {}, links: [] };
					walker(ast, scrap);
					resolve(scrap);
				} else {
					reject(new Error(response.statusMessage));
				}
			}
		});
	});
}

function clearStr(str: string) {
	return str.split(/\s+/)
		.map(w => w.replace(/[!¡?¿&;,`"']/g, '').replace(/\.[\s\t\n\r]*$/g, ''));
}

function walker(ast: any, scrap: Scrap) {
	for (let i = 0; i < ast.length; i++) {
		const el = ast[i];
		if (el.type === 'text') {
			const words = clearStr(el.content);
			words.forEach(w => {
				if (w !== '') {
					if (!scrap.words[w]) {
						scrap.words[w] = 1;
					} else {
						scrap.words[w] += 1;
					}
				}
			});
		} else {
			if (el.tagName.match(/script|template|style/)) {
				continue;
			}
			if (el.tagName === 'title') {
				scrap.title = el.children[0].content;
			} else {
				if (el.tagName === 'a') {
					el.attributes.forEach(attr => {
						if (attr.key === 'href' && attr.value) {
							scrap.links.push(attr.value);
						}
					});
				}
				walker(el.children, scrap);
			}
		}
	}
}

// scrapping('http://www.sld.cu').then(scrap => {
// 	console.log(JSON.stringify(scrap, null, 2));
// }).catch(err => console.log(err));
