import { SoaRecord } from "dns";

export enum Role {
  CLIENT = 'CLIENT',
  JOB = 'JOB',
}

export enum Status {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export interface User {
  userid: string;
  phonenumber: string;
  password: string;
  name?: string | null;
  gigs?: Gig[];
  role?: Role;
}

export interface GigNavigationData{
  gig_id: string;
  title: string;
  price: number;
  userId: string;
  direction: source

}

interface source{
  latitude:number,
  longitude:number
}

export interface Gig {
  gig_id: string;
  title: string;
  price: number;
  userId: string;
  status: Status;
  direction?: Direction | null;
  reviews?: Review[];
  histories?: History[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  gigId: string;
}

export interface History {
  id: string;
  gigId: string;
  date: Date;
  price: number;
}

export interface Direction {
  direction_id?: string;
  source?: Source | null;
  destination?: Destination | null;
  gigId?: string;
}

export interface Source {
  source_id?: string;
  latitude?: number | null;
  longitude?: number | null;
  directionId?: string;
}

export interface Destination {
  id?: string;
  latitude?: number | null;
  longitude?: number | null;
  directionId?: string;
}


export interface GigData {  
  
    direction: {
      direction_id: string;
      gigId: string;
      source: {
        directionId: string;
        latitude: number;
        longitude: number;
        source_id: string;
      };
    };
    gig_id: string;
    price: number;
    status: string;
    title: string;
    userId: string;

  
  
}