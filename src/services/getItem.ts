import { BASE_URL_API, baseResponse } from '@/assets/consts'
import type { ItemData, ResponseError, ResponseItem } from '@/typing'

interface Snapshot {
	url: string
	width: number
	height: number
	status: string
}

interface ItemDescription {
	text: string
	plain_text: string
	last_updated: string
	date_created: string
	snapshot: Snapshot
}

/**
 *  generateItemURL devuelve un arreglo de la URL con los datos del producto o ítem y la URL de la descripción del producto o ítem
 */

const generateItemURL = (item_id: string) => {
	const itemURL = `${BASE_URL_API}/items/${item_id}`
	const itemDescriptionURL = `${itemURL}/description`

	return [itemURL, itemDescriptionURL]
}

export async function getItem(
	item_id: string
): Promise<ResponseItem | ResponseError> {
	let responseApi: ResponseItem | ResponseError

	try {
		const responses = await Promise.all(
			generateItemURL(item_id).map((url) => fetch(url))
		)
		const dataItem: unknown[] = await Promise.all(
			responses.map((response) => response.json())
		)

		const [data, description] = dataItem

		if (!responses[0].ok) {
			throw new Error('Se produjo un error al intentar obtener el producto')
		}

		if (!responses[1].ok) {
			throw new Error(
				'Se produjo un error al intentar obtener la descripción del producto'
			)
		}

		const {
			id,
			currency_id,
			price,
			pictures,
			condition,
			shipping,
			sold_quantity,
			title,
		} = data as ItemData

		// Arreglo de los segmentos del precio conteniendo el valor entero y pudiendo tener valores decimales
		const priceSegments: string[] = price.toString().split('.')
		const decimals =
			priceSegments.length === 2 ? Number(priceSegments.at(-1)) : 0

		const { plain_text, text } = description as ItemDescription

		const itemData = {
			...baseResponse,
			item: {
				condition,
				free_shipping: shipping.free_shipping,
				description: text || plain_text,
				id,
				picture: pictures[0].url || pictures[0].secure_url,
				price: {
					currency: currency_id,
					amount: price,
					decimals,
				},
				sold_quantity,
				title,
			},
		}

		responseApi = itemData
	} catch (error: unknown) {
		responseApi = {
			...baseResponse,
			message:
				error instanceof Error
					? error.message
					: 'Se produjo un error al obtener los datos del producto',
		}
	}

	return new Promise((res, rej) => {
		setTimeout(() => res(responseApi), 1000)
	})
}
