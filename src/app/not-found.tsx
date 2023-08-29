import Link from 'next/link'

import errorStyles from '@assets/styles/common/errorMessage.module.scss'

export default function Error() {
	return (
		<main className={errorStyles.error404}>
			<h1 className={errorStyles.error404__title}>Error 404</h1>
			<div>
				<p className={errorStyles.error404__message}>
					Upsss 😵 parece que la ruta a la que querías ir no existe.
				</p>
				<span>
					<Link
						href='/'
						className={errorStyles.error404__redirect}
					>
						Vuelve al inicio
					</Link>
				</span>
			</div>
		</main>
	)
}
