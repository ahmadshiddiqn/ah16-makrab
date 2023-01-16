import PocketBase from "pocketbase"

const pb = new PocketBase("https://asn-pocketbase.fly.dev")
export default pb
// export async function start_pb() {
//     console.log("Pocketbase init...")
//     await pb.collection('users').authWithPassword("asn1998", "123456789")
// }