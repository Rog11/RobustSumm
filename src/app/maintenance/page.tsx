"use client";
import React from 'react';

const MaintenancePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Site Under Maintenance</h1>
        <p className="text-lg text-gray-600">We are currently performing scheduled maintenance.</p>
        <p className="text-lg text-gray-600">We'll be back shortly!</p>
      </div>
    </div>
  );
};

export default MaintenancePage;
