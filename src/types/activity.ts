export type TripActivitiesApiResponse = {
  activities: Activity[];
}

export type Activity = {
  date: string;
  activities: {
    id: string, 
    title: string, 
    occurs_at: string
  }[]
};