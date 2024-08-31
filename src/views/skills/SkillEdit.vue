<template>
  <div class="mt-12">
    <h2 class="mb-5 max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      Update the Skill
    </h2>
    <form
      @submit.prevent="updateSkill(form, id)"
      class="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <div class="space-y-6">
        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Name</label
          >
          <input
            v-model="form.name"
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <span v-if="skillsStore.errors.name" class="text-sm text-red-400">
            {{ skillsStore.errors.name[0] }}
          </span>
        </div>
        <div class="mb-5">
          <label
            for="slug"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Slug</label
          >
          <input
            v-model="form.slug"
            type="text"
            id="slug"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <span v-if="skillsStore.errors.slug" class="text-sm text-red-400">
            {{ skillsStore.errors.slug[0] }}
          </span>
        </div>

        <div class="mt-4">
          <button
            class="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import type { Skill } from "@/Models/Skill";
import { useSkillsStore } from "@/stores/skills";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";

const skillsStore = useSkillsStore();
const id = ref<string>("");
const route = useRoute();

const skill = ref<Skill>({
  name: "",
  slug: "",
});

const form = reactive({
  name: "",
  slug: "",
});

const updateSkill = async (skill: Skill, id: string) => {
  skillsStore.updateSkill(id, skill);
};

onMounted(async () => {
  skillsStore.errors = {};

  id.value = route.params.id as string;
  skill.value = await skillsStore.getSkill(id.value);

  form.name = skill.value.name;
  form.slug = skill.value.slug;
});
</script>
