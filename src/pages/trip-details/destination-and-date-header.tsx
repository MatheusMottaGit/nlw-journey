import { MapPin, Calendar, Settings2 } from "lucide-react";
import Button from "../../components/button";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface DestinationAndDateHeaderProps {
  tripId?: string
}

type Trip = {
  id: string,
  destination: string,
  starts_at: Date,
  ends_at: Date,
  is_confirmed: boolean
}

type TripDetailsApiResponse = {
  trip: Trip
}

export function DestinationAndDateHeader({ tripId }: DestinationAndDateHeaderProps) {
  const [trip, setTrip] = useState<Trip | null>(null)

  async function getTripDetails(){
    const response = await api.get<TripDetailsApiResponse>(`/trips/${tripId}`)
    setTrip(response.data.trip)
  }

  useEffect(() => {
    getTripDetails()
  }, [tripId])

  function formatTripDetailDate(date?: Date) {
    if(!date) return

    const formatedDate = format(date, "d' de 'LLL")

    return formatedDate
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          
          <span className="text-zinc-100">
            {formatTripDetailDate(trip?.starts_at)}
            {" "}a{" "}
            {formatTripDetailDate(trip?.ends_at)}
          </span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}
