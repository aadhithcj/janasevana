import s from './Slip.module.css';

/**
 * The exact words that will be opened in WhatsApp, set as a note with a
 * teal margin rule. This is the site's signature: you read the message
 * before you send it.
 */
export function MessageQuote({ caption, message, id }: { caption: string; message: string; id?: string }) {
  return (
    <figure className={s.quote}>
      <figcaption className={s.quoteCaption}>{caption}</figcaption>
      <blockquote className={s.quoteText} id={id}>
        {message.split('\n').map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
      </blockquote>
    </figure>
  );
}
