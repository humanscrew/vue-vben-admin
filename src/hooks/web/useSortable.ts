import { nextTick, unref } from 'vue';
import type { Ref } from 'vue';
import type { Options } from 'sortablejs';
import type Sortable from 'sortablejs';

export function useSortable(el: HTMLElement | Ref<HTMLElement>, options?: Options) {
  async function initSortable() {
    let sortable: Sortable | null = null;
    await nextTick(async () => {
      if (!el) return;

      const Sortable = (await import('sortablejs')).default;
      sortable = Sortable.create(unref(el), {
        animation: 500,
        delay: 400,
        delayOnTouchOnly: true,
        ...options,
      });
    });
    return sortable;
  }

  return { initSortable };
}
