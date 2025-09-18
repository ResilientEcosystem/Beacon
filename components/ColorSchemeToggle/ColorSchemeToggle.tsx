'use client';

import { useTheme } from 'next-themes';
import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ColorSchemeToggle() {
  const { theme, setTheme } = useTheme();
  const { setColorScheme } = useMantineColorScheme();

  const toggleTheme = (mode: 'light' | 'dark' | 'system') => {
    setTheme(mode);
    setColorScheme(mode === 'system' ? 'auto' : mode);
  };

  return (
    <Group justify="center" mt="xl">
      <ActionIcon
        variant={theme === 'light' ? 'filled' : 'default'}
        onClick={() => toggleTheme('light')}
        title="Switch to Light mode"
      >
        <Sun size={18} />
      </ActionIcon>

      <ActionIcon
        variant={theme === 'dark' ? 'filled' : 'default'}
        onClick={() => toggleTheme('dark')}
        title="Switch to Dark mode"
      >
        <Moon size={18} />
      </ActionIcon>

      <ActionIcon
        variant={theme === 'system' ? 'filled' : 'default'}
        onClick={() => toggleTheme('system')}
        title="Follow System preference"
      >
        <Monitor size={18} />
      </ActionIcon>
    </Group>
  );
}
