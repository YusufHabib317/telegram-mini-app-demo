'use client';

import { useEffect } from 'react';
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Code,
  Group,
  ThemeIcon,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  // eslint-disable-next-line react/require-default-props
  reset?: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  const theme = useMantineTheme();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Application Error:', error);
  }, [error]);

  return (
    <Container size="sm" py="xl">
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        withBorder
        style={{
          backgroundColor: theme.colors.red[0],
          borderColor: theme.colors.red[3],
        }}
      >
        <Stack gap="lg">
          <Group gap="sm">
            <ThemeIcon
              color="red"
              size="xl"
              radius="xl"
              variant="light"
            >
              <IconAlertCircle size={28} />
            </ThemeIcon>
            <Title order={2} c="red">
              Oops! Something went wrong
            </Title>
          </Group>

          <Text c="dimmed" size="md">
            An unexpected error has occurred
          </Text>

          <Paper p="md" withBorder radius="md">
            <Text size="sm" fw={500} mb="xs">
              Error Details:
            </Text>
            <Code block style={{ whiteSpace: 'pre-wrap' }}>
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </Code>
          </Paper>

          {reset && (
            <Box>
              <Group justify="center">
                <Button
                  leftSection={<IconRefresh size={16} />}
                  onClick={() => reset()}
                  variant="light"
                  color="red"
                >
                  Try Again
                </Button>
              </Group>
              <Text c="dimmed" size="sm" ta="center" mt="sm">
                Click the button above to retry the operation
              </Text>
            </Box>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
