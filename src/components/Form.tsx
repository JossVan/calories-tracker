import { ChangeEvent, FormEvent, useState, Dispatch, useEffect } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity.reducer";
import { v4 as uuidv4 } from "uuid";
export type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const InitialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};
export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(InitialState);

  useEffect(() => {
    if (state.activeId) {
      const activity = state.activities.find(
        (activity) => activity.id === state.activeId
      );
      if (activity) {
        setActivity(activity);
      }
    }
  }, [state.activeId]);
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim().length > 0 && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({
      type: "save-activity",
      payload: { newActivity: activity },
    });

    setActivity({
      ...InitialState,
      id: uuidv4(),
    });
  };
  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="" className="font-bold">
          Categoria:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="name" className="font-bold">
            Actividad:
          </label>
          <input
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, bicicleta"
            value={activity.name}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">
            Calorias:
          </label>
          <input
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg w-full bg-white"
            placeholder="Ej. 300 o 500"
            value={activity.calories}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 w-full p-2 text-white font-bold py-2 uppercase cursor-pointer rounded-md disabled:opacity-10"
          value={
            activity.category == 1 ? "Guardar comida" : "Guardar ejercicio"
          }
          disabled={!isValidActivity()}
        />
      </div>
    </form>
  );
}
