import Container from "../../hocs/Container";
import { Text, Stack, Heading } from "@chakra-ui/react";
import CardPreview from "./CardPreview";
import CardForm from "./CardForm";
import { useState, useEffect } from "react";
export default function CardList({ deckCards, admin }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(deckCards);
  }, []);

  const renderCards = () => {
    if (!cards || (Array.isArray(cards) && cards.length === 0))
      return (
        <Text color="gray.600" fontSize={{ base: "lg", md: "2xl" }}>
          There is no Cards!
        </Text>
      );

    return cards.map((card, i) => (
      <CardPreview key={i} cardData={card} id={i + 1} />
    ));
  };

  return (
    <Container maxW={{ base: "md", md: "4xl" }}>
      <Stack spacing={{ base: 4, md: 5 }} py={{ base: 8, md: 12 }}>
        <Heading fontWeight={600} fontSize={"3xl"} lineHeight={"110%"}>
          Cards
        </Heading>
        {admin && <CardForm />}
        {renderCards()}
      </Stack>
    </Container>
  );
}
