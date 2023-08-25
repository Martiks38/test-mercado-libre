import { getItem } from '@/services/getItem'

import i18n from '@assets/i18n/translations.json'

import itemDescriptionStyles from '@assets/styles/components/itemDescriptionPage/index.module.scss'

const { BUY, DESCRIPTION_TITLE, ITEM_CONDITION, SOLD } =
	i18n.es.item_description

type ItemDescriptionProps = {
	params: {
		id: string
	}
}

export default async function ItemDescription({
	params,
}: ItemDescriptionProps) {
	const { item } = await getItem()

	const { condition, description, picture, price, sold_quantity, title } = item

	const { amount, currency } = price
	const { new_product, used_product } = ITEM_CONDITION

	return (
		<main>
			<article className={itemDescriptionStyles.itemDescriptionContainer}>
				<div className={itemDescriptionStyles.itemDescription__data}>
					<img
						src={picture}
						alt={title}
						className={itemDescriptionStyles.itemDescription__data__img}
						height='450'
					/>
					<div className={itemDescriptionStyles.itemDescription__data__info}>
						<p
							className={
								itemDescriptionStyles.itemDescription__data__info__condition
							}
						>
							{`${condition === 'new' ? new_product : used_product} - 
					${sold_quantity} 
					${SOLD}`}
						</p>
						<h1
							className={
								itemDescriptionStyles.itemDescription__data__info__name
							}
						>
							{title}
						</h1>
						<p
							className={
								itemDescriptionStyles.itemDescription__data__info__price
							}
						>
							{new Intl.NumberFormat('es-AR', {
								style: 'currency',
								currency: currency,
							}).format(amount)}
						</p>
						<button
							className={itemDescriptionStyles.itemDescription__data__info__buy}
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
					{description}
				</p>
			</article>
		</main>
	)
}
