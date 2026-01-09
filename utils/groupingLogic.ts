import { Group, GroupingMethod, Student } from '../types';

/**
 * Generates groups based on inputs.
 * @param totalStudents Total number of students
 * @param groupCount Number of groups to form
 * @param method Distribution method (Random or Sequential)
 * @returns Array of Group objects
 */
export const generateGroups = (
  totalStudents: number,
  groupCount: number,
  method: GroupingMethod
): Group[] => {
  // 1. Create student pool
  let students: Student[] = Array.from({ length: totalStudents }, (_, i) => ({
    id: i + 1,
    number: i + 1,
  }));

  // 2. Process based on method
  if (method === GroupingMethod.RANDOM) {
    // Fisher-Yates Shuffle
    for (let i = students.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [students[i], students[j]] = [students[j], students[i]];
    }
  }

  // 3. Initialize groups
  const groups: Group[] = Array.from({ length: groupCount }, (_, i) => ({
    id: i + 1,
    name: `${i + 1}모둠`,
    students: [],
  }));

  // 4. Distribute
  if (method === GroupingMethod.SEQUENTIAL) {
    // Sequential: Fill group 1, then group 2...
    // To keep it balanced, we calculate base size
    const baseSize = Math.floor(totalStudents / groupCount);
    const remainder = totalStudents % groupCount;

    let studentIndex = 0;
    for (let i = 0; i < groupCount; i++) {
      // If there is a remainder, the first 'remainder' groups get 1 extra student
      const size = baseSize + (i < remainder ? 1 : 0);
      const groupStudents = students.slice(studentIndex, studentIndex + size);
      groups[i].students = groupStudents;
      studentIndex += size;
    }
  } else {
    // Random (Round Robin for balance): Deal like cards
    students.forEach((student, index) => {
      const groupIndex = index % groupCount;
      groups[groupIndex].students.push(student);
    });
    
    // Optional: Sort students inside the group by number for readability
    // logic: groups.forEach(g => g.students.sort((a, b) => a.number - b.number));
    // User often prefers to see the random order assigned, but sorted is easier to find yourself.
    // Let's keep the random order for "Random" mode as it emphasizes the shuffle, 
    // but sort them for "Sequential" implicitly.
    // Let's actually sort them numerically for readability in the final card.
    groups.forEach(g => g.students.sort((a, b) => a.number - b.number));
  }

  return groups;
};
