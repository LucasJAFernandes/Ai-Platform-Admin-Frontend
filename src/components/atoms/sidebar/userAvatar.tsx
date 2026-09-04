interface UserAvatarProps {
  initials: string;
}

export function UserAvatar({ initials }: UserAvatarProps) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-zinc-900 dark:text-white text-sm font-medium shadow-sm flex-shrink-0">
      {initials}
    </div>
  );
}
