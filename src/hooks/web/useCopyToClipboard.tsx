import { ref, watch } from 'vue';
import { CopyTwoTone } from '@ant-design/icons-vue';
import { isDef, isString } from '/@/utils/is';

import { useMessage } from '/@/hooks/web/useMessage';
interface Options {
  target?: HTMLElement;
}
export function useCopyToClipboard(initial?: string) {
  const clipboardRef = ref(initial || '');
  const isSuccessRef = ref(false);
  const copiedRef = ref(false);

  watch(
    clipboardRef,
    (str?: string) => {
      if (isDef(str)) {
        copiedRef.value = true;
        isSuccessRef.value = copyTextToClipboard(str);
      }
    },
    { immediate: !!initial, flush: 'sync' },
  );

  return { clipboardRef, isSuccessRef, copiedRef };
}

export function copyTextToClipboard(input: string, { target = document.body }: Options = {}) {
  const element = document.createElement('textarea');
  const previouslyFocusedElement = document.activeElement;

  element.value = input;

  element.setAttribute('readonly', '');

  (element.style as any).contain = 'strict';
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.fontSize = '12pt';

  const selection = document.getSelection();
  let originalRange;
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }

  target.append(element);
  element.select();

  element.selectionStart = 0;
  element.selectionEnd = input.length;

  let isSuccess = false;
  try {
    isSuccess = document.execCommand('copy');
  } catch (e: any) {
    throw new Error(e);
  }

  element.remove();

  if (originalRange && selection) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }

  if (previouslyFocusedElement) {
    (previouslyFocusedElement as HTMLElement).focus();
  }
  return isSuccess;
}

export const handleCopy = (str: string) => {
  const { createMessage } = useMessage();
  const { clipboardRef, isSuccessRef } = useCopyToClipboard();
  if (!isString(str)) {
    createMessage.warning('复制无效');
    return;
  }
  clipboardRef.value = str;
  if (isSuccessRef.value) {
    createMessage.success(
      <>
        {str}
        <CopyTwoTone class="ml-1" />
      </>,
    );
    return;
  }
  createMessage.error('复制失败');
};
