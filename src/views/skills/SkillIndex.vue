<template>
  <div class="mt-12">
    <div class="flex justify-end m-2 p-2">
      <RouterLink
        :to="{ name: 'skillCreate' }"
        class="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded"
        >Add New Skill</RouterLink
      >
    </div>

    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Slug</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="skill in skills"
            :key="skill.id"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ skill.id }}
            </th>
            <td class="px-6 py-4">
              {{ skill.name }}
            </td>
            <td class="px-6 py-4">
              {{ skill.slug }}
            </td>
            <td class="px-6 py-4">
              <RouterLink
                :to="{ name: 'skillEdit', params: { id: skill.id } }"
                class="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded inline-block text-center"
              >
                Edit
              </RouterLink>
              &nbsp;&nbsp;
              <button
                @click="deleteSkill(skill.id)"
                class="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded inline-block text-center"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSkillsStore } from "@/stores/skills";
import { onMounted, ref, watch } from "vue";

const skillsStore = useSkillsStore();
const skills = ref<any>(null);

watch(
  () => skillsStore.skills,
  (newSkills) => {
    skills.value = newSkills;
  }
);

onMounted(async () => {
  skills.value = await skillsStore.getAllSkills();
  // console.log("the data : ", skills.value?.data);
});

const deleteSkill = async (id: string) => {
  await skillsStore.destroySkill(id);
};
</script>
