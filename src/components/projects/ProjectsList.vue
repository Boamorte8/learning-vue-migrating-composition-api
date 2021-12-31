<template>
  <base-container v-if="user">
    <h2>{{ user.fullName }}: Projects</h2>
    <base-search v-if="hasProjects" @search="updateSearch" :search-term="enteredSearchTerm"></base-search>
    <ul v-if="hasProjects">
      <project-item v-for="prj in availableItems" :key="prj.id" :title="prj.title"></project-item>
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>

<script>
import { computed, watch, toRefs } from 'vue';

import useSearch from '../../hooks/search';
import ProjectItem from './ProjectItem.vue';

export default {
  components: {
    ProjectItem,
  },
  props: ['user'],
  setup(props) {
    // const enteredSearchTerm = ref('');
    // const activeSearchTerm = ref('');
    const { user } = toRefs(props);
    const projects = computed(() => user.value?.projects || []);
    const { enteredSearchTerm, availableItems, updateSearch } = useSearch(projects, 'title');

    const hasProjects = computed(() => {
      return projects.value && availableItems.value.length > 0;
    });

    // const availableProjects = computed(() => {
    //   if (activeSearchTerm.value) {
    //     return props.user.projects.filter((prj) =>
    //       prj.title.includes(activeSearchTerm.value)
    //     );
    //   }
    //   return props.user.projects;
    // });

    // const updateSearch = (val) => {
    //   enteredSearchTerm.value = val;
    // };

    // watch(enteredSearchTerm, (newSearch) => {
    //   setTimeout(() => {
    //     if (newSearch === enteredSearchTerm.value) {
    //       activeSearchTerm.value = newSearch;
    //     }
    //   }, 300);
    // });

    watch(user, () => {
      updateSearch('');
    });

    return {
      enteredSearchTerm,
      hasProjects,
      availableItems,
      updateSearch,
    };
  },
  // data() {
  //   return {
  //     enteredSearchTerm: '',
  //     activeSearchTerm: '',
  //   };
  // },
  // computed: {
    // hasProjects() {
    //   return this.user.projects && this.availableProjects.length > 0;
    // },
    // availableProjects() {
    //   if (this.activeSearchTerm) {
    //     return this.user.projects.filter((prj) =>
    //       prj.title.includes(this.activeSearchTerm)
    //     );
    //   }
    //   return this.user.projects;
    // },
  // },
  // methods: {
  //   updateSearch(val) {
  //     this.enteredSearchTerm = val;
  //   },
  // },
  // watch: {
  //   enteredSearchTerm(val) {
  //     setTimeout(() => {
  //       if (val === this.enteredSearchTerm) {
  //         this.activeSearchTerm = val;
  //       }
  //     }, 300);
  //   },
  //   user() {
  //     this.enteredSearchTerm = '';
  //   },
  // },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>