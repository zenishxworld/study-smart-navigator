import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Study Abroad Intelligence Platform - Data-Driven Decisions',
    description: 'Commission-neutral, ROI-based decision platform for studying abroad. Make transparent, intelligent choices backed by data.',
    keywords: 'study abroad, university comparison, ROI calculator, education, international students',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
