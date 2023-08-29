'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ListItems } from '@/components/ListItems'

import Loading from './loading'

export default function Items() {
	const params = useSearchParams()
	const query = params.get('search') ?? ''

	return (
		<main>
			<Suspense fallback={<Loading />}>
				<ListItems query={query} />
			</Suspense>
		</main>
	)
}
