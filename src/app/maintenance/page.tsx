"use client";

const MaintenancePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="text-center p-8 bg-base-100 shadow-lg rounded-lg max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Site Under Maintenance</h1>
        <p className="text-lg opacity-80">
          We are currently performing scheduled maintenance.
        </p>
        <p className="text-lg opacity-80">We'll be back shortly!</p>
      </div>
    </div>
  );
};

export default MaintenancePage;
