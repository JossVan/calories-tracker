import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import {
  ActivityActions,
  activityReducer,
  ActivityState,
  initialState,
} from "../reducers/activity.reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
  children: ReactNode;
};
type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriesBurned: number;
  netCalories: number;
  catetoryName: (category: Activity["category"]) => string[];
  isEmptyActivities: boolean;
};
export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const { activities } = state;
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );

  const catetoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities]
  );

  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesBurned,
        caloriesConsumed,
        netCalories,
        catetoryName,
        isEmptyActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
