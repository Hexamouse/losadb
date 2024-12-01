'use client';

import { cn } from '@/lib/utils';

export default function Badge({ className, text }) {
  // Define a function to determine the badge color based on the type
  const getBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'normal':
        return 'bg-gray-700 text-white'; // Gray for normal
      case 'rare':
        return 'bg-orange-700 text-white'; // Orange for rare
      case 'premium':
        return 'bg-blue-700 text-white'; // Blue for premium
      case 'unique':
        return 'bg-purple-700 text-white'; // Purple for unique
      case 'idol':
        return 'bg-pink-700 text-white'; // Pink for idol
      case 'reform':
        return 'bg-green-700 text-white'; // Green for reform
      default:
        return 'bg-gray-700 text-white'; // Default gray for unknown types
    }
  };

  return (
    <div
      className={cn(
        'w-min rounded-base border-2 text-text border-border dark:border-darkBorder px-3 py-1.5 text-sm font-base',
        getBadgeColor(text), // Apply the color based on the text (mercenary type)
        className
      )}
    >
      {text}
    </div>
  );
}
