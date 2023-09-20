import { getItemMock } from '@/__mock__/services/getItemMock'
import { getItem } from '@/services/getItem'
import { isResponseError, isResponseItem } from '@/utils/typeGuards'

import i18n from '@assets/i18n/translations.json'

import itemDescriptionStyles from '@assets/styles/components/itemDescriptionPage/index.module.scss'
import errorStyles from '@assets/styles/common/errorMessage.module.scss'

const { BUY, DESCRIPTION_TITLE, ITEM_CONDITION, SOLD } =
	i18n.es.item_description

type ItemDescriptionProps = {
	params: {
		id: string
	}
}

import { Metadata } from 'next'
import { BASE_URL_API } from '@/assets/consts'

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = params

	const product = await fetch(`${BASE_URL_API}/items/${id}`).then((res) =>
		res.json()
	)

	return {
		title: product.title,
	}
}

export default async function ItemDescription({
	params,
}: ItemDescriptionProps) {
	const isProdOrDev =
		process.env.NODE_ENV === 'production' ||
		process.env.NODE_ENV === 'development'

	const response = isProdOrDev ? await getItem(params.id) : await getItemMock()

	const { new_product, used_product } = ITEM_CONDITION

	return (
		<main>
			<article className={itemDescriptionStyles.itemDescriptionContainer}>
				{isResponseError(response) && (
					<>
						<h1 className={errorStyles.errorResponse__title}>Error</h1>
						<p className={errorStyles.errorResponse__description}>
							{response.message}
						</p>
					</>
				)}
				{isResponseItem(response) && (
					<>
						<div className={itemDescriptionStyles.itemDescription__data}>
							<img
								src={response.item.picture}
								alt={response.item.title}
								className={itemDescriptionStyles.itemDescription__data__img}
								height='450'
							/>
							<div
								className={itemDescriptionStyles.itemDescription__data__info}
							>
								<p
									className={
										itemDescriptionStyles.itemDescription__data__info__condition
									}
								>
									{`${
										response.item.condition === 'new'
											? new_product
											: used_product
									} -
						${response.item.sold_quantity}
						${SOLD}`}
								</p>
								<h1
									className={
										itemDescriptionStyles.itemDescription__data__info__name
									}
								>
									{response.item.title}
								</h1>
								<p
									className={
										itemDescriptionStyles.itemDescription__data__info__price
									}
								>
									{new Intl.NumberFormat('es-AR', {
										style: 'currency',
										currency: response.item.price.currency,
									}).format(response.item.price.amount)}
								</p>
								<button
									className={
										itemDescriptionStyles.itemDescription__data__info__buy
									}
								>
									{BUY}
								</button>
							</div>
						</div>
						<h2
							className={
								itemDescriptionStyles.itemDescription__data__descriptionTitle
							}
						>
							{DESCRIPTION_TITLE}
						</h2>
						<p
							className={
								itemDescriptionStyles.itemDescription__data__descriptionText
							}
						>
							{response.item.description}
						</p>
					</>
				)}
			</article>
		</main>
	)
}
