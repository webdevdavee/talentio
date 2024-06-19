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
  applied: number;
  companyId: string;
  companylogo: string;
  createdAt: Date;
};

type Category = {
  category: string;
  icon: string;
};

type Industry = {
  industry: string;
  icon: string;
};

type JobType = {
  type: string;
};

type AllUsers = {
  userId: string;
  name: string;
  email: string;
  image: string;
  password: string;
  accountType: string;
  securityQuestion: { question: string; answer: string };
  provider: string;
};

type User = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  password?: string;
  image: string;
  accountType: string;
  securityQuestion: { question: string; answer: string };
  provider: string;
  createdAt: Date;
  updatedAt: Date;
};

type CompanyUser = {
  _id: string;
  userId: string;
  name: string;
  email: string;
  password: string;
  image: string;
  accountType: string;
  companyId: string;
  securityQuestion: { question: string; answer: string };
  provider: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

type Company = {
  _id: string;
  userId: string;
  company: string;
  email: string;
  password: string;
  industry: string[];
  about: string;
  logo: string;
  accountType: string;
  securityQuestion: { question: string; answer: string };
  company_size: string;
  contact: string[];
  createdAt: Date;
  updatedAt: Date;
};

type GetJob = {
  jobs: Job[];
  totalPages: number;
  jobsNoLimit: Job[];
};

type GetJob2 = {
  jobs: Job[];
  totalPages: number;
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

type HandleJobFilter = {
  typeFilter?: string[];
  categoryFilter?: string[];
  levelFilter?: string[];
  salaryFilter?: string[];
  search?: string[];
  page?: number;
  limit?: number;
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

type addNewUserFieldParams = {
  email: string;
  accountType: string;
  newFieldName: string;
  fieldData: any;
};

type updateUserFieldParams = {
  userId: string;
  field: string;
  fieldData: any;
};

type UserSavedJobs = {
  userId: string;
  jobId: string;
};

type UserApplication = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  nationality: string;
  coverletter: string;
  resume: string;
  jobId: string;
  userId: string;
  score: number;
  stage: string;
  job: Job;
  createdAt: Date;
};

type CheckedItems = {
  [key: string]: boolean;
};

type PageView = {
  _id: string;
  companyId: string;
  viewCount: number;
  views: { date: Date }[];
};

type UserApplicationDetails = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  nationality: string;
  coverletter: string;
  userId: string;
  createdAt: Date;
};
