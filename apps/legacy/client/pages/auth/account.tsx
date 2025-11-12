import { Box } from '@chakra-ui/layout'
import NextImage from 'next/image'

function Account({ session }: any) {
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
