import { BaseTranslator } from '@translate-tools/core/util/BaseTranslator';

/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
export class LanMTTranslator extends BaseTranslator {
	static readonly translatorName = 'LanMTTranslator';
	// URL of your instance of LingvaTranslate
	apiPath = 'http://192.168.2.226:5002';
	translate = (text: string, from: string, to: string) => {
		return fetch(`${this.apiPath}/yyq/translate`, {
			credentials: 'omit',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				method: 'translate',
				src_lang: `${from}`,
				tgt_lang: `${to}`,
				domain: 'general',
				data: {
					input: `${text}`,
				},
			}),
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				return JSON.stringify(data.data.translation).replace(/"/g, '');
			});
	};

	translateBatch = (texts: string[], from: string, to: string) => {
		return fetch(`${this.apiPath}/yyq/translate`, {
			credentials: 'omit',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				method: 'translate',
				src_lang: `${from}`,
				tgt_lang: `${to}`,
				domain: 'general',
				data: {
					input: texts,
				},
			}),
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				return data.data.translation;
			});
	};
	getLengthLimit = () => 4000;
	getRequestsTimeout = () => 300;
	checkLimitExceeding = (text: string | string[]) => {
		const textLength = !Array.isArray(text)
			? text.length
			: text.reduce((len, text) => len + text.length, 0);
		return textLength - this.getLengthLimit();
	};
	static isSupportedAutoFrom = () => true;
	static getSupportedLanguages = () => [
		'zh',
		'en',
		'ru',
		'fr',
		'de',
		'ja',
		'ar',
		'km',
		'ko',
		'cs',
		'hr',
		'pt',
		'th',
		'uk',
		'es',
		'it',
		'id',
		'vi',
	];
}
