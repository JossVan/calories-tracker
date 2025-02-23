import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useActivity } from "../hooks/useActivity";

export default function ActivityList() {
  const { state, dispatch, catetoryName, isEmptyActivities } = useActivity();
  const { activities } = state;

  return (
    <>
      <h2 className="font-bold text-4xl text-slate-600 text-center">
        Comida y Actividades
      </h2>
      {isEmptyActivities ? (
        <p className="text-center mt-10">No hay actividades</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
          >
            <div className="space-y-2 relative">
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {catetoryName(+activity.category)}
              </p>
              <p className="text-2xl font-bold pt-5">{activity.name}</p>
              <p className="font-black text-4xl text-lime-500">
                {activity.calories} <span>Calorias</span>
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activity",
                    payload: { id: activity.id },
                  })
                }
              >
                <PencilSquareIcon className="w-8 h-8 text-gray-800" />
              </button>

              <button
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  })
                }
              >
                <XCircleIcon className="w-8 h-8 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
