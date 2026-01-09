import React from 'react';
import { Group } from '../types';
import { User } from 'lucide-react';

interface GroupListProps {
  groups: Group[];
}

export const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  if (groups.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 animate-fade-in-up">
      {groups.map((group) => (
        <div
          key={group.id}
          className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 text-lg">{group.name}</h3>
            <span className="text-xs font-medium bg-white text-slate-500 px-2 py-1 rounded border border-slate-200">
              {group.students.length}명
            </span>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {group.students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold border border-indigo-100 shadow-sm"
                  title={`${student.number}번 학생`}
                >
                  {student.number}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
