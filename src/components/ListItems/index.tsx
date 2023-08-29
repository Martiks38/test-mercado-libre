import { ProductItem } from './ProductItem'

import { getQuery } from '@/services/getQuery'
import { isResponseError, isResponseQuery } from '@/utils/typeGuards'

import listItemsStyles from '@assets/styles/components/listitems/index.module.scss'
import errorStyles from '@assets/styles/common/errorMessage.module.scss'
import { getQueryMock } from '@/__mock__/services/getQueryMock'

export async function ListItems({ query }: { query: string }) {
	const isProdOrDev =
		process.env.NODE_ENV === 'production' ||
		process.env.NODE_ENV === 'development'
	const data = isProdOrDev ? await getQuery(query) : await getQueryMock()

	return (
		<section className={listItemsStyles.listItemsContainer}>
			{isResponseError(data) && (
				<>
					<h1 className={errorStyles.errorMessage__title}>Error</h1>
					<p className={errorStyles.errorMessage__description}>
						{data.message}
					</p>
				</>
			)}
			{isResponseQuery(data) && (
				<ul className={listItemsStyles.listItems}>
					{data.items.map(
						({ id, title, price: { currency, amount }, city, picture }) => {
							return (
								<ProductItem
									key={id}
									amount={amount}
									city={city}
									currency={currency}
									id={id}
									picture={picture}
									title={title}
								/>
							)
						}
					)}
				</ul>
			)}
		</section>
	)
}
