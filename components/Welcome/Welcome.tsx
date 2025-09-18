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

'use client';

import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { Anchor, Button, Center, Paper, Text, Title, useMantineColorScheme } from '@mantine/core';
import pack from '../../package.json';
import classes from './Welcome.module.css';

export function Welcome() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Title maw="90vw" mx="auto" ta="center" mt={100}>
        <span className={classes.title}>Next Gen Docs for</span>
        <TextAnimate
          animate="in"
          by="character"
          inherit
          variant="gradient"
          component="span"
          segmentDelay={0.2}
          className={classes.subtitle}
          duration={2}
          animation="scale"
          animateProps={{
            scaleAmount: 3,
          }}
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          NexRes
        </TextAnimate>
      </Title>

      <Text c="dimmed" ta="center" size="xl" maw={580} mx="auto" mt="sm">
        Find all documentation related to ResilientDB, its applications, and ecosystem tools
        supported by the ResilientDB team. This site is your gateway to high-performance blockchain
        infrastructure, developer guides, and integration resources. To learn more about
        ResilientDB, visit <Anchor href="https://resilientdb.com/">the official website</Anchor>.
      </Text>

      <Center>
        <Button
                href="https://resilientdb.incubator.apache.org/"
                component="a"
                leftSection={<IconBrandGithub size={18} />}
                rightSection={<IconExternalLink size={18} />}
                variant={isDark ? 'outline' : 'gradient'} // dark: outline, light: gradient
                gradient={isDark ? undefined : { from: 'blue', to: 'cyan' }} // gradient only for light mode
                color={isDark ? 'gray' : undefined} // fallback color for dark mode
                px={32}
                radius="xl"
                size="lg"
                mx="auto"
                mt="xl"
              >
  Latest Release v{pack.version}
</Button>


      </Center>

      <Paper shadow="xl" p={8} mih={300} my={32} bg="dark.9" mx="auto" radius={8}>
        <TextAnimate.Typewriter
          inherit
          fz={11}
          c="green.5"
          ff="monospace"
          multiline
          delay={100}
          loop={false}
          value={[
            '🔗 ResilientDB Node Dependencies:',
            ...Object.keys(pack.dependencies).map(
              (key: string) =>
                `• ${key} : ${pack.dependencies[key as keyof typeof pack.dependencies].toString()}`
            ),
            '',
            'Each dependency is a block in your development chain.',
            'Keep your stack resilient!',
          ]}
        />
      </Paper>
    </>
  );
}
