import { mockSearch } from '@/__mock__/search.js'

import type { ResponseQuery } from '@/typing'

const maxQuantityItems = 4

export async function getQueryMock(): Promise<ResponseQuery> {
	const { results } = mockSearch

	/* No pude encontrar las categorías en la respuesta de la api */
	const mappedResults = results.slice(0, maxQuantityItems).map((res) => {
		const {
			id,
			title,
			price,
			currency_id,
			thumbnail,
			condition,
			shipping,
			seller_address,
		} = res

		// Arreglo de los segmentos del precio conteniendo el valor entero y pudiendo tener valores decimales
		const priceSegments: string[] = price.toString().split('.')
		const decimals =
			priceSegments.length === 2 ? Number(priceSegments.at(-1)) : 0

		return {
			id,
			title,
			price: {
				currency: currency_id,
				amount: price,
				decimals,
			},
			picture: thumbnail,
			condition,
			free_shipping: shipping.free_shipping,
			city: seller_address.city.name,
		}
	})

	return new Promise((res, rej) => {
		setTimeout(
			() =>
				res({
					author: {
						name: 'giuliano',
						lastname: 'cappa',
					},
					items: mappedResults,
				}),
			1000
		)
	})
}
