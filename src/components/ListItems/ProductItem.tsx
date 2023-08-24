import productItemStyles from '@assets/styles/components/listitems/productItem.module.scss'
import Link from 'next/link'

interface ProductItemProps {
	amount: number
	city: string
	currency: string
	picture: string
	title: string
}

export function ProductItem({
	amount,
	city,
	currency,
	picture,
	title,
}: ProductItemProps) {
	return (
		<li className={productItemStyles.productItem}>
			<Link
				href='#'
				className={productItemStyles.product}
			>
				<img
					className={productItemStyles.product__img}
					src={picture}
					alt={title}
				/>
				<div className={productItemStyles.product__mainData}>
					<span className={productItemStyles.product__mainData__amount}>
						{new Intl.NumberFormat('es-AR', {
							style: 'currency',
							currency,
						}).format(amount)}
					</span>
					<h3 className={productItemStyles.product__mainData__name}>{title}</h3>
				</div>
				<span className={productItemStyles.product__city}>{city}</span>
			</Link>
		</li>
	)
}
