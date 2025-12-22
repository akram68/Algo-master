// pages/ens-panel/components/AdminTabs.tsx
import { BarChart3, BookOpen, Edit2, LucideIcon } from "lucide-react";

interface TabItem {
  id: "dashboard" | "courses" | "exercises";
  label: string;
  icon: LucideIcon;
}

interface AdminTabsProps {
  activeTab: "dashboard" | "courses" | "exercises";
  onTabChange: (tab: "dashboard" | "courses" | "exercises") => void;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabItem[] = [
    { id: "dashboard", label: "Tableau de bord", icon: BarChart3 },
    { id: "courses", label: "Cours", icon: BookOpen },
    { id: "exercises", label: "Exercices", icon: Edit2 },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AdminTabs;