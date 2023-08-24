'use client'

import Image from 'next/image'
import Link from 'next/link'

import headerStyles from '@assets/styles/common/header.module.scss'

import logo from '@assets/images/logo-short.png'
import { Searcher } from '@/components/Searcher'

export function HeaderPage() {
	return (
		<header className={headerStyles.header}>
			<div className={headerStyles.contentHeading}>
				<Link href='/'>
					<Image
						src={logo}
						alt='Mercado Libre'
						width={45}
						height={45}
					/>
				</Link>

				<Searcher />
			</div>
		</header>
	)
}
