export type Launch = {
  id: string;
  name: string;
  net: string; // launch time, ISO
  provider: string;
  pad: string;
  location: string;
  image: string | null;
  status: string;
};
