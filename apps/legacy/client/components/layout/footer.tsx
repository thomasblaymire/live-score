import { ReactNode } from 'react'
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2} color="#fcfcfd">
      {children}
    </Text>
  )
}

const CustomLink = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) => (
  <Link href={href} color="#777e90" _hover={{ color: '#3772ff;' }}>
    {children}
  </Link>
)

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{ fill: '#3772ff' }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export function Footer() {
  return (
    <Box
      borderTop="solid 1px #353945"
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <CustomLink href="#">About Us</CustomLink>
            <CustomLink href="#">Blog</CustomLink>
            <CustomLink href="#">Careers</CustomLink>
            <CustomLink href="#">Contact Us</CustomLink>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Support</ListHeader>
            <CustomLink href="#">Help Center</CustomLink>
            <CustomLink href="#">Safety Center</CustomLink>
            <CustomLink href="#">Community Guidelines</CustomLink>
          </Stack>

          <Stack align="flex-start">
            <ListHeader>Legal</ListHeader>
            <CustomLink href="#">Cookies Policy</CustomLink>
            <CustomLink href="#">Privacy Policy</CustomLink>
            <CustomLink href="#">Terms of Service</CustomLink>
            <CustomLink href="#">Law Enforcement</CustomLink>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box borderTopWidth={1} borderStyle={'solid'} borderColor="gray.800">
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text color="#777e90">© 2023 Live Score. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter fill="#777e90" />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube fill="#777e90" />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram fill="#777e90" />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
