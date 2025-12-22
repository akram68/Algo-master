// pages/ens-panel/components/AdminHeader.tsx
import { BookOpen } from "lucide-react";

interface UserInfo {
  name: string;
  role: string;
  initials: string;
}

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  user?: UserInfo;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Panel Enseignant",
  subtitle = "Algorithmique",
  user = { name: "Prof. gr", role: "Enseignant", initials: "MD" }
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
          </div>
          
          {/* Profil utilisateur */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">{user.initials}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;