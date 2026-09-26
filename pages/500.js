import Link from 'next/link';
import { Screen, Notice } from '../components/CommunityUI';
export default function ServerError() { return <Screen title="The page could not load." intro="500 · Something went wrong on our server."><Notice error>Please try again in a moment. If you were submitting a form, check whether it was saved before submitting again.</Notice><Link className="ark-button" href="/">Return home</Link></Screen>; }
