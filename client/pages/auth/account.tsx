import { Box } from '@chakra-ui/layout'
import { getSession, useSession } from 'next-auth/react'
import NextImage from 'next/image'

function Account({ session }: any) {
  // const { data, status } = useSession({ required: true })

  console.log('in props', session)

  return (
    <Box>
      <NextImage
        src={session?.user?.image}
        width={20}
        height={20}
        alt="Image"
      />
      <p>Welcome {session?.user?.name} </p>
    </Box>
  )
}

// export async function getServerSideProps(context: any) {
//   const session = await getSession(context)

//   return {
//     props: { session },
//   }
// }

export default Account
