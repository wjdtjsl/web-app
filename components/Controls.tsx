import React from 'react';
import { GroupingMethod } from '../types';
import { Users, Layers, Zap, ListOrdered, Shuffle } from 'lucide-react';

interface ControlsProps {
  totalStudents: number;
  setTotalStudents: (val: number) => void;
  groupCount: number;
  setGroupCount: (val: number) => void;
  method: GroupingMethod;
  setMethod: (val: GroupingMethod) => void;
  onGenerate: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  totalStudents,
  setTotalStudents,
  groupCount,
  setGroupCount,
  method,
  setMethod,
  onGenerate,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Student Count Input */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
            <Users className="w-4 h-4 text-indigo-500" />
            <span>전체 학생 수</span>
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="2"
              max="60"
              value={totalStudents}
              onChange={(e) => setTotalStudents(Number(e.target.value))}
              className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <input
              type="number"
              min="2"
              max="100"
              value={totalStudents}
              onChange={(e) => setTotalStudents(Number(e.target.value))}
              className="w-16 text-center border border-slate-300 rounded-lg p-2 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Group Count Input */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>모둠 수</span>
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="2"
              max={Math.floor(totalStudents / 2) || 2}
              value={groupCount}
              onChange={(e) => setGroupCount(Number(e.target.value))}
              className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <input
              type="number"
              min="2"
              max={totalStudents}
              value={groupCount}
              onChange={(e) => setGroupCount(Number(e.target.value))}
              className="w-16 text-center border border-slate-300 rounded-lg p-2 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Method Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-700">편성 방식</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setMethod(GroupingMethod.RANDOM)}
            className={`flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all ${
              method === GroupingMethod.RANDOM
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Shuffle className="w-5 h-5" />
            <span className="font-medium">무작위 섞기</span>
          </button>
          <button
            onClick={() => setMethod(GroupingMethod.SEQUENTIAL)}
            className={`flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all ${
              method === GroupingMethod.SEQUENTIAL
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ListOrdered className="w-5 h-5" />
            <span className="font-medium">번호순 배정</span>
          </button>
        </div>
      </div>

      <button
        onClick={onGenerate}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 active:scale-95"
      >
        <Zap className="w-5 h-5" />
        <span>모둠 편성하기</span>
      </button>
    </div>
  );
};
