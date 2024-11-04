/* eslint-disable max-lines */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable sonarjs/no-duplicate-string */

'use client';

import { useEffect, useState } from 'react';
import {
  Container, Paper, Title, Group, Stack, TextInput, Textarea, Button,
  Select, Text, Badge, ActionIcon, Menu, Modal,
  Flex,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCheck, IconClock, IconDots, IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import { useTelegram } from '@/hooks/use-telegram';
import { useMounted } from '@mantine/hooks';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Task, TaskPriority } from '@/types/task';
import { PRIORITY_DATA } from '@/constant';

export default function HomePage() {
  const { webapp, isReady, showAlert } = useTelegram();
  const mounted = useMounted();
  const [tasks, setTasks] = useLocalStorage<Task[]>('telegram-tasks', []);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // setTasks([]);
    if (isReady && webapp) {
      webapp.MainButton.setText('Add New Task');
      webapp.MainButton.show();
      webapp.MainButton.onClick(() => setIsModalOpen(true));

      return () => {
        webapp.MainButton.offClick(() => {});
      };
    }
  }, [isReady, webapp]);

  const handleAddTask = () => {
    if (!newTask.trim()) {
      showAlert('Please enter a task title');
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      description: description.trim(),
      completed: false,
      createdAt: Date.now(),
      priority,
    };

    setTasks((current) => [...current, task]);
    notifications.show({
      title: 'Task Added',
      message: 'New task has been created successfully',
      color: 'green',
    });
    setNewTask('');
    setDescription('');
    setPriority('medium');
    setIsModalOpen(false);
  };

  const handleUpdateTask = (task: Task) => {
    setTasks((current) => current.map((t) => (t.id === task.id ? task : t)));

    notifications.show({
      title: 'Task Updated',
      message: `Task "${task.title}" has been updated`,
      color: 'blue',
    });
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks((current) => current.map((task) => (task.id === taskId
      ? { ...task, completed: !task.completed }
      : task)));
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      if (window.Telegram?.WebApp) {
        const confirmed = confirm('Are you sure you want to delete this task?');
        if (confirmed) {
          setTasks((current) => current.filter((task) => task.id !== taskId));
          notifications.show({
            title: 'Task Deleted',
            message: 'Task has been removed',
            color: 'red',
          });
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to delete task',
        color: 'red',
      });
    }
  };

  const getPriorityColor = (priorityParam: string) => {
    switch (priorityParam) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const handlePriorityChange = (value: string | null) => {
    if (value && (value === 'low' || value === 'medium' || value === 'high')) {
      if (editingTask) {
        setEditingTask({ ...editingTask, priority: value });
      } else {
        setPriority(value);
      }
    }
  };

  if (!mounted) return null;

  return (
    <Container
      size="sm"
      py="xl"
      style={{
        backgroundColor: 'var(--app-bg-color)',
        color: 'var(--app-text-color)',
        minHeight: '100vh',
      }}
    >
      <Paper
        p="md"
        radius="md"
        withBorder
        style={{
          backgroundColor: 'var(--app-bg-color)',
          color: 'var(--app-text-color)',
        }}
      >
        <Stack gap="lg">
          <Group justify="apart">
            <Title order={2} c="gray.7">Task Manager</Title>
            <Button
              leftSection={<IconClock size={16} />}
              variant="light"
              onClick={() => setIsModalOpen(true)}
            >
              New Task
            </Button>
          </Group>

          {tasks.map((task) => (
            <Paper
              key={task.id}
              p="md"
              radius="sm"
              withBorder
              style={{
                opacity: task.completed ? 0.7 : 1,
                borderColor: `var(--mantine-color-${getPriorityColor(task.priority)}-3)`,
                backgroundColor: 'var(--app-bg-color)',
                color: 'var(--app-text-color)',
              }}
            >
              <Flex justify="space-between" align="center">
                <Group gap="xs">
                  <ActionIcon
                    color={task.completed ? 'green' : 'gray'}
                    variant="light"
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    <IconCheck size={16} />
                  </ActionIcon>
                  <div>
                    <Flex gap={10} align="center">
                      <Text
                        size="md"
                        style={{
                          textDecoration: task.completed ? 'line-through' : 'none',
                        }}
                      >
                        {task.title}
                      </Text>
                      <Badge
                        size="sm"
                        color={getPriorityColor(task.priority)}
                        mt={10}
                      >
                        {task.priority}
                      </Badge>
                    </Flex>
                    {task.description && (
                    <Text size="sm" c="dimmed">
                      {task.description}
                    </Text>
                    )}
                  </div>
                </Group>
                <Menu shadow="md">
                  <Menu.Target>
                    <ActionIcon>
                      <IconDots size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconPencil size={16} />}
                      onClick={() => setEditingTask(task)}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconTrash size={16} />}
                      color="red"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
            </Paper>
          ))}

          {tasks.length === 0 && (
          <Text c="dimmed" ta="center" py="xl">
            No tasks yet. Click the button above to add one!
          </Text>
          )}
        </Stack>
      </Paper>

      <Modal
        opened={isModalOpen || !!editingTask}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
          setNewTask('');
          setDescription('');
          setPriority('medium');
        }}
        title={editingTask ? 'Edit Task' : 'New Task'}
        styles={{
          header: {
            backgroundColor: 'var(--app-bg-color)',
            color: 'var(--app-text-color)',
          },
          content: {
            backgroundColor: 'var(--app-bg-color)',
            color: 'var(--app-text-color)',
          },
        }}
      >
        <Stack>
          <TextInput
            label="Title"
            placeholder="Enter task title"
            value={editingTask?.title || newTask}
            onChange={(e) => (editingTask
              ? setEditingTask({ ...editingTask, title: e.target.value })
              : setNewTask(e.target.value))}
          />
          <Textarea
            label="Description"
            placeholder="Optional description"
            value={editingTask?.description || description}
            onChange={(e) => (editingTask
              ? setEditingTask({ ...editingTask, description: e.target.value })
              : setDescription(e.target.value))}
          />
          <Select
            label="Priority"
            value={editingTask?.priority || priority}
            onChange={handlePriorityChange}
            data={PRIORITY_DATA}
            allowDeselect={false}
          />
          <Button
            onClick={() => (editingTask
              ? (handleUpdateTask(editingTask), setEditingTask(null))
              : handleAddTask())}
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}
