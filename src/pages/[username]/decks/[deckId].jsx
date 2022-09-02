import Layout from '../../../lib/Layout'
import CardList from '../../../components/cards/CardList'
import {
  getDeckCards,
  getDeckData,
  getUidWithUsername,
} from '../../../firebase/firestore'
import { useAuth } from '../../../firebase/auth'
import { useEffect, useState } from 'react'
/* import usePlay from '../../../components/play/PlayContext'
import PlayCard from '../../../components/play/PlayCard' */
import CardContent from '../../../components/cards/CardContent'
import CardForm from '../../../components/cards/CardForm'
import { useCard } from '../../../components/cards/CardContext'

import { Box } from '@chakra-ui/layout'

export default function DeckId({ deckProps }) {
  const { deckData, deckCards, deckUid } = JSON.parse(deckProps)
  const { setCards, createCard } = useCard()
  const { currentUser } = useAuth()
  const [admin, setAdmin] = useState(false)
  const { cards } = useCard()

  useEffect(() => {
    setCards(deckCards)
  }, [])

  useEffect(() => {
    setAdmin(deckUid === currentUser?.uid)
  }, [deckUid, currentUser?.uid])

  return (
    <Layout noFooter priv>
      <Box ml={{ md: 80 }} minH="85vh" position="relative">
        {admin &&
        (createCard || (Array.isArray(cards) && cards.length === 0)) ? (
          <CardForm />
        ) : (
          <CardContent deckData={deckData} />
        )}
      </Box>
      <CardList admin={admin} deckId={deckData.deckId} />
      {/* <DeckHeader deckData={deckData} deckUid={deckUid} admin={admin} /> */}
    </Layout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { username, deckId } = query
  const deckUid = await getUidWithUsername(username)
  if (!deckUid)
    return {
      notFound: true,
    }
  const deckData = await getDeckData(deckUid, deckId)
  if (!deckData)
    return {
      notFound: true,
    }
  const deckCards = await getDeckCards(deckUid, deckId)

  return {
    props: {
      deckProps: JSON.stringify({ deckData, deckCards, deckUid }) || null,
    },
  }
}

/* export const getStaticPaths = async () => {
  const paths = await getUserDeckPaths();
  console.log("paths: ", paths);
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { username, deckId } = params;

  const deckUid = await getUidWithUsername(username);
  const deckData = await getDeckData(deckUid, deckId);
  const deckCards = await getDeckCards(deckUid, deckId);

  return {
    props: {
      deckProps: JSON.stringify({ deckData, deckCards, deckUid }) || null,
    },
  };
}; */