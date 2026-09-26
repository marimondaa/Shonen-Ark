import Head from 'next/head';
import Link from 'next/link';
import { Screen, Empty, Notice } from '../components/CommunityUI';
import { NimbusCloud } from '../components/InkCursor';
export default function DesignPreview() {
  return <Screen title="Lettering & ink." intro="A working visual study. Switch the appearance in the navigation to compare both palettes."><Head><meta name="robots" content="noindex,nofollow" /></Head><div className="type-study">
    <section><h2>Comic Sans · throughout the Ark</h2><p className="comic-sample" lang="fr">Éclats, révélations &amp; mystères.<br />À cœur ouvert : où mène l’enquête ?<br />Çà, œ, æ, « guillemets », 0123456789.</p><p>System Comic Sans MS carries headings, navigation, forms and reading text. Devices without it use Comic Sans, then Segoe UI or sans-serif. No Windows font files are redistributed.</p></section>
    <section><h2>A readable everyday voice</h2><p className="literary-sample">Every story has another reading.</p><p className="body-sample">Comic Sans carries paragraphs, navigation and forms. Accents remain clear: Émilie, cœur, déjà, Noël, naïve, façade; ¿Qué pasó? ¡Mañana! niño, pingüino; € £ ¥ © →. 日本語 uses your device’s script fallback.</p></section>
    <section><h2>Controls you can read</h2><form className="ark-form" onSubmit={event => event.preventDefault()}><label>Sample display name<input defaultValue="Émilie – cœur de lilas" /></label><label>Sample theory<textarea defaultValue="Une idée, des indices, puis votre interprétation." rows={3} /></label><div className="flex flex-wrap gap-4"><Link href="/theories" className="ark-button">Explore theories</Link><button className="ark-button" disabled>Unavailable</button></div><small>These sample fields do not save or send data.</small></form></section>
    <section><h2>A cloud beneath your pointer</h2><div className="cloud-sample"><NimbusCloud /></div><p>An original ink cloud settles beneath the mouse pointer on every page. The native pointer stays visible. Text fields, touch and reduced motion keep ordinary controls.</p><Empty title="Your next theory starts here.">A rounded ink contour gives an empty state a shape without hiding the next action.</Empty><Notice>Informative states use readable text and a quiet lilac surface.</Notice></section>
  </div></Screen>;
}
