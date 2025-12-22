// pages/ens-panel/AdminPanel.tsx
import { useState } from "react";
import AdminHeader from "../../components/ens-panel/AdminTab/AdminHeader";
import AdminTabs from "../../components/ens-panel/AdminTab/AdminTabs";
import CourseList from "./CourseListPage";
import ExerciseList from "./ExerciceListPage";
import Statistics from "./Statistics";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "courses" | "exercises"
  >("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader />
      
      {/* Navigation */}
      <AdminTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && <Statistics />}
        {activeTab === "courses" && <CourseList />}
        {activeTab === "exercises" && <ExerciseList />}
      </main>
    </div>
  );
}

export default AdminPanel;