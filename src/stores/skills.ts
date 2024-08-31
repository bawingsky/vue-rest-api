import { defineStore } from "pinia";
import { ref } from "vue";
import type { Skill, SkillsResponse } from "@/Models/Skill";
import axios from "axios";
import router from "@/router";

export const useSkillsStore = defineStore("skillsStore", () => {
  // const test = ref("test only");

  const skills = ref<Skill[]>([]);
  const skill = ref<Skill | null>(null);
  const errors = ref<any>({});

  const getAllSkills = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/skills");
    // console.log("from store response : ", response);
    skills.value = response.data.data;
    // console.log("from store: ", skills.value);
    return skills.value;
  };

  const getSkill = async (id: string): Promise<Skill> => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/skills/${id}`
    );
    skill.value = response.data.data;
    return skill.value as Skill;
  };

  const storeSkill = async (data: Skill) => {
    try {
      await axios.post("http://localhost:8000/api/v1/skills/", data);
      await router.push({ name: "skillIndex" });
      errors.value = {};
    } catch (err: any) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors;
      }
    }
  };

  const updateSkill = async (id: string, skill: Skill) => {
    try {
      await axios.put(`http://localhost:8000/api/v1/skills/${id}`, skill);
      await router.push({ name: "skillIndex" });
    } catch (err: any) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors;
      }
    }
  };

  const destroySkill = async (id: string) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    await axios.delete(`http://localhost:8000/api/v1/skills/${id}`);
    await getAllSkills();
    // await router.push({ name: "skillIndex" });
  };

  //   const getAllSkills = async (): Promise<SkillsResponse> => {
  //     const res = await fetch("http://localhost:8000/api/v1/skills");
  //     const data = await res.json();

  //     return data;
  //   };

  return {
    skills,
    errors,
    getAllSkills,
    getSkill,
    updateSkill,
    storeSkill,
    destroySkill,
  };
});
