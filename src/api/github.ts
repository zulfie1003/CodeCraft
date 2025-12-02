// GitHub API Utilities
// Using public unauthenticated endpoints where possible, or mocking for complex interactions

const GITHUB_API_BASE = "https://api.github.com";

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export const fetchGitHubUser = async (username: string): Promise<GitHubUser | null> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
};

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=6`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
};

// Mock commit data for "Verification"
export const fetchRecentCommits = async (username: string, repo: string) => {
  // In a real app, we'd call the API. For frontend-only demo without auth token limits,
  // we might want to be careful. But let's try a public fetch.
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${username}/${repo}/commits?per_page=5`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    return [];
  }
};
