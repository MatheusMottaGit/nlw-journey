import { MapPin, Calendar, Settings2, Tag, X } from "lucide-react";
import Button from "../../components/button";
import { api } from "../../utils/api";
import { FormEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import Modal from "../../components/modal";
import { DateRange, DayPicker } from "react-day-picker";
import { Trip, TripDetailsApiResponse } from "../../types/trip";
import { toast } from "sonner";

interface DestinationAndDateHeaderProps {
  tripId?: string;
}

export function DestinationAndDateHeader({ tripId }: DestinationAndDateHeaderProps) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isPlaceAndDateModalOpen, setIsPlaceAndDateModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  function openPlaceAndDateModal() {
    setIsPlaceAndDateModalOpen(true);
  }

  function closePlaceAndDateModal() {
    setIsPlaceAndDateModalOpen(false);
  }

  async function getTripDetails() {
    const response = await api.get<TripDetailsApiResponse>(`/trips/${tripId}`);
    setTrip(response.data.trip);
  }

  async function updatePlaceAndDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const destination = formData.get('destination')?.toString()

    if(!destination) return

    if(!dateRange?.from || !dateRange.to) return

    const updatePlaceAndDatePromise = api.put(`/trips/${tripId}`, { 
      destination,
      starts_at: dateRange.from,
      ends_at: dateRange.to
    })

    toast.promise(updatePlaceAndDatePromise, {
      loading: "Atualizando informações...",
      success: "Informações atualizadas!",
      error: "Ops! Ocorreu um erro na atualização..."
    })

    await updatePlaceAndDatePromise

    window.document.location.reload()
  }

  useEffect(() => {
    getTripDetails();
  }, [tripId]);

  function formatTripDetailDate(date?: Date) {
    if (!date) return;

    const formatedDate = format(date, "d' de 'LLL");

    return formatedDate;
  }

  const displayedRange = dateRange && dateRange.from && dateRange.to ? format(dateRange.from, "d' de 'LLL")
  .concat(' a ').concat(format(dateRange.to, "d' de 'LLL"))
  : null

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
            {formatTripDetailDate(trip?.starts_at)} a{" "}
            {formatTripDetailDate(trip?.ends_at)}
          </span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button onClick={openPlaceAndDateModal} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>

      {isPlaceAndDateModalOpen && (
        <Modal
          title="Alterar local/data"
          description="Caso tenha dado algum dado errado anteriormente, altere-o abaixo!"
          onClose={closePlaceAndDateModal}
        >
          <form onSubmit={updatePlaceAndDate} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Tag className="text-zinc-400 size-5" />
              <input
                placeholder="Alterar local"
                name="destination"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-2 flex-1 text-left"
                onClick={() => setIsDatePickerOpen(true)}
              >
                <Calendar className="size-5 text-zinc-400" />

                <span className="text-zinc-400">
                  {displayedRange ?? "Alterar data"}
                </span>
              </button>

              {isDatePickerOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                  <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="font-lg font-semibold">
                          Selecione a data
                        </h2>
                        <button>
                          <X
                            className="size-5 text-zinc-400"
                            onClick={() => setIsDatePickerOpen(false)}
                          />
                        </button>
                      </div>
                    </div>

                    <DayPicker
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                    />
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" size="full">
              Salvar mudança
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
