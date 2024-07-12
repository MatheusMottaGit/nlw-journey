export type Trip = {
  id: string;
  destination: string;
  starts_at: Date;
  ends_at: Date;
  is_confirmed: boolean;
};

export type TripDetailsApiResponse = {
  trip: Trip;
};

export type CreateTripApiResponse = {
  tripId: string
}