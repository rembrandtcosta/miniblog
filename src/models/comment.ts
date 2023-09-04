export default interface Comment {
  postId: string,
  id: string,
  content: string,
  user: string,
  likes: number,
  isReply: boolean,
  replies: any[],
}
