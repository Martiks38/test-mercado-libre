'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import Loading from './loading'
import { ListItems } from '@/components/ListItems'

export default function Items() {
	const params = useSearchParams()

	return (
		<main>
			<Suspense fallback={<Loading />}>
				<ListItems />
			</Suspense>
		</main>
	)
}

// https://api.mercadolibre.com/sites/MLA#json
