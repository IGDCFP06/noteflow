import { FlashList, FlashListProps } from '@shopify/flash-list';

type EstimatedFlashListProps<T> = FlashListProps<T> & {
  estimatedItemSize?: number;
};

export function EstimatedFlashList<T>(props: EstimatedFlashListProps<T>) {
  return <FlashList {...(props as FlashListProps<T>)} />;
}
