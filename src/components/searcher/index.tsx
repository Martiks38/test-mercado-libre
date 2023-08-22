'use client'

import { useEffect, useId, useRef } from 'react'

import searcherStyles from '@assets/styles/components/searcher/index.module.scss'

import i18n from '@assets/i18n/translations.json'
import { useRouter, useSearchParams } from 'next/navigation'

const { LABEL_BUTTON_SEARCHER, LABEL_INPUT_SEARCHER, PLACEHOLDER_SEARCHER } =
	i18n.es.searcher

export function Searcher() {
	const searchId = useId()
	const inputRef = useRef<HTMLInputElement | null>(null)
	const router = useRouter()

	useEffect(() => {
		if (inputRef.current instanceof HTMLInputElement) inputRef.current.focus()
	}, [])

	const searchItem = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()

		const searchInput = ev.currentTarget.search

		router.push(`/items?search=${searchInput.value}`)

		searchInput.value = null
	}

	return (
		<form
			className={searcherStyles.searchContainer}
			onSubmit={searchItem}
		>
			<label
				htmlFor={searchId}
				className={searcherStyles.searchContainer__label}
			>
				{LABEL_INPUT_SEARCHER}
			</label>
			<input
				ref={inputRef}
				type='search'
				name='search'
				id={searchId}
				className={searcherStyles.searchContainer__input}
				placeholder={PLACEHOLDER_SEARCHER}
			/>
			<button
				type='submit'
				className={searcherStyles.searchContainer__submit}
				aria-label={LABEL_BUTTON_SEARCHER}
			>
				<svg
					height='20'
					width='20'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 512 512'
					xmlSpace='preserve'
				>
					<path d='m508.255 490.146-128-128c-.06-.06-.137-.077-.196-.128 34.193-38.434 55.142-88.917 55.142-144.418 0-120.175-97.425-217.6-217.6-217.6S.001 97.425.001 217.6s97.425 217.6 217.6 217.6c55.501 0 105.975-20.949 144.418-55.151.06.06.077.137.128.196l128 128c2.5 2.509 5.777 3.755 9.054 3.755s6.554-1.246 9.054-3.746c4.992-5.001 4.992-13.107 0-18.108zM217.601 409.6c-105.865 0-192-86.135-192-192s86.135-192 192-192 192 86.135 192 192-86.135 192-192 192z' />
				</svg>
			</button>
		</form>
	)
}
