import { cn } from '@/lib/utils';

export default function Badge({ className, text }) {
  return (
    <div
      className={cn(
        'w-min rounded-base border-2 text-text border-border dark:border-darkBorder bg-main px-3 py-1.5 text-sm font-base',
        className
      )}
    >
      {text}
    </div>
  );
}