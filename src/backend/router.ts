import { parse } from 'url';
import { Router } from 'express';
import { PageModel, Page } from './pageModel';
import { scrapping, Scrap } from './scrapper';

const router = Router();

function backToPoint(pages: Page[]) {
	pages.forEach(page => {
		for (const key in page.words) {
			if (page.words.hasOwnProperty(key) && /\(_p\)/.test(key)) {
				const value = page.words[key];
				const nkey = key.replace(/\(_p\)/g, '.');
				page.words[nkey] = value;
			}
		}
	});
}

router.route('/pages')
	.get(async (req, res) => {
		try {
			const pages = await PageModel.find().exec();
			backToPoint(pages);
			res.status(200).send({ pages });
		} catch (error) {
			res.status(500).send({ message: error.message, stack: error.stack });
		}
	})
	.post(async (req, res) => {
		const { url } = req.body;
		try {
			let pages: Page[] = [];
			pages = await deepScrapping(url, '');
			backToPoint(pages);
			res.status(200).send({ pages });
		} catch (error) {
			res.status(500).send({ message: error.message, stack: error.stack });
		}
	})
	.delete((req, res) => {
		PageModel.remove({}, error => {
			if (error) {
				res.status(500).send({ message: error.message, stack: error.stack });
			} else {
				res.status(200).send({ pages: [] });
			}
		});
	});

export async function deepScrapping(url: string, parentUrl: string, depth = 0) {
	if (depth === 3 || url === parentUrl) {
		return [];
	}
	try {
		const pages: Page[] = [];
		const scrap = await scrapping(url);
		if (scrap.links.length) {
			depth++;
			for (let i = 0; i < scrap.links.length; i++) {
				const link = scrap.links[i];
				const { protocol, host, pathname } = parse(url);
				if (link !== url && link !== pathname && link !== parentUrl) {
					let ref = '';
					if (link.match(/^(http(s)*:\/\/)|^(www)|^(\/\/)/)) {
						ref = link;
					} else {
						ref = `${protocol}//${host}${link.startsWith('/') ? link : `/${link}`}`;
					}
					const subpages = await deepScrapping(ref, url, depth);
					subpages.forEach(p => {
						if (!pages.filter(pa => pa.url === p.url).length) {
							pages.push(p);
						}
					});
				}
			}
		}
		let [page] = await PageModel.find({ url }).limit(1).exec();
		if (!page) {
			page = new PageModel({ url, title: scrap.title });
			page.words = scrap.words;
			page = await page.save();
		}
		if (!pages.filter(p => p.url === page.url).length) {
			pages.unshift(page);
		}
		return pages;
	} catch (error) {
		throw error;
	}
}

export default router;
