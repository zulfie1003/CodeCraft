// LeetCode Public API (Unofficial/Mock)
// Since LeetCode's GraphQL requires CORS handling often, we might need to mock this 
// or use a proxy if available. For this "frontend only" request, we will use a mix 
// of available open endpoints or mock data if CORS blocks us.

// Note: Direct calls to https://leetcode.com/graphql from browser will likely fail CORS.
// We will use a mock fallback for the demo to ensure stability.

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  acceptanceRate: number;
}

export const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStats> => {
  // SIMULATED API CALL
  // In a real production environment, this would go through a backend proxy to avoid CORS.
  // For this frontend-only prototype, we return realistic mock data based on the username.
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network

  return {
    totalSolved: Math.floor(Math.random() * 500) + 50,
    easySolved: Math.floor(Math.random() * 200) + 20,
    mediumSolved: Math.floor(Math.random() * 200) + 20,
    hardSolved: Math.floor(Math.random() * 50) + 5,
    ranking: Math.floor(Math.random() * 100000) + 1000,
    acceptanceRate: 65.4
  };
};

export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: string;
  tags: string[];
}

export const fetchProblems = async (): Promise<Problem[]> => {
  // Mock problem list
  return [
    { id: "1", title: "Two Sum", difficulty: "Easy", acceptance: "48.5%", tags: ["Array", "Hash Table"] },
    { id: "2", title: "Add Two Numbers", difficulty: "Medium", acceptance: "39.1%", tags: ["Linked List", "Math"] },
    { id: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "33.8%", tags: ["String", "Sliding Window"] },
    { id: "4", title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: "35.6%", tags: ["Array", "Binary Search"] },
    { id: "20", title: "Valid Parentheses", difficulty: "Easy", acceptance: "40.3%", tags: ["Stack", "String"] },
    { id: "42", title: "Trapping Rain Water", difficulty: "Hard", acceptance: "58.1%", tags: ["Two Pointers", "DP"] },
  ];
};
