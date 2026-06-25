/**
 * Inserta datos estructurados (schema.org JSON-LD) en la página.
 * Renderiza un <script type="application/ld+json"> — válido en export estático.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
