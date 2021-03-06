import { computed, ref } from 'vue';

export default function useSort(availableItems, sortProp) {
  const sorting = ref(null);

  const displayedItems = computed(() => {
    if (!sorting.value) {
      return availableItems.value;
    }
    return availableItems.value.slice().sort((u1, u2) => {
      if (sorting.value === 'asc' && u1[sortProp] > u2[sortProp]) {
        return 1;
      } else if (sorting.value === 'asc') {
        return -1;
      } else if (sorting.value === 'desc' && u1[sortProp] > u2[sortProp]) {
        return -1;
      } else {
        return 1;
      }
    });
  });

  const sort = (mode) => {
    sorting.value = mode;
  };

  return {
    displayedItems,
    sorting,
    sort,
  }
}
