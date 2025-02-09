export interface Event {
    name: string;
    time: string;
    month: number;
    day: number;
    year: number;
    place: string;
    org: string;
    org_id: string;
    description: string;
    [key: string]: any;
    isVerified: boolean;
  }