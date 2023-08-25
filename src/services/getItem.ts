import { item, description } from '@/__mock__/item.js'

type ItemData = {
	condition: string
	description: string
	free_shipping: boolean
	id: string
	picture: string
	price: {
		currency: string
		amount: number
		decimals: number
	}
	sold_quantity: number
	title: string
}

type ResponseItemData = {
	author: {
		name: string
		lastname: string
	}
	item: ItemData
}

export async function getItem(): Promise<ResponseItemData> {
	const {
		id,
		currency_id,
		price,
		pictures,
		condition,
		shipping,
		sold_quantity,
		title,
	} = item

	// Arreglo de los segmentos del precio conteniendo el valor entero y pudiendo tener valores decimales
	const priceSegments: string[] = price.toString().split('.')
	const decimals = priceSegments.length === 2 ? Number(priceSegments.at(-1)) : 0

	const itemData = {
		author: {
			name: 'Giuliano',
			lastname: 'Cappa',
		},
		item: {
			condition,
			free_shipping: shipping.free_shipping,
			description: description.text || description.plain_text,
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

	return new Promise((res, rej) => {
		setTimeout(() => res(itemData), 1000)
	})
}
