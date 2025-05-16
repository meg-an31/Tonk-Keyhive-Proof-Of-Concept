// components/profile.tsx
import React from "react";
import { useProfileStore } from "../stores/profileStore";

export function Profile() {
  // Use the store hook directly - sync is handled by the middleware
  const { people, connections, update_connection} = useProfileStore();
  const userId = Number(localStorage.getItem('username'));
  return (
    <div>
      <div>
      <h2 className="text-2xl font-bold text-gray-500">update your connections</h2>
        {people.map((person) => (
        <div key={person.id}>
            <button onClick={() => update_connection(person.id)}>{person.name}</button> 
            <span> : </span>
              {connections[userId][person.id]}
        </div>))}
      </div>
    </div>
  );
}
