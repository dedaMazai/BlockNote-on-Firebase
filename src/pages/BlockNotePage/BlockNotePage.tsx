
import { classNames } from '@/lib/classNames/classNames';
import { useState } from 'react';
import { Button, Checkbox, Divider, Layout, Menu, Typography, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import {
    DeleteOutlined,
    EditOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import cls from './BlockNotePage.module.scss';
import { IconsUser } from './IconsUser';
import { HStack, VStack } from '@/components/Stack';

interface BlockNotePageProps {
  className?: string;
}

export const BlockNotePage = ({ className }: BlockNotePageProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const items = [
        {
            key: '1',
            icon: IconsUser.AreaChartOutlined,
            label: 'Иванов',
        },
        {
            key: '2',
            icon: IconsUser.AreaChartOutlined,
            label: 'Петров',
        },
        {
            key: '3',
            icon: IconsUser.AreaChartOutlined,
            label: 'Сидоров',
        },
    ]
    return (
        <Layout className={classNames(cls.BlockNotePage, {}, [className])}>
            <Sider style={{overflow: 'auto'}} trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                />
            </Sider>
            <Layout>
                <HStack className={cls.Header}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            marginRight: '24px'
                        }}
                    />
                    <HStack gap="16">
                        <Button type="primary" size="large" danger>
                            Иванов
                        </Button>
                        <Button type="primary" size="large" danger>
                            Петров
                        </Button>
                    </HStack>
                </HStack>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <VStack gap="16">
                        <HStack max gap="16" justify="between">
                            <HStack gap="8">
                                <Typography.Title level={4} style={{marginBottom: 0}}>
                                    Иванов
                                </Typography.Title>
                                <Button type="text">
                                    <EditOutlined />
                                </Button>
                            </HStack>
                            <Button type="primary">
                                Добавить задачу
                            </Button>
                        </HStack>
                        <Divider style={{margin: 0}} />
                        <VStack gap="16" max>
                            <HStack max justify="between">
                                <Checkbox value={true}>
                                    <Typography.Text delete style={{marginBottom: 0}}>
                                        Сходить куда-то зачем-то когда-то
                                    </Typography.Text>
                                </Checkbox>
                                <HStack gap="16">
                                    <Typography.Text style={{marginBottom: 0}}>
                                        23.12.2023 12:43
                                    </Typography.Text>
                                    <Button type="primary" danger>
                                        <DeleteOutlined />
                                    </Button>
                                </HStack>
                            </HStack>
                            <HStack max justify="between">
                                <Checkbox>
                                    <Typography.Text style={{marginBottom: 0}}>
                                        Сходить куда-то зачем-то когда-то
                                    </Typography.Text>
                                </Checkbox>
                                <HStack gap="16">
                                    <Typography.Text style={{marginBottom: 0}}>
                                        23.12.2023 12:43
                                    </Typography.Text>
                                    <Button type="primary" danger>
                                        <DeleteOutlined />
                                    </Button>
                                </HStack>
                            </HStack>
                        </VStack>
                    </VStack>
                </Content>
            </Layout>
        </Layout>
    );
};
