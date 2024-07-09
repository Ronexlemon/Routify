//import {  Status } from "@prisma/client";
import { Gig, Status } from "@/types/data-type";

export const Gigs: Gig[] = [
    {
      gig_id: "1",
      title: "Shop for me",
      price: 50,
      userId: "user1",
      status: Status.PENDING,
      direction: { source:{latitude:-1.286389,longitude:36.817223} , destination:{latitude:-0.303099,longitude:36.080027} },
      reviews: [],
      histories: []
    },
    {
      gig_id: "2",
      title: "Deliver package",
      price: 30,
      userId: "user2",
      status: Status.ACCEPTED,
      direction: { source:{latitude:-1.286389,longitude:36.817223} , destination:{latitude:-0.303099,longitude:36.080027} },
      reviews: [],
      histories: []
    },
    {
      gig_id: "3",
      title: "Walk the dog",
      price: 20,
      userId: "user3",
      status: Status.COMPLETED,
      direction: { source:{latitude:-1.286389,longitude:36.817223} , destination:{latitude:-0.303099,longitude:36.080027} },
      reviews: [],
      histories: []
    },
    {
      gig_id: "4",
      title: "Clean the house",
      price: 75,
      userId: "user4",
      status: Status.REJECTED,
      direction: { source:{latitude:-1.286389,longitude:36.817223} , destination:{latitude:-0.303099,longitude:36.080027} },
      reviews: [],
      histories: []
    },
    {
      gig_id: "5",
      title: "Fix the sink",
      price: 100,
      userId: "user5",
      status: Status.PENDING,
      direction: { source:{latitude:-1.286389,longitude:36.817223} , destination:{latitude:-0.303099,longitude:36.080027} },
      reviews: [],
      histories: []
    }
  ];
  