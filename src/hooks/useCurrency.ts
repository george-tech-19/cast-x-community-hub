import { useEffect, useMemo, useState } from "react";

type CurrencySettings = {
  currency: string;
  locale: string;
  rate: number;
};

const currencyByRegion: Record<string, CurrencySettings> = {
  CM: { currency: "XAF", locale: "fr-CM", rate: 650 },
  NG: { currency: "NGN", locale: "en-NG", rate: 1500 },
  US: { currency: "USD", locale: "en-US", rate: 1 },
  GB: { currency: "GBP", locale: "en-GB", rate: 1 },
  EU: { currency: "EUR", locale: "en-IE", rate: 1 },
};

const getRegionFromLocale = (locale: string) => {
  const parts = locale.split(/[-_]/);
  return parts[1]?.toUpperCase();
};

const getDefaultSettings = (): CurrencySettings => ({
  currency: "USD",
  locale: "en-US",
  rate: 1,
});

export const useCurrency = () => {
  const [settings, setSettings] = useState<CurrencySettings>(getDefaultSettings);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const locale = navigator.languages?.[0] || navigator.language || "en-US";
    const region = getRegionFromLocale(locale);
    const mappedSettings = region ? currencyByRegion[region] : undefined;

    setSettings(mappedSettings ?? currencyByRegion[region ?? ""] ?? getDefaultSettings());
  }, []);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(settings.locale, {
        style: "currency",
        currency: settings.currency,
        maximumFractionDigits: 0,
      }),
    [settings]
  );

  const formatPrice = (amount: number) => formatter.format(amount * settings.rate);

  return {
    ...settings,
    formatPrice,
  };
};
