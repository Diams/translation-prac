import { initTranslations } from "@/utils/i18n";

interface TranslationsProviderProps {
  params: {
    lang: string;
  };
}

export default async function Page(props: TranslationsProviderProps) {
  const { lang } = await props.params;
  const { t } = await initTranslations({
    locale: lang,
    namespaces: ["common"],
  });
  return <main>
    <div>{t("products")}</div>
  </main>
}
