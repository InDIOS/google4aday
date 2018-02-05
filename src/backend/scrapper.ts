import { parse } from 'himalaya';
import request = require('request');

export interface Scrap {
	title: string;
	links: string[];
	words: { [key: string]: number };
}

export function scrapping(url: string) {
	return new Promise<Scrap>((resolve, reject) => {
		request(url/* , { proxy: 'http://127.0.0.1:3129' } */, (error, response, body: string) => {
			if (error) {
				reject({ status: 500, message: response.statusMessage });
			} else {
				if (response.statusCode === 200) {
					const ast = parse(body);
					const scrap = { title: '', words: {}, links: [] };
					walker(ast, scrap);
					resolve(scrap);
				} else {
					reject({ status: response.statusCode, message: response.statusMessage });
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
		if (el.type === 'comment') {
			continue;
		}
		if (el.type === 'text') {
			const words = clearStr(el.content);
			words.forEach(w => {
				if (w !== '') {
					w = w.replace(/\./g, '(_p)');
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
						if (attr.key === 'href' && attr.value && /^(http(s)*:\/\/)|^(www\.)|^(\/(\/){0,1})/.test(attr.value)) {
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
