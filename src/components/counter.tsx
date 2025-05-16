// components/Counter.tsx
import React from "react";
import { useCounterStore } from "../stores/counterStore";
import { useProfileStore } from "../stores/profileStore";

export function Counter() {
  // Use the store hook directly - sync is handled by the middleware
  const { counts, increment, decrement, reset } = useCounterStore();
  const { people, connections } = useProfileStore();

  return (
    <div>
        <h2 className="text-2xl font-bold text-gray-500">what are your connections' counts at?</h2>

      {counts.map(count => (
        <div key={count.id}>
          <i className = "text-gray-700">connection:</i> {people.find(person => person.id === count.id )?.name}  
          <i className = "text-gray-700"> count:</i> {count.num}
        </div>
      ))}
      <div>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
