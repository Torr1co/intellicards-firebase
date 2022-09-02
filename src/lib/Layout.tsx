import Head from 'next/head'
import NavBar from './NavBar'
import Footer from './Footer'
import { useAuth } from '../firebase/auth'
import DisconnectedPage from '../components/Unauthenticated/DisconnectedPage'

interface LayoutProps {
  title?: string
  description?: string
  home?: boolean
  priv?: boolean
  children: React.ReactNode
  noFooter?: boolean
}
/**
 * the children component with nav bar and footer
 */
export default function Layout({
  title,
  description,
  home,
  priv,
  children,
  noFooter,
}: LayoutProps) {
  const { currentUser } = useAuth()

  return (
    <>
      <Head>
        <title>{`${title} • Intellicards`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="copyright" content="© 2021 intellicards"></meta>
        <meta
          name="keywords"
          content="intellicards, learn, study, efficient, easy"
        />
        <meta name="author" content="Fabrizio Torrico" />
        <meta name="description" content={description} />
      </Head>
      <NavBar home={home} />
      <main
        style={{
          paddingTop: '4rem',
          minHeight: '60vh',
        }}
      >
        {priv ? currentUser ? children : <DisconnectedPage /> : children}
      </main>
      {!noFooter && <Footer />}
    </>
  )
}

Layout.defaultProps = {
  title: '',
  description:
    'Intellicards will help you study better and increase your productivity by merging different educational tools and games',
}