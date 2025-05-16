// components/activeUser.tsx
import React, { useState } from "react";
import { useProfileStore } from "../stores/profileStore";

// basic login method, for proof of concept
export default function CurrentUser() {
    const [userId, setUserId] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string>(''); // holds textbox value
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const parsedId = parseInt(inputValue, 10);
        if (!isNaN(parsedId)) {
          setUserId(parsedId);
          localStorage.setItem('username', parsedId.toString());
          setInputValue(''); 
        } else {
          alert('Please enter a valid number');
        }
      }
    };

    const { people, connections } = useProfileStore();
  
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-500">tonk user login</h2>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="User ID"
        />
        <p>Current user ID: {userId !== null ? userId : 'None'}</p>
        <p>Hello {people.find(person => person.id === userId)?.name}</p>
      </div>
    );
  }