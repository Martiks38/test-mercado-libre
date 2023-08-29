import { BASE_URL_API, baseResponse } from '@/assets/consts'

import type {
	Item,
	ItemProduct,
	ItemQuery,
	MercadoLibreResponse,
	ResponseError,
	ResponseQuery,
} from '@/typing'

const maxQuantityItems = 4

export async function getQuery(
	query: string
): Promise<ResponseQuery | ResponseError> {
	let response: ItemQuery[] | string

	try {
		const resp = await fetch(`${BASE_URL_API}/sites/MLA/search?q=${query}`)

		const data: MercadoLibreResponse = await resp.json()

		if (!resp.ok) {
			throw new Error('Se produjo un error durante la búsqueda')
		}

		if (data.results.length === 0) {
			throw new Error('No se hayaron resultados para la búsqueda')
		}

		const mappedResults = data.results.slice(0, maxQuantityItems).map((res) => {
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
				condition,
				city: seller_address.city.name,
				free_shipping: shipping.free_shipping,
				picture: thumbnail,
				price: {
					currency: currency_id,
					amount: price,
					decimals,
				},
				title,
			}
		})

		response = mappedResults
	} catch (error: unknown) {
		const isInstanceofError = error instanceof Error

		response = isInstanceofError
			? error.message
			: 'Se produjo un error durante la búsqueda'
	}

	return new Promise((res, rej) => {
		setTimeout(() => {
			const resp: Record<'message', string> | Record<'items', ItemQuery[]> =
				typeof response === 'string'
					? { message: response }
					: { items: response }

			res({
				...baseResponse,
				...resp,
			})
		}, 1000)
	})
}
