'use client';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import {
  Users,
  MoreVertical,
  KeyRound,
  UserX,
  UserCheck,
  User,
  Trash,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdownMenu';
import { TenantDetails } from '@/lib/types/tenant-details.types';

const roleStyles: Record<string, string> = {
  Admin: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-400 dark:text-black',
  Editor: 'bg-blue-50 text-blue-700 dark:bg-blue-400 dark:text-black',
  Viewer: 'bg-gray-50 text-gray-700 dark:bg-gray-400 dark:text-black',
};

export function UsersContent({ tenant }: { tenant: TenantDetails }) {
  const router = useRouter();

  const UserActions = ({ user }: { user: TenantDetails['users'][number] }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-zinc-800 border-white/5"
      >
        <DropdownMenuItem
          className="text-gray-300 hover:text-white"
          onClick={() =>
            router.push(`/dashboard/${tenant.profile.id}/user/${user.id}`)
          }
        >
          <User className="w-4 h-4 mr-2 text-blue-300" /> Manage Account
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-300 hover:text-white">
          <KeyRound className="w-4 h-4 mr-2" /> Reset Password
        </DropdownMenuItem>
        {user.status !== 'active' && (
          <DropdownMenuItem className="text-gray-300 hover:text-white">
            <UserCheck className="w-4 h-4 mr-2" /> Activate User
          </DropdownMenuItem>
        )}
        {user.status === 'active' && (
          <DropdownMenuItem className="text-gray-300 hover:text-white">
            <UserX className="w-4 h-4 mr-2" /> Disable User
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem className="text-red-400 hover:text-red-300">
          <Trash className="w-4 h-4 mr-2" /> Remove from Organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const StatusPill = ({ status }: { status: string }) => (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
        status === 'active'
          ? 'bg-green-50 text-green-700 dark:bg-green-400 dark:text-green-900'
          : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${status === 'active' ? 'bg-green-900' : 'bg-red-200'}`}
      />
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  );

  return (
    <Card className="bg-zinc-200 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
          <Users className="w-5 h-5 text-blue-500" />
          Organization Users
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-zinc-300">
              {tenant.users.length} total
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
              {tenant.users.filter((u) => u.status === 'active').length} active
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="md:hidden divide-y divide-gray-100 dark:divide-zinc-700">
          {tenant.users.map((user) => (
            <div key={user.id} className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="shrink-0">
                  <UserActions user={user} />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${roleStyles[user.role.label] || 'bg-gray-50 text-gray-700'}`}
                >
                  {user.role.label}
                </span>
                <StatusPill status={user.status} />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400">
                <span>
                  Active:{' '}
                  {user.last_login_at
                    ? format(new Date(user.last_login_at), 'dd/MM/yyyy')
                    : 'Never'}
                </span>
                <span>
                  Joined: {format(new Date(user.created_at), 'dd/MM/yyyy')}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50">
                <th className="text-left text-xs font-medium text-gray-500 dark:text-zinc-400 px-5 py-3">
                  Name
                </th>
                <th className="hidden xl:table-cell text-left text-xs font-medium text-gray-500 dark:text-zinc-400 px-5 py-3">
                  Email
                </th>
                <th className="text-left text-xs font-medium text-gray-500 dark:text-zinc-400 px-5 py-3">
                  Role
                </th>
                <th className="text-left text-xs font-medium text-gray-500 dark:text-zinc-400 px-5 py-3">
                  Status
                </th>
                <th className="hidden lg:table-cell text-left text-xs font-medium text-gray-500 dark:text-zinc-400 px-5 py-3">
                  Last Active
                </th>
                <th className="hidden lg:table-cell text-left text-xs font-medium text-gray-500 dark:text-zinc-400 px-5 py-3">
                  Joined
                </th>
                <th className="text-center text-xs font-medium text-gray-500 dark:text-zinc-400 px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tenant.users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 dark:border-zinc-700 last:border-0 hover:bg-gray-50/50 dark:hover:bg-zinc-700/30 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-zinc-400 xl:hidden truncate max-w-[180px]">
                      {user.email}
                    </div>
                  </td>
                  <td className="hidden xl:table-cell px-5 py-3 text-xs text-gray-600 dark:text-zinc-300">
                    {user.email}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${roleStyles[user.role.label] || 'bg-gray-50 text-gray-700'}`}
                    >
                      {user.role.label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusPill status={user.status} />
                  </td>
                  <td className="hidden lg:table-cell px-5 py-3 text-xs text-gray-500 dark:text-zinc-400">
                    {user.last_login_at
                      ? format(new Date(user.last_login_at), 'dd/MM/yyyy')
                      : 'Never'}
                  </td>
                  <td className="hidden lg:table-cell px-5 py-3 text-xs text-gray-500 dark:text-zinc-400">
                    {format(new Date(user.created_at), 'dd/MM/yyyy')}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex justify-center">
                      <UserActions user={user} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
