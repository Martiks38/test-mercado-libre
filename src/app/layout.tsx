import { HeaderPage } from '@/common/header'

import './globals.css'
import '/public/reset.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='es'>
			<body>
				<HeaderPage />
				{children}
			</body>
		</html>
	)
}

