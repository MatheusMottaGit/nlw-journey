import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";

interface ActivitiesProps {
  tripId?: string;
}

interface TripActivitiesApiResponse {
  activities: Activity[];
}

type Activity = {
  date: string;
  activities: {
    id: string, 
    title: string, 
    occurs_at: string
  }[]
};

export function Activities({ tripId }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>([]);

  async function getTripActivities() {
    const response = await api.get<TripActivitiesApiResponse>(
      `/trips/${tripId}/activities`
    );
    setActivities(response.data.activities);
  }

  useEffect(() => {
    getTripActivities();
  }, [tripId]);

  return (
    <div className="space-y-8">
      {activities.map((act) => {
        return (
          <div key={act.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">
                {act.date}
              </span>
              <span className="text-xs text-zinc-500">Domingo</span>
            </div>

            {act.activities.length > 0 ? (
              <>
                {act.activities.map((activity) => (
                  <div key={activity.id} className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                      <CircleCheck className="size-5 text-lime-300" />
                      <span className="text-zinc-100">{activity.title}</span>
                      <span className="text-zinc-400 text-sm ml-auto">
                        {activity.occurs_at}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
