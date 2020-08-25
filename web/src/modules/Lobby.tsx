import React, { useState, useCallback } from "react";

export const Lobby = () => {
  const [state, setState] = useState({ name: "", private: "" });
  const onNameChange = useCallback((e) => {
    setState((p) => ({ ...p, name: e.target.value }));
  }, []);

  const onPrivateChange = useCallback((e) => {
    setState((p) => ({ ...p, private: e.target.value }));
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          placeholder="name"
          type="name"
          value={state.name}
          onChange={onNameChange}
        />
        <button>create</button>
        <button>public</button>
        <input
          placeholder="name"
          type=""
          value={state.private}
          onChange={onPrivateChange}
        />
        <button>private</button>
      </div>
    </div>
  );
};
