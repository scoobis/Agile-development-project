import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { specifikProdukt } = router.query

  return <p>Post: {specifikProdukt}</p>
}

export default Post
