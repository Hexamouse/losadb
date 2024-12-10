import { cn } from '@/lib/utils';

export default function Button({ className, children, onClick }) {
  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      className={cn(
        'flex text-white cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-[#079D6E] px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none',
        className,
      )}
    >
      {children}
    </button>
  );
}
