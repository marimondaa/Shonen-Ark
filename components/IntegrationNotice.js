import Link from 'next/link';
import { Screen, Notice } from './CommunityUI';

export default function IntegrationNotice({ title = 'Not available yet.' }) {
  return <Screen title={title} intro="This part of Shonen Ark is not available in the current MVP."><Notice>Video uploads, paid subscriptions, AI tools and editorial administration still need service configuration and end-to-end verification. No upload, payment or publication is simulated here.</Notice><div className="flex flex-wrap gap-4"><Link className="ark-button" href="/theories">Explore theories</Link><Link className="ark-button secondary" href="/discovery">Discover anime</Link></div></Screen>;
}
