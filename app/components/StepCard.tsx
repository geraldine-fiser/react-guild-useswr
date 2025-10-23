"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle, Circle } from "lucide-react";
import CodeBlock from "./CodeBlock";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  code?: string;
  language?: string;
  isCompleted?: boolean;
  children?: React.ReactNode;
}

export default function StepCard({
  stepNumber,
  title,
  description,
  code,
  language = "typescript",
  isCompleted = false,
  children,
}: StepCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {isCompleted ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded">
                Step {stepNumber}
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          </div>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="pt-4 space-y-4">
            {code && (
              <CodeBlock code={code} language={language} title="Code Example" />
            )}
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
