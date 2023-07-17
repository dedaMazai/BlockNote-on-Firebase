
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { classNames } from '@/lib/classNames/classNames';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Input,
    Layout,
    Menu,
    Modal,
    Row,
    Typography,
    notification,
    theme,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import {
    DeleteOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import { IconsUser } from './IconsUser';
import { HStack, VStack } from '@/components/Stack';
import { db } from "@/firebase";

import cls from './BlockNotePage.module.scss';
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/components/User";

interface BlockNotePageProps {
  className?: string;
}

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

export const BlockNotePage = ({ className }: BlockNotePageProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [addUser, setAddUser] = useState(false);
    const [loadingSaveUser, setLoadingSaveUser] = useState(false);
    const [loadingAddNote, setLoadingAddNote] = useState(false);
    const [selectIdCustomer, setSelectIdCustomer] = useState();
    const [addNote, setAddNote] = useState(false);
    const [name, setName] = useState('');
    const [personIconName, setPersonIconName] = useState('UserOutlined');
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [deadline, setDeadLine] = useState<any>();
    const [deadlineString, setDeadLineString] = useState<any>();
    const auth = useSelector(getUserAuthData);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [customers, setCustomers] = useState<any[]>([]);
    const [notes, setNotes] = useState<any[]>([]);

    const handleSelectMenuItem = (e: any) => {
        setSelectIdCustomer(e.key)
    };

    const handleSaveUser = () => {
        setLoadingSaveUser(true);
        addDoc(collection(db, 'users', auth!.uid, 'customers'), {
            name,
            personIconName,
        })
            .then(() => {
                setName('');
                setPersonIconName('UserOutlined');
                setAddUser(false);
            })
            .catch((error: any) => {
                console.log(error)
                notification.error({
                    message: `Ошибка сохранения клиента: ${error.message}`,
                })
            })
            .finally(() => {
                setLoadingSaveUser(false);
            });
    };

    const handleAddNote = () => {
        if (selectIdCustomer) {
            setLoadingAddNote(true);
            addDoc(collection(db, 'users', auth!.uid, 'customers', selectIdCustomer, 'notes'), {
                title,
                text,
                deadlineString,
                resolved: false,
            })
                .then(() => {
                    setTitle('');
                    setText('');
                    setDeadLine(undefined);
                    setDeadLineString(undefined);
                    setAddNote(false);
                })
                .catch((error: any) => {
                    console.log(error)
                    notification.error({
                        message: `Ошибка сохранения записи: ${error.message}`,
                    })
                })
                .finally(() => {
                    setLoadingAddNote(false);
                });
        }
    };

    useEffect(() => {
        onSnapshot(collection(db, 'users', auth!.uid, 'customers'), (docSnapshot: any) => {
            const result: any[] = [];
            docSnapshot.forEach((doc: any) => {
                const customerResult = {
                    id: '',
                    name: '',
                    personIconName: '',
                };
                const dataRes = doc.data();
                customerResult.id = doc.id;
                customerResult.name = dataRes.name;
                customerResult.personIconName = dataRes.personIconName
                result.push(customerResult);
            });
            console.log(result)
            setCustomers(result)
        })
    }, [])

    useEffect(() => {
        if (selectIdCustomer) {
            onSnapshot(collection(db, 'users', auth!.uid, 'customers', selectIdCustomer, 'notes'), (docSnapshot: any) => {
                const result: any[] = [];
                docSnapshot.forEach((doc: any) => {
                    const noteResult = {
                        id: '',
                        text: '',
                        title: '',
                        deadlineString: '',
                        resolved: '',
                    };
                    const dataRes = doc.data();
                    noteResult.id = doc.id;
                    noteResult.text = dataRes.text;
                    noteResult.title = dataRes.title;
                    noteResult.deadlineString = dataRes.deadlineString
                    noteResult.resolved = dataRes.resolved
                    result.push(noteResult);
                });
                console.log(result);
                setNotes(result)
            })
        }
    }, [selectIdCustomer])

    return (
        <Layout className={classNames(cls.BlockNotePage, {}, [className])}>
            <Sider style={{overflowY: 'auto'}} trigger={null} collapsible collapsed={collapsed}>
                <VStack justify="between" align="center" className={cls.menuWrapper}>
                    <Menu
                        style={{width: '100%'}}
                        onClick={handleSelectMenuItem}
                        theme="dark"
                        selectedKeys={selectIdCustomer ? [selectIdCustomer] : []}
                        mode="inline"
                        items={customers.map((customer) => (
                            {
                                key: customer.id,
                                icon: IconsUser[customer.personIconName as keyof typeof IconsUser],
                                label: customer.name,
                            }
                        ))}
                    />
                    <Button type="primary" style={{margin: '4px', maxWidth: 'inherit'}} onClick={() => setAddUser(true)}>
                        <HStack max>
                            <UserAddOutlined />
                            <div className={classNames(
                                cls.addUserButton,
                                {[cls.addUserButtonCollapsed]: collapsed}
                            )}>Добавить</div>
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
                                    {customers.find((customer) => customer.id === selectIdCustomer).name}
                                </Typography.Title>
                                {/* <Button type="text">
                                    <EditOutlined />
                                </Button> */}
                            </HStack>
                            <Button type="primary" onClick={() => setAddNote(true)}>
                                Добавить задачу
                            </Button>
                        </HStack>
                        <Divider style={{margin: 0}} />
                        <VStack gap="16" max>
                            {notes.map((note) => (

                                <HStack key={note.id} align="start" max justify="between" className={cls.blockWithNote}>
                                    <Checkbox checked={note.resolved} style={{width: '100%'}}>
                                        <VStack max>
                                            <Typography.Text strong delete={note.resolved} style={{marginBottom: 0}}>
                                                {note.title}
                                            </Typography.Text>
                                            <Typography.Text style={{marginBottom: 0}}>
                                                {note.text}
                                            </Typography.Text>
                                        </VStack>
                                    </Checkbox>
                                    <HStack gap="16">
                                        <Typography.Text style={{marginBottom: 0, whiteSpace: 'nowrap'}}>
                                            {note.deadlineString}
                                        </Typography.Text>
                                        <Button type="primary" danger>
                                            <DeleteOutlined />
                                        </Button>
                                    </HStack>
                                </HStack>
                            ))}
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
                    <HStack max gap="8">
                        <Button
                            type="primary"
                            disabled={ loadingAddNote || !title || !text || !deadline || !selectIdCustomer }
                            style={{width: '100%'}}
                            onClick={handleAddNote}
                        >
                            Создать
                        </Button>
                        <Button
                            style={{width: '100%'}}
                            onClick={() => setAddNote(false)}
                        >
                            Закрыть
                        </Button>
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
                    <HStack max gap="8">
                        <Button
                            type="primary"
                            disabled={loadingSaveUser || !name}
                            style={{width: '100%'}}
                            onClick={handleSaveUser}
                        >
                            Добавить
                        </Button>
                        <Button
                            style={{width: '100%'}}
                            onClick={() => setAddUser(false)}
                        >
                            Закрыть
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </Layout>
    );
};
