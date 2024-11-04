import { PRIORITY_DATA } from '@/app/page';
import { TaskPriority } from '@/types/task';

export function getPriorityColor(priority: TaskPriority): string {
  return PRIORITY_DATA.find((p) => p.value === priority)?.color || 'gray';
}

export function getPriorityLabel(priority: TaskPriority): string {
  return PRIORITY_DATA.find((p) => p.value === priority)?.label || 'Unknown';
}

export function getPriorityDescription(priority: TaskPriority): string {
  return PRIORITY_DATA.find((p) => p.value === priority)?.description || '';
}
