import React from "react";
import { Route, Routes } from "react-router-dom";
import { Counter } from "../components/counter";
import { Profile } from "../components/profile";
import CurrentUser from "../components/activeUser";

/**
 * A simple Hello World view component that demonstrates basic layout and styling
 */
const HelloWorld = () => {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <section className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">connection management proof of concept</h1>
          </div>
          <div><Routes>
            <Route path="/" element={<CurrentUser />} />            
          </Routes></div>
          <br></br>
          <div><Routes>
            <Route path="/" element={<Profile />} />
          </Routes></div>
          <br></br>
          <div><Routes>
          <Route path="/" element={<Counter />} />
          </Routes></div>
        </div>
      </section>
    </main>
  );
};

export default HelloWorld;
