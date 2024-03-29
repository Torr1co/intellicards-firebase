import Layout from '../lib/Layout'
import Header from '../lib/Header'
import Container from '../lib/Container'
import { Text, Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

const SearchBar = () => {
  return (
    <InputGroup color="main.500">
      <InputLeftElement>
        <Search2Icon />
      </InputLeftElement>
      <Input placeholder="How can we help?" borderColor="main.500" />
    </InputGroup>
  )
}

export default function Help() {
  return (
    <Layout title="Help">
      <Container>
        <Header
          title={
            <>
              Support{' '}
              <Text as={'span'} color={'main.500'}>
                Center
              </Text>
            </>
          }
          secondary={SearchBar()}
        />
      </Container>
    </Layout>
  )
}
