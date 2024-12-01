import { cn } from '@/lib/utils';

export default function ButtonNav({ className, children, onClick }) {
  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      className={cn(
        'flex text-black cursor-pointer items-center border-2 border-border dark:border-darkBorder bg-white px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none',
        className,
      )}
    >
      {children}
    </button>
  );
}
