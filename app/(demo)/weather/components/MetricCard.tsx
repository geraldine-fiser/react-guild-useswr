import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  unit?: string;
}

export default function MetricCard({
  label,
  value,
  icon: Icon,
  unit,
}: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {label}
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {value}{" "}
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
