export interface Skill {
  name: string;
  slug: string;
}

export interface SkillsResponse {
  message: string;
  data: Skill[];
}
