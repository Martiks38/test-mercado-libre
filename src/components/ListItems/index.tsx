import { ProductItem } from './ProductItem'

import { getQuery } from '@/services/getQuery'

import listItemsStyles from '@assets/styles/components/listitems/index.module.scss'

export async function ListItems() {
	const data = await getQuery()

	return (
		<section className={listItemsStyles.listItemsContainer}>
			<ul className={listItemsStyles.listItems}>
				{data.items.map(
					({ id, title, price: { currency, amount }, city, picture }) => {
						return (
							<ProductItem
								key={id}
								amount={amount}
								city={city}
								currency={currency}
								picture={picture}
								title={title}
							/>
						)
					}
				)}
			</ul>
		</section>
	)
}
