import Link from 'next/link';
import { Screen, Empty } from '../components/CommunityUI';
export default function NotFound() { return <Screen title="A page lost in the clouds." intro="404 · This address does not lead to a page on Shonen Ark."><Empty title="Pick up another thread.">The page may have moved, or the link may be incomplete.</Empty><div className="edition-actions"><Link className="ark-button" href="/">Return home</Link><Link className="ark-button secondary" href="/theories">Explore theories</Link></div></Screen>; }
