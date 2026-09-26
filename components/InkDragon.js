import { useEffect, useState } from 'react';
// Layered ink artwork with a code-native still fallback.
// No imported painting, calligraphy, seal, character or promotional artwork.
export default function InkDragon() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setLoaded(true);
    image.onerror = () => setLoaded(false);
    image.src = '/ink-dragon-atlas.png';
    return () => { image.onload = null; image.onerror = null; };
  }, []);
  const spine = 'M470 33 C360 20 327 122 446 160 C607 213 531 314 378 335 C222 357 222 453 374 473 C535 495 489 633 332 602 L279 540';
  return <svg className="ink-dragon" data-ready={loaded} viewBox="0 0 720 760" aria-hidden="true" focusable="false">
    <defs>
      <filter id="soft-ink" x="-5%" y="-10%" width="110%" height="120%"><feGaussianBlur stdDeviation=".7"/></filter>
      <linearGradient id="dragon-wash" x1="0" y1="0" x2="1" y2=".6"><stop stopColor="var(--dragon-deep)"/><stop offset=".48" stopColor="var(--dragon-mid)"/><stop offset="1" stopColor="var(--dragon-deep)"/></linearGradient>
      <linearGradient id="cloud-wash" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--cloud)" stopOpacity=".2"/><stop offset=".5" stopColor="var(--cloud)" stopOpacity=".94"/><stop offset="1" stopColor="var(--cloud)" stopOpacity=".15"/></linearGradient>
      <pattern id="dragon-scales" width="27" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)"><path d="M-13 2Q0 27 14 2Q27 27 41 2M0-9Q14 16 27-9M0 13Q14 38 27 13" fill="none" stroke="var(--scale)" strokeWidth="1.4"/><path d="M1 3Q7 14 12 3M15 14Q21 25 25 14" fill="none" stroke="var(--dragon-highlight)" strokeOpacity=".4"/></pattern>
      <mask id="scaled-body"><path d={spine} fill="none" stroke="white" strokeWidth="73" strokeLinecap="round"/></mask>
    </defs>
    <g className="ink-cloud cloud-back" fill="url(#cloud-wash)" stroke="var(--cloud-line)" strokeOpacity=".5" strokeWidth="1.2" filter="url(#soft-ink)">
      <path d="M16 150C100 165 99 82 151 92C136 42 206 11 240 50C274 8 340 32 332 77C388 49 454 72 441 110C512 84 549 129 621 86C625 139 544 173 459 154C362 134 308 195 209 170C141 155 87 207 16 150Z"/>
      <path d="M392 508C488 462 562 533 607 465C602 432 650 396 680 436C735 443 698 514 633 530C544 553 447 576 392 508Z"/>
      <path d="M110 611C141 559 181 574 202 601C200 547 261 537 278 580C338 550 360 597 340 619C408 593 448 652 540 624C495 685 416 664 346 673C264 698 176 653 110 611Z"/>
    </g>
    <g className="dragon-response dragon-vector">
      <g className="dragon-body">
        <path d="M483 44Q418-8 395 5Q416 37 417 49Q383 23 367 26Q385 63 392 74Q359 55 348 65L378 111" fill="var(--dragon-mid)" stroke="var(--dragon-line)" strokeWidth="2"/>
        <path d={spine} stroke="var(--dragon-line)" strokeWidth="86" fill="none" strokeLinecap="round"/>
        <path d={spine} stroke="url(#dragon-wash)" strokeWidth="79" fill="none" strokeLinecap="round"/>
        <rect x="150" y="0" width="470" height="720" fill="url(#dragon-scales)" mask="url(#scaled-body)"/>
        <path d="M466 33C382 36 370 101 454 131C634 193 561 337 384 363C260 381 278 425 379 439C561 465 540 645 352 640" stroke="var(--dragon-highlight)" strokeOpacity=".68" strokeWidth="8" fill="none"/>
        <g fill="var(--dragon-deep)" stroke="var(--dragon-line)" strokeWidth="1.5">
          <path d="M488 122L489 88L513 139L541 120L540 159L574 154L559 190L593 202L565 221L590 254L552 254L569 283L528 282L532 318L489 309L478 345L449 326L420 363L407 344"/>
          <path d="M271 365L242 345L245 390L212 393L239 422L214 447L257 450L251 478L291 468L297 499L324 477"/>
          <path d="M530 523L553 538L529 556L549 580L520 593L529 619L492 622L492 652L457 646L444 675L415 659L390 683L376 662"/>
        </g>
        <g className="dragon-limbs" fill="var(--dragon-mid)" stroke="var(--dragon-line)" strokeWidth="3" strokeLinejoin="round">
          <path d="M514 213Q560 213 571 245L564 275L594 285L617 270L613 294L591 303L622 311L634 299L631 319L609 327L578 311L551 317L532 306L550 296L531 262L498 253Z"/>
          <path d="M360 475Q355 523 315 528L298 558L312 577L334 575L317 591L302 589L306 611L320 615L302 622L287 604L271 611L268 630L252 618L256 593L279 569L281 519L317 479Z"/>
          <path d="M383 320Q344 292 354 267L335 253L321 270L317 248L325 239L305 235L287 248L290 229L310 218L341 225L359 220L374 231L366 244L393 267L421 280Z"/>
        </g>
        <g stroke="var(--dragon-highlight)" fill="none" opacity=".7"><path d="M546 241L560 250M546 252L557 262M283 535L299 538M283 545L297 548M365 280L380 275"/></g>
      </g>
      <g className="dragon-head-shift"><g className="dragon-head">
        <g fill="var(--dragon-mid)" stroke="var(--dragon-line)" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M312 508Q240 474 244 407Q213 438 230 477Q189 450 166 383Q160 447 207 492Q145 467 125 416Q128 479 189 515Q131 503 104 477Q129 526 178 542L235 570Z"/>
          <path d="M264 484L250 438L245 411L251 375L263 419L268 438L276 456L288 406L304 382L300 427L286 484Z" fill="var(--horn)"/>
          <path d="M278 477Q242 468 222 493L205 512L175 509L157 521L139 523L128 540L140 553L165 552L177 567L166 584Q196 603 217 578L251 580L272 555L305 542L313 516Z" fill="var(--dragon-mid)"/>
          <path d="M172 550Q173 566 201 563L227 548L216 576Q193 598 167 579L158 567Z" fill="var(--mouth)"/>
          <path d="M162 551L176 552L180 564L184 551M203 558L210 569L215 551" fill="var(--horn)"/>
          <path d="M192 514Q213 495 237 510L222 521L201 524Z" fill="var(--eye)"/>
          <path d="M220 507L216 521" stroke="var(--dragon-deep)" strokeWidth="5"/>
          <path d="M146 520Q167 512 173 528L157 538L136 536Z" fill="var(--dragon-deep)"/>
          <path d="M246 540Q220 579 236 620Q217 603 216 591Q212 625 188 642Q201 607 192 586M279 542Q273 578 292 603Q255 591 255 564"/>
        </g>
        <g className="dragon-whiskers" fill="none" stroke="var(--dragon-line)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M161 539C105 546 89 517 68 532C37 554 105 586 114 555M169 543C103 570 159 633 95 626C48 621 73 582 93 607"/>
          <path d="M229 540Q263 560 270 590M227 541Q264 544 291 568" strokeWidth="1.5"/>
        </g>
        <g fill="none" stroke="var(--dragon-highlight)" strokeWidth="1.3" opacity=".8"><path d="M148 465Q175 500 217 520M184 440Q209 494 238 505M222 446L246 492M244 509L254 521L269 515M240 534L251 544L263 533M277 502L291 516M278 521L291 529"/></g>
      </g></g>
    </g>
    <g className="dragon-painted" opacity={loaded ? 1 : 0}>
      <g className="dragon-body"><svg x="140" y="-30" width="510" height="660" viewBox="0 0 810 1024" overflow="hidden"><image href="/ink-dragon-atlas.png" width="1536" height="1024" onLoad={() => setLoaded(true)} onError={() => setLoaded(false)} /></svg></g>
      <g className="dragon-head-shift"><g className="dragon-head"><svg x="10" y="325" width="400" height="440" viewBox="810 160 726 800" overflow="hidden"><image href="/ink-dragon-atlas.png" width="1536" height="1024" /></svg></g></g>
      <g className="dragon-whiskers" fill="none" stroke="var(--dragon-line)" strokeWidth="1.4" opacity=".8"><path d="M154 618C95 605 54 632 94 650C127 666 125 635 101 641M150 626C131 673 192 701 144 731"/></g>
    </g>
    <g className="ink-cloud cloud-front" fill="url(#cloud-wash)" stroke="var(--cloud-line)" strokeOpacity=".5" strokeWidth="1.3" filter="url(#soft-ink)">
      <path d="M321 297C370 279 422 306 453 270C452 236 490 223 510 245C539 214 577 238 567 259C629 236 637 293 689 268C667 327 600 319 552 327C465 348 399 318 321 337Q290 338 277 323Q295 302 321 297Z"/>
      <path d="M21 716C76 666 103 694 121 678C146 633 185 645 198 673C230 647 267 666 263 688C322 663 340 712 387 688C434 662 472 690 541 670C596 645 655 672 699 630C682 700 604 739 524 731L17 758Z"/>
      <path d="M496 99Q548 56 583 88C585 59 628 48 645 81C674 55 704 82 696 107Q648 147 592 126Q541 144 496 125Z"/>
    </g>
    <g className="ink-cloud cloud-detail" fill="none" stroke="var(--cloud-line)" strokeWidth="1.5"><path d="M340 314Q399 300 431 315T536 301Q575 288 618 301M72 715Q135 690 159 708T269 707M546 113Q586 94 617 108T685 95"/></g>
  </svg>;
}
