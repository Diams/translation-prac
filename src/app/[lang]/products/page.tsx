import { initTranslations } from "@/utils/i18n";

export default async function Page(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const { t } = await initTranslations({
    locale: lang,
    namespaces: ["common"],
  });
  return <main>
    <div>{t("products")}</div>
  </main>
}
