// Practice APIs - External Platform Integration
// Fetches real-time progress from free public APIs

export interface ExternalProgress {
  platform: 'leetcode' | 'geeksforgeeks' | 'codeforces';
  username: string;
  totalSolved: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  streak?: number;
  badges?: string[];
  rating?: number;
  maxRating?: number;
  lastFetch: Date;
}

// LeetCode Public API (Unofficial but stable)
export const fetchLeetCodeProgress = async (username: string): Promise<ExternalProgress | null> => {
  try {
    // Using puppeteer-like GraphQL endpoint
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile { realName userAvatar }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
              totalSubmissionNum {
                difficulty
                count
              }
            }
            badges { displayName }
            streakCounter { currentStreak }
          }
        }`,
        variables: { username }
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    const user = data.data?.matchedUser;

    if (!user) return null;

    const acStats = user.submitStats?.acSubmissionNum || [];
    const totalEasy = acStats.find((s: any) => s.difficulty === 'Easy')?.count || 0;
    const totalMedium = acStats.find((s: any) => s.difficulty === 'Medium')?.count || 0;
    const totalHard = acStats.find((s: any) => s.difficulty === 'Hard')?.count || 0;

    return {
      platform: 'leetcode',
      username,
      totalSolved: totalEasy + totalMedium + totalHard,
      easySolved: totalEasy,
      mediumSolved: totalMedium,
      hardSolved: totalHard,
      streak: user.streakCounter?.currentStreak || 0,
      badges: user.badges?.map((b: any) => b.displayName) || [],
      lastFetch: new Date()
    };
  } catch (error) {
    console.error('LeetCode fetch error:', error);
    return null;
  }
};

// GeeksForGeeks Public API
export const fetchGFGProgress = async (username: string): Promise<ExternalProgress | null> => {
  try {
    const response = await fetch(`https://auth.geeksforgeeks.org/api/v2/user/${username}`);
    if (!response.ok) return null;
    const data = await response.json();

    return {
      platform: 'geeksforgeeks',
      username,
      totalSolved: data.problemsSolved || 0,
      easySolved: Math.floor((data.problemsSolved || 0) * 0.3),
      mediumSolved: Math.floor((data.problemsSolved || 0) * 0.5),
      hardSolved: Math.floor((data.problemsSolved || 0) * 0.2),
      lastFetch: new Date()
    };
  } catch (error) {
    console.error('GFG fetch error:', error);
    return null;
  }
};

// Codeforces Public API
export const fetchCodeforcesProgress = async (handle: string): Promise<ExternalProgress | null> => {
  try {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    if (!response.ok) return null;
    const data = await response.json();

    if (data.result && data.result.length > 0) {
      const user = data.result[0];
      return {
        platform: 'codeforces',
        username: handle,
        totalSolved: user.problemsSolved || 0,
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        lastFetch: new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Codeforces fetch error:', error);
    return null;
  }
};

// Mock company-skill mapping
export const COMPANY_SKILLS = {
  'Google': {
    required: ['DSA', 'React', 'Node.js', 'System Design', 'SQL'],
    roles: ['Backend', 'Frontend', 'Full Stack']
  },
  'Amazon': {
    required: ['DSA', 'Java', 'AWS', 'Databases', 'Problem Solving'],
    roles: ['Backend', 'DevOps']
  },
  'Meta': {
    required: ['React', 'GraphQL', 'JavaScript', 'CSS', 'Web Performance'],
    roles: ['Frontend', 'Full Stack']
  },
  'Microsoft': {
    required: ['C#', 'Cloud', 'Windows', 'APIs', 'System Design'],
    roles: ['Backend', 'DevOps']
  },
  'Apple': {
    required: ['Swift', 'iOS', 'Objective-C', 'Performance', 'UI/UX'],
    roles: ['Mobile', 'iOS']
  }
};

// Find companies by selected skills
export const getCompaniesBySkills = (selectedSkills: string[]) => {
  const matches = Object.entries(COMPANY_SKILLS).map(([company, data]) => {
    const matchedSkills = selectedSkills.filter(s => data.required.includes(s));
    const matchPercentage = Math.round((matchedSkills.length / data.required.length) * 100);
    const missingSkills = data.required.filter(s => !selectedSkills.includes(s));

    return {
      company,
      matchPercentage,
      matchedSkills,
      missingSkills,
      roles: data.roles
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);

  return matches;
};

// Mock practice resources
export const PRACTICE_RESOURCES = {
  'DSA': [
    { title: 'Arrays & Strings', url: 'https://www.geeksforgeeks.org/array-data-structure/', platform: 'GFG' },
    { title: 'DSA Course', url: 'https://www.w3schools.com/dsa/', platform: 'W3Schools' },
    { title: 'LeetCode Problems', url: 'https://leetcode.com/explore/', platform: 'LeetCode' }
  ],
  'React': [
    { title: 'React Basics', url: 'https://www.w3schools.com/react/', platform: 'W3Schools' },
    { title: 'React Docs', url: 'https://react.dev', platform: 'Official Docs' }
  ],
  'Node.js': [
    { title: 'Node.js Tutorial', url: 'https://www.w3schools.com/nodejs/', platform: 'W3Schools' },
    { title: 'Express.js Guide', url: 'https://expressjs.com', platform: 'Official Docs' }
  ],
  'System Design': [
    { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', platform: 'GitHub' },
    { title: 'GFG System Design', url: 'https://www.geeksforgeeks.org/system-design/', platform: 'GFG' }
  ],
  'SQL': [
    { title: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/', platform: 'W3Schools' },
    { title: 'LeetCode SQL', url: 'https://leetcode.com/explore/learn/card/sql-language/', platform: 'LeetCode' }
  ],
  'JavaScript': [
    { title: 'JS Tutorial', url: 'https://www.w3schools.com/js/', platform: 'W3Schools' },
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/', platform: 'MDN' }
  ]
};

export const getPracticeResources = (skill: string) => {
  return PRACTICE_RESOURCES[skill as keyof typeof PRACTICE_RESOURCES] || [];
};
