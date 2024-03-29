import Layout from '../lib/Layout'
import {
  Stack,
  Box,
  Heading,
  Text,
  HStack,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import studyingImage from '../../public/img/celebration.jpg'
import Image from '../lib/Image'
import Header from '../lib/Header'
import Container from '../lib/Container'

const blogFeaturesData = [
  {
    title: 'Welcome to our first blog post',
    text: 'For us it is an immense joy to show you our first post as Intellicards. From now on, every news related to our community and company will be communicated through this medium. ',
    author: 'Fabrizio Torrico',
    date: '2022-1-20',
  },
]
const blogLatestData = [
  {
    title: 'Welcome to our first blog post',
    text: 'For us it is an immense joy to show you our first post as Intellicards. From now on, every news related to our community and company will be communicated through this medium. ',
    author: 'Fabrizio Torrico',
    date: '2022-1-20',
  },
]

export default function Blog() {
  const BlogTags = (props) => {
    return (
      <HStack spacing={2} marginTop={props.marginTop}>
        {props.tags.map((tag, i) => {
          return (
            <Tag size={'md'} variant="solid" colorScheme="main" key={i}>
              {tag}
            </Tag>
          )
        })}
      </HStack>
    )
  }

  const BlogAuthor = (props) => {
    return (
      <Text fontWeight="medium">
        {props.name} — {props.date.toLocaleDateString()}
      </Text>
    )
  }

  const BlogItem = ({ data, flex }) => {
    const { title, text, author, date } = data
    return (
      <NextLink href="/">
        <a>
          <Stack
            direction={flex ? 'row' : 'column'}
            spacing="7"
            _hover={{
              color: 'main.500',
            }}
          >
            <Box borderRadius="md" w={flex ? '35%' : ''}>
              <Image
                borderRadius="lg"
                transform="scale(1.0)"
                src={studyingImage}
                alt="some text"
                objectFit="contain"
              />
            </Box>
            <Box w="100%">
              <BlogTags tags={['Engineering', 'Product']} />
              <Stack direction={flex ? 'row' : 'column'} marginTop="2">
                <Heading fontSize="xl">{title}</Heading>
                <BlogAuthor name={author} date={new Date(date)} />
              </Stack>
              <Text
                as="p"
                fontSize="md"
                marginTop="2"
                noOfLines={3}
                color={'gray.500'}
              >
                {text}
              </Text>
            </Box>
          </Stack>
        </a>
      </NextLink>
    )
  }

  return (
    <Layout title="blog">
      <Container>
        <Header
          title={
            <>
              Our{' '}
              <Text as={'span'} color={'main.500'}>
                Blog
              </Text>
            </>
          }
          secondary="Welcome to the Intellicards blog. Get updated on the latest news in
              education, trends and best practices in your industry and practical
              tips from our experts."
        />

        <Heading fontSize={'3xl'} as="h3" mb="5">
          Featured stories
        </Heading>
        <Wrap spacing="30px">
          {blogFeaturesData.map((data, i) => (
            <WrapItem
              key={i}
              width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}
            >
              <BlogItem data={data} />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
      <Container bg="gray.100">
        <Heading fontSize={'3xl'} as="h3" mb="5">
          Latest stories
        </Heading>

        {blogLatestData.map((data, i) => (
          <BlogItem key={i} data={data} flex />
        ))}
      </Container>
    </Layout>
  )
}
