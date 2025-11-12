import { useState } from 'react'
import { Box, Button, Stack, Spinner } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineMail } from 'react-icons/md'

enum PROVIDERS {
  GITHUB = 'GitHub',
  FACEBOOK = 'Facebook',
  EMAIL = 'Email',
  GOOGLE = 'Google',
}

interface AuthProvidersProps {
  providers: Provider[]
}

export function AuthProviders({ providers }: AuthProvidersProps) {
  const [loadingProvider, setLoadingProvider] = useState(new Set())

  function renderProviderIcon(name: string): JSX.Element {
    if (name === PROVIDERS.GITHUB) return <BsGithub />
    if (name === PROVIDERS.GOOGLE) return <FcGoogle />
    return <MdOutlineMail />
  }

  const handleProviderSignin = (providerId: string) => {
    setLoadingProvider(() => new Set([providerId]))
    signIn(providerId)
  }

  return (
    <Box paddingBottom="1rem">
      {Object.values(providers).map(
        (provider: Provider, index: number, array: Provider[]) => (
          <Box key={provider.name}>
            <Stack direction="row" spacing={4}>
              <Button
                width="100%"
                isLoading={loadingProvider.has(provider.id)}
                fontWeight="600"
                spinner={
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="#3772ff"
                    size="lg"
                  />
                }
                onClick={() => handleProviderSignin(provider.id)}
                leftIcon={renderProviderIcon(provider.name)}
                data-test="provider-sign-in-submit"
                border="solid 1.5px #353945"
                background="none"
                _hover={{
                  background: '#0e2aa8',
                  border: 'solid 1.5px #0e2aa8',
                }}
                marginBottom={index === array.length - 1 ? 0 : '1rem'}
              >
                {loadingProvider.has(provider.id) && <div>Loading..</div>}
                Sign in with {provider.name}
              </Button>
            </Stack>
          </Box>
        )
      )}
    </Box>
  )
}
