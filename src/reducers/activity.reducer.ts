import { Activity } from "../types";

export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-activity";
      payload: { id: Activity["id"] };
    }
  | {
      type: "delete-activity";
      payload: { id: Activity["id"] };
    }
  | {
      type: "restart-activity";
    };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivities = () => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type == "save-activity") {
    let updatedActivity: Activity[] = [];

    if (state.activeId) {
      updatedActivity = state.activities.map((activity) => {
        if (activity.id === state.activeId) {
          return action.payload.newActivity;
        }
        return activity;
      });
    } else {
      updatedActivity = [...state.activities, action.payload.newActivity];
    }
    return {
      ...state,
      activities: updatedActivity,
      activeId: "",
    };
  } else if (action.type == "set-activity") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  } else if (action.type == "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  } else if (action.type == "restart-activity") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
