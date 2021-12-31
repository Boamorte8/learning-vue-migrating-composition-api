import { computed, ref, watch } from 'vue';

export default function useSearch(items, searchProp) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(() => {
    let filteredItems = [];
    if (activeSearchTerm.value) {
      filteredItems = items.value.filter(item =>
        item[searchProp].includes(activeSearchTerm.value)
      );
    } else if (items.value) {
      filteredItems = items.value;
    }
    return filteredItems;
  });

  const updateSearch = (val) => {
    enteredSearchTerm.value = val;
  };

  watch(enteredSearchTerm, (newSearch) => {
    setTimeout(() => {
      if (newSearch === enteredSearchTerm.value) {
        activeSearchTerm.value = newSearch;
      }
    }, 300);
  });

  return {
    enteredSearchTerm,
    availableItems,
    updateSearch,
  };
}
