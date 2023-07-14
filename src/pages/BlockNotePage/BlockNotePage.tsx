
import { classNames } from '@/lib/classNames/classNames';
import { useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Divider, Input, Layout, Menu, Modal, Row, Typography, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import {
    DeleteOutlined,
    EditOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserAddOutlined,
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
    const [addUser, setAddUser] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [name, setName] = useState('');
    const [personIconName, setPersonIconName] = useState('');
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [deadline, setDeadLine] = useState<any>();
    const [deadlineString, setDeadLineString] = useState<any>();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const items = [
        {
            key: '1',
            icon: IconsUser.FrownOutlined,
            label: 'Иванов',
        },
        {
            key: '2',
            icon: IconsUser.FrownOutlined,
            label: 'Петров',
        },
        {
            key: '3',
            icon: IconsUser.FrownOutlined,
            label: 'Сидоров',
        },
    ]
    return (
        <Layout className={classNames(cls.BlockNotePage, {}, [className])}>
            <Sider style={{overflowY: 'auto'}} trigger={null} collapsible collapsed={collapsed}>
                <VStack justify="between" align="center" className={cls.menuWrapper}>
                    <Menu
                        style={{width: '100%'}}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={items}
                    />
                    <Button type="primary" style={{margin: '4px'}} onClick={() => setAddUser(true)}>
                        <HStack gap="8" max>
                            <UserAddOutlined />
                            {!collapsed && 'Добавить'}
                        </HStack>
                    </Button>
                </VStack>
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
                            <Button type="primary" onClick={() => setAddNote(true)}>
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
            <Modal
                    centered
                    open={addNote}
                    onOk={() => setAddNote(false)}
                    onCancel={() => setAddNote(false)}
                    footer={null}
                    closable={false}
            >
                <VStack gap="16" max>
                    <HStack gap="16" max>
                        <Typography.Title level={5} style={{width: '100px', flexShrink: 0, whiteSpace: 'nowrap'}}>
                            Заголовок:
                        </Typography.Title>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </HStack>
                    <HStack gap="16" max>
                        <Typography.Title level={5} style={{width: '100px', flexShrink: 0, whiteSpace: 'nowrap'}}>
                            Описание:
                        </Typography.Title>
                        <Input.TextArea
                            autoSize
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </HStack>
                    <HStack gap="16" max>
                        <Typography.Title level={5} style={{width: '100px', flexShrink: 0, whiteSpace: 'nowrap'}}>
                            Дедлайн:
                        </Typography.Title>
                        <DatePicker
                            value={deadline}
                            showTime
                            onChange={(
                                (value, valueString) => {
                                    setDeadLine(value)
                                    setDeadLineString(valueString)
                                }
                            )}
                        />
                    </HStack>
                </VStack>
            </Modal>
            <Modal
                    centered
                    open={addUser}
                    onOk={() => setAddUser(false)}
                    onCancel={() => setAddUser(false)}
                    footer={null}
                    closable={false}
            >
                <VStack gap="16">
                    <Input
                        placeholder="Как зовут"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Row justify="center" gutter={[4, 4]} style={{width: '100%'}}>
                        {Object.entries(IconsUser).map(([keyName, iconValue]) => (
                            <Col xs={4} key={keyName}>
                                <Button
                                    type={personIconName === keyName ? "primary" : "text" }
                                    onClick={() => setPersonIconName(keyName)}
                                    style={{width: '100%'}}
                                >
                                    {iconValue}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </VStack>
            </Modal>
        </Layout>
    );
};
