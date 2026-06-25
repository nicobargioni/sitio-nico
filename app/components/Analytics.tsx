import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Google Analytics 4. Solo se renderiza si hay un Measurement ID cargado
 * en site.gaMeasurementId (lib/site.ts).
 */
export default function Analytics() {
  const id = site.gaMeasurementId;
  if (!id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
