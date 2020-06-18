import React from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

import "./App.css";

const insuranceRepMachine = Machine({
  id: "insuranceRep",
  initial: "editForm",
  context: {
    value: "",
  },
  states: {
    editForm: {
      id: "editForm",
      on: {
        validate: "validateForm",
      },
    },
    validateForm: {
      id: "validateForm",
      on: {
        formIsValid: "missionCompleted",
        formIsNotValid: "editForm",
      },
    },
    missionCompleted: {
      id: "missionCompleted",
      type: "final",
      on: {},
    },
  },
});

function App() {
  const [current, send] = useMachine(insuranceRepMachine);
  return (
    <div className="App">
      {current.matches("editForm") && (
        <header className="App-header">
          <label className="TextInput">
            <h3>שם מבוטח</h3>
            <input name="clientName" type="text" />
          </label>
          <label className="TextInput">
            <h3>תעודת זהות</h3>
            <input name="clientId" type="text" />
          </label>
          <button
            onClick={() => {
              send("validate");
            }}
          >
            סיימתי
          </button>
        </header>
      )}

      {current.matches("validateForm") && <span>בבדיקה </span>}
    </div>
  );
}

export default App;
