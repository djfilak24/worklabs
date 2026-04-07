import './globals.css'

export const metadata = {
  title: 'Work Labs — NELSON Worldwide',
  description: 'A living proof of concept. Designers who ship software, strategists who build tools.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{background:"#0b0b0d",margin:0,padding:0}}>{children}</body>
    </html>
  )
}
