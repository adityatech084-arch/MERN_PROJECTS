import React from 'react';

export default function SidebarSkeleton() {
  return (
    <div className="min-h-screen flex bg-gray-100 animate-pulse">
      {/* Sidebar Skeleton */}
      <aside className="hidden md:flex flex-col w-64 bg-white p-6 border-r shadow-sm">
        <div className="h-8 w-32 bg-gray-300 rounded mb-10" />

        {/* Nav Items */}
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 w-48 bg-gray-300 rounded" />
          ))}
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-6 space-y-4">
        <div className="h-8 w-40 bg-gray-300 rounded" />
        <div className="h-4 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
        <div className="h-4 w-1/2 bg-gray-300 rounded" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-300 rounded-lg" />
          ))}
        </div>
      </main>
    </div>
  );
}
