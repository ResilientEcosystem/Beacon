/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements...
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  IconBolt,
  IconBrandGithub,
  IconChevronLeft,
  IconChevronRight,
  IconCode,
  IconDatabase,
  IconExternalLink,
  IconTerminal,
  IconWorld,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  useMantineColorScheme, // ✅ added
} from '@mantine/core';
// Import actual package.json data
import pack from '../package.json';
import classes from './page.module.css';

// Ecosystem projects data
const ecosystemProjects = [
  {
    name: 'ResilientDB',
    href: 'https://github.com/apache/incubator-resilientdb',
    description: 'Core blockchain infrastructure for high-performance distributed systems',
    icon: IconDatabase,
  },
  {
    name: 'ResilientDB GraphQL',
    href: 'https://github.com/apache/incubator-resilientdb-graphql',
    description: 'GraphQL interface for seamless blockchain data querying',
    icon: IconWorld,
  },
  {
    name: 'Resilient-Python-Cache',
    href: 'https://github.com/apache/incubator-resilientdb-resilient-python-cache',
    description: 'High-performance Python caching solution for blockchain applications',
    icon: IconBolt,
  },
  {
    name: 'ResLens',
    href: 'https://github.com/harish876/ResLens',
    description: 'Advanced analytics and monitoring tool for ResilientDB networks',
    icon: IconTerminal,
  },
  {
    name: 'ResilientDB SDK',
    href: 'https://github.com/apache/incubator-resilientdb',
    description: 'Comprehensive software development kit for blockchain integration',
    icon: IconCode,
  },
  {
    name: 'ResilientDB CLI',
    href: 'https://github.com/apache/incubator-resilientdb',
    description: 'Command line interface for blockchain network management',
    icon: IconTerminal,
  },
];

export default function ResilientDBLanding() {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(Math.floor((ecosystemProjects.length - 3) / 2));
  const terminalRef = useRef<HTMLPreElement>(null);

  const { colorScheme } = useMantineColorScheme(); // ✅ added
  const isDark = colorScheme === 'dark'; // ✅ now defined

  const terminalLines = [
    '🔗 ResilientDB Node Dependencies:',
    ...Object.keys(pack.dependencies).map(
      (key) => `• ${key} : ${pack.dependencies[key as keyof typeof pack.dependencies]}`
    ),
    '',
    'Each dependency is a block in your development chain.',
    'Keep your stack resilient!',
  ];

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const timer = setTimeout(() => {
        setTypewriterText((prev) => prev + terminalLines[currentLine] + '\n');
        setCurrentLine((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentLine, terminalLines]);

  // Auto-scroll to bottom when text updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [typewriterText]);

  const cardWidth = 320;
  const canGoNext = currentIndex < ecosystemProjects.length - 3;
  const canGoPrev = currentIndex > 0;

  const nextSlide = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getCardStyle = (index: number) => {
    const relativePos = index - currentIndex;

    let scale = 1;
    let opacity = 1;
    let blur = 0;
    let zIndex = 5;

    if (relativePos >= 0 && relativePos <= 2) {
      scale = 1;
      opacity = 1;
      blur = 0;
      zIndex = 10;
    } else if (relativePos === -1) {
      if (canGoPrev) {
        scale = 0.75;
        opacity = 0.5;
        blur = 2;
        zIndex = 5;
      } else {
        scale = 0;
        opacity = 0;
        blur = 0;
        zIndex = 1;
      }
    } else if (relativePos === 3) {
      if (canGoNext) {
        scale = 0.75;
        opacity = 0.5;
        blur = 2;
        zIndex = 5;
      } else {
        scale = 0;
        opacity = 0;
        blur = 0;
        zIndex = 1;
      }
    } else {
      scale = 0;
      opacity = 0;
      blur = 0;
      zIndex = 1;
    }

    return {
      transform: `scale(${scale})`,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex,
    };
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        width: '100%',
      }}
      className={classes.root}
    >
      {/* Hero Section */}
      <Box
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '5rem 0',
        }}
        className={classes.hero}
      >
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
          <Stack align="center" gap="xl">
            <Stack align="center" gap="md">
              <Stack align="center" gap="md">
                <Title
                  order={1}
                  ta="center"
                  className={classes.heroTitle}
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                  }}
                >
                  Next Gen Docs for
                </Title>
                <Title
                  order={1}
                  ta="center"
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.1,
                  }}
                >
                  <Text
                    component="span"
                    className={classes.animatedGradient}
                    style={{
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                    }}
                  >
                    ResilientDB
                  </Text>
                </Title>
              </Stack>

              <Group justify="center" gap="sm">
                <Badge variant="outline" color="teal" leftSection={<IconBolt size={12} />}>
                  High Performance
                </Badge>
                <Badge variant="outline" color="blue" leftSection={<IconDatabase size={12} />}>
                  Blockchain
                </Badge>
                <Badge variant="outline" color="gray" leftSection={<IconCode size={12} />}>
                  Developer Friendly
                </Badge>
              </Group>
            </Stack>

            <Text size="lg" ta="center" maw={800} lh={1.6} className={classes.description}>
              Find all documentation related to ResilientDB, its applications, and ecosystem tools
              supported by the ResilientDB team. This site is your gateway to high-performance
              blockchain infrastructure, developer guides, and integration resources. To learn more
              about ResilientDB, visit{' '}
              <Text
                component={Link}
                href="https://resilientdb.com/"
                style={{
                  color: '#51cf66',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#40c057';
                  e.currentTarget.style.textShadow = '0 1px 2px rgba(81, 207, 102, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#51cf66';
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                the official website
              </Text>
              .
            </Text>

            <Group justify="center" gap="md">
              <Button
                component={Link}
                href="https://resilientdb.incubator.apache.org/"
                size="lg"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'gray.7', to: 'gray.6' }}
                leftSection={<IconBrandGithub size={20} />}
                rightSection={<IconExternalLink size={16} />}
                style={{
                  transition: 'all 0.3s ease',
                  border: '1px solid #868e96',
                }}
              >
                Latest Release v{pack.version}
              </Button>

              <Button
                size="lg"
                radius="xl"
                variant="filled"
                color={isDark ? 'gray' : 'dark'} // ✅ fixed
                leftSection={<IconWorld size={20} />}
              >
                Documentation
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Terminal Section */}
      <Container size="lg" py="xl">
        <Card
          radius="md"
          shadow="xl"
          style={{
            background: '#1a1b23',
            border: '1px solid #373a40',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <IconTerminal size={20} color="#51cf66" />
              <Text size="sm" c="dimmed">
                Dependencies
              </Text>
            </Group>
            <Group gap={4}>
              <Box
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#fa5252',
                }}
              />
              <Box
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#fd7e14',
                }}
              />
              <Box
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#51cf66',
                }}
              />
            </Group>
          </Group>

          <Box
            ref={terminalRef}
            component="pre"
            style={{
              color: '#51cf66',
              fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
              fontSize: '0.875rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              height: '250px',
              maxHeight: '250px',
              overflowY: 'auto',
              margin: 0,
              padding: '1rem',
              scrollbarWidth: 'thin',
              scrollbarColor: '#373a40 #1a1b23',
            }}
          >
            {typewriterText}
          </Box>
        </Card>
      </Container>

      {/* Ecosystem Section */}
      {/* ... rest of your code stays same */}
    </Box>
  );
}
