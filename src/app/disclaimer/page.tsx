import { PageHero } from "@/components/layout/page-hero";
import { disclaimerText, mreDisclaimer } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: "Important legal information regarding the use of this website and our public disclosures.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        title="Disclaimer"
        eyebrow="Legal"
        lede="Important legal information regarding the use of this website and our public disclosures."
        crumbs={[{ name: "Disclaimer", path: "/disclaimer" }]}
      />
      <section className="on-light section bg-paper">
        <div className="shell max-w-3xl">
          <div className="prose-article space-y-6 text-ink-800 leading-relaxed">
            <div>
              <h2 className="display-sm text-ink-900 mb-3">Please Read These Terms Carefully Before Using This Website</h2>
              <p>{disclaimerText}</p>
              <p className="mt-3">
                This website is owned and operated by Loyalist Exploration Limited (&quot;Loyalist&quot; or the &quot;Company&quot;). By using this website, you agree to the following terms and conditions. If you do not agree to them, you should not use this website.
              </p>
            </div>

            <div>
              <h2 className="display-sm text-ink-900 mb-3">Cautionary Note Regarding Forward-Looking Information</h2>
              <p>
                This website contains &quot;forward-looking information&quot; within the meaning of applicable Canadian securities legislation and &quot;forward-looking statements&quot; within the meaning of the United States Private Securities Litigation Reform Act of 1995. Forward-looking information is based on the opinions, expectations, and estimates of management at the date the statements are made, and is subject to a variety of risks, uncertainties, and other factors that could cause actual events or results to differ materially from those projected.
              </p>
              <p className="mt-3">
                Such statements or information are identified with words such as &quot;anticipate,&quot; &quot;believe,&quot; &quot;expect,&quot; &quot;plan,&quot; &quot;intend,&quot; &quot;potential,&quot; &quot;estimate,&quot; &quot;propose,&quot; &quot;project,&quot; &quot;outlook,&quot; &quot;foresee,&quot; or similar words suggesting future outcomes, and include statements regarding planned mineral resource estimates, preliminary economic assessments, exploration programs, permitting schedules, and potential development decisions.
              </p>
            </div>

            <div>
              <h2 className="display-sm text-ink-900 mb-3">Mineral Resources and Historical Estimates</h2>
              <p>
                {mreDisclaimer} Historical mineral resource estimates referenced on project pages are unclassified, do not comply with CIM Definition Standards on Mineral Resources and Mineral Reserves as required by NI 43-101, and are not treated by the Company as current mineral resources; please refer to the specific statements and footnotes on each project page.
              </p>
            </div>

            <div>
              <h2 className="display-sm text-ink-900 mb-3">Disclaimer to United States Investors</h2>
              <p>
                This website does not constitute an offer to sell or a solicitation of an offer to buy securities in the United States. Terms such as &quot;measured mineral resource,&quot; &quot;indicated mineral resource,&quot; and &quot;inferred mineral resource&quot; are recognized and required by Canadian securities laws under NI 43-101, but the United States Securities and Exchange Commission does not recognize them under standard Industry Guide 7 rules. Mineralization may not be classified as a &quot;reserve&quot; unless the determination has been made that it could be economically and legally produced or extracted.
              </p>
            </div>

            <div>
              <h2 className="display-sm text-ink-900 mb-3">Exclusion of Liability</h2>
              <p>Loyalist Exploration Limited and its officers, directors, and employees shall not be liable for any claims, expenses, damages (including direct, indirect, special, or consequential damages), or loss arising from:</p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>the use of or reliance on information contained in this website;</li>
                <li>any inaccuracy or omission in such information or failure to keep the information current;</li>
                <li>use of any third-party websites linked to this website;</li>
                <li>any Internet software used in connection with this website or computer viruses or other destructive programs encountered as a result of using this website;</li>
                <li>any delays, inaccuracies, or errors in, or in the transmission of, any stock price quotes or historical price data;</li>
                <li>any other matter connected with this website.</li>
              </ul>
            </div>

            <div>
              <h2 className="display-sm text-ink-900 mb-3">Currency of Website &amp; No Incorporation by Reference</h2>
              <p>
                Loyalist Exploration Limited updates the information on this website regularly. However, such information is not intended to be a comprehensive review of all matters concerning the Company. No information included on this website shall be deemed to be incorporated by reference into any of the Company&apos;s continuous disclosure filings on SEDAR+.
              </p>
            </div>

            <div>
              <h2 className="display-sm text-ink-900 mb-3">Website is Provided as a Service Only</h2>
              <p>
                This website is not intended as a solicitation or offering of securities in any jurisdiction. Readers are urged to review the Company&apos;s continuous disclosure filings on SEDAR+ at www.sedarplus.ca for complete, official regulatory disclosures.
              </p>
            </div>

            <div>
              <h2 className="display-sm text-ink-900 mb-3">Privacy Statement</h2>
              <p>
                Loyalist Exploration Limited&apos;s website does not collect any personal information about visitors other than that which is provided knowingly and voluntarily (e.g. through the newsletter subscription or contact forms).
              </p>
            </div>

            <div>
              <h2 className="display-sm text-ink-900 mb-3">Website Imagery</h2>
              <p>
                Landscape and mineral photography on this website is illustrative. Maps and geological figures captioned on project pages are official Company materials.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
