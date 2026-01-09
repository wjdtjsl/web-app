import React, { useState, useEffect } from 'react';
import { Controls } from './components/Controls';
import { GroupList } from './components/GroupList';
import { GroupingMethod, Group } from './types';
import { generateGroups } from './utils/groupingLogic';
import { GraduationCap, Sparkles, Copy, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [totalStudents, setTotalStudents] = useState<number>(24);
  const [groupCount, setGroupCount] = useState<number>(6);
  const [method, setMethod] = useState<GroupingMethod>(GroupingMethod.RANDOM);
  const [groups, setGroups] = useState<Group[]>([]);
  const [copied, setCopied] = useState(false);

  // Validate group count when total students changes
  useEffect(() => {
    if (groupCount > totalStudents) {
      setGroupCount(Math.max(2, Math.floor(totalStudents / 2)));
    }
    if (groupCount < 1) {
      setGroupCount(1);
    }
  }, [totalStudents, groupCount]);

  const handleGenerate = () => {
    const newGroups = generateGroups(totalStudents, groupCount, method);
    setGroups(newGroups);
    setCopied(false);
  };

  // Initial generation on mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = () => {
    const text = groups
      .map((g) => {
        const studentList = g.students.map((s) => s.number).join(', ');
        return `[${g.name}] ${studentList}`;
      })
      .join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              모둠 편성 마법사
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500 hidden sm:flex">
             <Sparkles className="w-4 h-4 text-amber-400" />
             <span>쉽고 빠른 학급 관리</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Controls */}
          <div className="lg:w-1/3">
             <div className="lg:sticky lg:top-24">
                <Controls
                  totalStudents={totalStudents}
                  setTotalStudents={setTotalStudents}
                  groupCount={groupCount}
                  setGroupCount={setGroupCount}
                  method={method}
                  setMethod={setMethod}
                  onGenerate={handleGenerate}
                />

                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                  <p className="font-semibold mb-1">💡 사용 팁</p>
                  <ul className="list-disc list-inside space-y-1 opacity-90">
                    <li>학생 수와 모둠 수를 입력하세요.</li>
                    <li>'무작위 섞기'는 공정하게 랜덤으로 배정합니다.</li>
                    <li>모둠 별 인원은 자동으로 균형이 맞춰집니다.</li>
                  </ul>
                </div>
             </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                편성 결과
                <span className="ml-3 text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  총 {groups.length}모둠
                </span>
              </h2>
              
              {groups.length > 0 && (
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    copied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '복사 완료!' : '결과 복사'}</span>
                </button>
              )}
            </div>

            <GroupList groups={groups} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
