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
  category: string;
  type: string;
  location: string;
  level: string;
  salary: string;
  company: string;
  capacity: number;
  companylogo: string;
  long_description: string;
};

type Category = {
  category: string;
  icon: string;
};

type Industry = {
  industry: string;
  icon: string;
};

type JobLevel = {
  level: string;
};

type JobType = {
  type: string;
};

type Company = {
  _id: string;
  company: string;
  about: string;
  logo: string;
  industry: string[];
  company_size: string;
  contact: string[];
};

type GetJob = {
  jobs: Job[];
  totalPages: number;
  jobsNoLimit: Job[];
};

type GetCompanies = {
  companies: Company[] | undefined;
  totalPages: number | undefined;
  companiesNoLimit: Company[] | undefined;
};

type CategoryCounts = {
  [key: string]: number;
};

type CategoryCount = {
  _id: string;
  count: number;
};

type IndexSignature = {
  [key: string]: any;
};

type JobsFilterFrequency = {
  _id: string;
  count: number;
};

type JobsFrequencyData = {
  typeFrequency: JobsFilterFrequency[];
  categoryFrequency: JobsFilterFrequency[];
  levelFrequency: JobsFilterFrequency[];
  salaryFrequency: JobsFilterFrequency[];
};

type IndexSignatureJobsFrequency = {
  [key: string]: JobsFilterFrequency[];
};

type SearchDataList = {
  location: string;
};

type PropertyValueFrequencyData = {
  industryFrequency: PropertyValueFrequency[];
};

type PropertyValueFrequency = {
  _id: string;
  count: number;
};

type User = {
  _id: string;
  userId: string;
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  password: string;
  photo: string;
  accountType: string;
  email_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type CreateUserParam = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email: string;
  password?: string;
  photo?: string;
  accountType: string;
  email_verified: boolean;
};

type FindUserParam = {
  username?: string;
  email?: string;
};
