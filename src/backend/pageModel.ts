import { Schema, model, Document } from 'mongoose';

export interface Page extends Document {
	url: string;
	title: string;
	words?: { [key: string]: number };
}

const Model = new Schema({
	title: { type: String },
	url: { type: String, index: true },
	words: { type: Schema.Types.Mixed, default: {} }
});

export const PageModel = model<Page>('Page', Model);
