type FooterList = {
  about: {
    title: string;
    items: string[];
  };
  resources: {
    title: string;
    items: string[];
  };
};

type SearchParamProps = {
  searchParams: { [key: string]: string | string[] };
};

type Country = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: string;
  subregion: string;
  subregion_id: string;
  nationality: string;
  timezones: Timezone[];
  translations: { [key: string]: string };
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
};

type Timezone = {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
};

type Job = {
  _id: string;
  title: string;
  description: string;
  category: {
    name: string;
    icon: string;
  };
  type: string;
  location: string;
  level: string;
  salary: string;
  company: string;
  capacity: number;
  companylogo: string;
};

type CategoryCounts = {
  [key: string]: number;
};

type Category = {
  _id: string;
  category: string;
  icon: string;
};

type CategoryCount = {
  _id: { name: string; icon: string };
  count: number;
};
