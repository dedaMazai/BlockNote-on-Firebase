import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { classNames } from '@/lib/classNames/classNames';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { isBrowser } from 'react-device-detect';
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
    Skeleton,
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
import { db } from '@/firebase';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/components/User';

import cls from './BlockNotePage.module.scss';

interface BlockNotePageProps {
    className?: string;
}

const ONE_DAY_IN_MILLISECOND = 86400000;

export const BlockNotePage = ({ className }: BlockNotePageProps) => {
    const [collapsed, setCollapsed] = useState(true);
    const [addUser, setAddUser] = useState(false);
    const [loadingSaveUser, setLoadingSaveUser] = useState(false);
    const [loadingAddNote, setLoadingAddNote] = useState(false);
    const [selectIdCustomer, setSelectIdCustomer] = useState();
    const [addNote, setAddNote] = useState(false);
    const [showDeletePerson, setShowDeletePerson] = useState(false);
    const [name, setName] = useState('');
    const [personIconName, setPersonIconName] = useState('UserOutlined');
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [loadingNote, setLoadingNotes] = useState(false);
    const [deadline, setDeadLine] = useState<any>();
    const [deadlineString, setDeadLineString] = useState<any>();
    const auth = useSelector(getUserAuthData);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [customers, setCustomers] = useState<any[]>([]);
    const [notes, setNotes] = useState<any[]>([]);
    const [attentions, setAttentions] = useState<any[]>([]);

    const selectUser = useMemo(() => (
        customers?.find(
            (customer) =>
                customer?.id ===
                selectIdCustomer,
        )
    ), [customers, selectIdCustomer])

    const handleSelectMenuItem = (e: any) => {
        setSelectIdCustomer(e.key);
        setLoadingNotes(true);
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
                console.log(error);
                notification.error({
                    message: `Ошибка сохранения клиента: ${error.message}`,
                });
            })
            .finally(() => {
                setLoadingSaveUser(false);
            });
    };

    const handleAddNote = () => {
        if (selectIdCustomer) {
            setLoadingAddNote(true);
            setAddNote(false);
            addDoc(
                collection(
                    db,
                    'users',
                    auth!.uid,
                    'customers',
                    selectIdCustomer,
                    'notes',
                ),
                {
                    title,
                    text,
                    deadlineString,
                    deadline,
                    resolved: false,
                },
            )
                .then(() => {
                    setTitle('');
                    setText('');
                    setDeadLine(undefined);
                    setDeadLineString(undefined);
                })
                .catch((error: any) => {
                    console.log(error);
                    notification.error({
                        message: `Ошибка сохранения записи: ${error.message}`,
                    });
                })
                .finally(() => {
                    setLoadingAddNote(false);
                });
        }
    };

    const getNames = async (id: string) => {
        const notesRef = collection(
            db,
            'users',
            auth!.uid,
            'customers',
            id,
            'notes',
        );
        const q = query(
            notesRef,
            where("resolved", "==", false),
            where("deadline", "<", new Date().getTime() + ONE_DAY_IN_MILLISECOND)
        )
        const querySnapshot = await getDocs(q);
        let result: string | undefined = undefined;
        querySnapshot.forEach((doc) => {
            if (doc.ref.parent.parent?.id) result = doc.ref.parent.parent?.id
        });
        return result;
    }

    const handleDeleteNode = async (id: string) => {
        if (selectIdCustomer) {
            await deleteDoc(
                doc(
                    db,
                    'users',
                    auth!.uid,
                    'customers',
                    selectIdCustomer,
                    'notes',
                    id,
                ),
            );
        }
    };

    const handleDeleteUser = async () => {
        if (selectUser?.id) {
            await deleteDoc(
                doc(
                    db,
                    'users',
                    auth!.uid,
                    'customers',
                    selectUser?.id,
                ),
            );
            setShowDeletePerson(false);
        }
    };

    const handleChangeResolve = async (id: string, resolved: boolean) => {
        if (selectIdCustomer) {
            const note = doc(
                db,
                'users',
                auth!.uid,
                'customers',
                selectIdCustomer,
                'notes',
                id,
            );
            if (resolved) {
                notification.error({
                    message: 'Отменено.',
                });
                await updateDoc(note, {
                    resolved: false,
                });
            } else {
                notification.success({
                    message: 'Выполнено!',
                });
                await updateDoc(note, {
                    resolved: true,
                });
            }
        }
    };

    useEffect(() => {
        if (auth?.uid) {
            onSnapshot(
                collection(db, 'users', auth!.uid, 'customers'),
                (docSnapshot: any) => {
                    const res = async () => {
                        const result: any[] = [];
                        const attentions: string[] = [];
                        await docSnapshot?.forEach(async (doc: any) => {
                            const customerResult = {
                                id: '',
                                name: '',
                                personIconName: '',
                            };
                            const dataRes = doc?.data();
                            customerResult.id = doc?.id;
                            customerResult.name = dataRes?.name;
                            customerResult.personIconName = dataRes?.personIconName;
                            result.push(customerResult);
                        });
                        setCustomers(result);
                        setSelectIdCustomer(result?.[0]?.id)

                        for (const doc of result) {
                            const name = await getNames(doc.id);
                            if (name) attentions.push(name);
                        }
                        const uniqueAttentions = Array.from(new Set(attentions))
                        setAttentions(uniqueAttentions.map((id) => (
                            result?.find((customer) => customer.id === id)
                        )));
                        console.log(uniqueAttentions.map((id) => (
                            result?.find((customer) => customer.id === id)
                        )))
                    }
                    res();
                },
            );
        }
    }, []);

    useEffect(() => {
        if (selectIdCustomer && auth?.uid) {
            onSnapshot(
                collection(
                    db,
                    'users',
                    auth.uid,
                    'customers',
                    selectIdCustomer,
                    'notes',
                ),
                (docSnapshot: any) => {
                    const result: any[] = [];
                    docSnapshot?.forEach((doc: any) => {
                        const noteResult = {
                            id: '',
                            text: '',
                            title: '',
                            deadlineString: '',
                            deadline: '',
                            resolved: '',
                        };
                        const dataRes = doc.data();
                        noteResult.id = doc?.id;
                        noteResult.text = dataRes?.text;
                        noteResult.title = dataRes?.title;
                        noteResult.deadlineString = dataRes?.deadlineString;
                        noteResult.deadline = dataRes?.deadline;
                        noteResult.resolved = dataRes?.resolved;
                        result.push(noteResult);
                    });
                    setNotes(result);
                    setLoadingNotes(false);
                },
            );
        }
    }, [selectIdCustomer]);

    return (
        <Layout className={classNames(cls.BlockNotePage, {}, [className])}>
            <Sider
                style={{ overflowY: 'auto' }}
                trigger={null}
                collapsible
                collapsed={isBrowser ? collapsed : true}
            >
                    <VStack
                        justify="between"
                        align="center"
                        className={cls.menuWrapper}
                    >
                        {customers.length ? (
                            <Menu
                                style={{ width: '100%' }}
                                onClick={handleSelectMenuItem}
                                theme="dark"
                                selectedKeys={
                                    selectIdCustomer ? [selectIdCustomer] : [customers?.[0]?.id]
                                }
                                mode="inline"
                                items={customers.map((customer) => ({
                                    key: customer?.id,
                                    icon: IconsUser[
                                        customer?.personIconName as keyof typeof IconsUser
                                    ],
                                    label: customer?.name,
                                }))}
                            />
                        ) : (
                            <VStack gap="16">
                                <div className={cls.skeletonWrapper}>
                                    <Skeleton.Input active size="default" block />
                                </div>
                            </VStack>
                        )}
                        <Button
                            type="primary"
                            style={{
                                margin: '4px',
                                marginBottom: '16px',
                                maxWidth: 'inherit',
                            }}
                            onClick={() => setAddUser(true)}
                        >
                            <HStack max>
                                <UserAddOutlined />
                                <div
                                    className={classNames(cls.addUserButton, {
                                        [cls.addUserButtonCollapsed]: collapsed,
                                    })}
                                >
                                    Добавить
                                </div>
                            </HStack>
                        </Button>
                    </VStack>
            </Sider>
            <Layout style={{overflowY: 'auto',}}>
                <HStack className={cls.Header}>
                    {isBrowser && (
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                marginRight: '24px',
                            }}
                        />
                    )}
                    {selectIdCustomer && (
                        <div className={classNames(cls.attentionWrapper, {[cls.paddingLeftMobile]: !isBrowser})}>
                            {attentions.map((customer) => (
                                <Button type="primary" size="large" danger onClick={() => setSelectIdCustomer(customer.id)}>
                                    {customer.name}
                                </Button>
                            ))}
                        </div>
                    )}
                </HStack>
                {selectIdCustomer ? (
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 'max-content',
                            background: colorBgContainer,
                        }}
                    >
                        <VStack gap="16">
                            <div className={cls.wrapperContent}>
                                <HStack gap="8">
                                    <Typography.Title
                                        level={4}
                                        style={{ marginBottom: 0 }}
                                    >
                                        {selectUser?.name}
                                    </Typography.Title>
                                    <Button
                                        type="text"
                                        onClick={() => setShowDeletePerson(true)}
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                </HStack>
                                <Button
                                    type="primary"
                                    onClick={() => setAddNote(true)}
                                >
                                    Добавить задачу
                                </Button>
                            </div>
                            <Divider style={{ margin: 0 }} />
                            {loadingNote ? (
                                <VStack gap="16" max>
                                    <Skeleton.Input active size="large" block />
                                </VStack>
                            ) : (
                                <VStack gap="16" max>
                                    {notes.map((note) => (
                                        <div
                                            key={note.id}
                                            className={classNames(
                                                cls.blockWithNote,
                                                {
                                                    [cls.attentions]: (
                                                        !note.resolved
                                                            && note.deadline < new Date().getTime() + ONE_DAY_IN_MILLISECOND
                                                        )
                                                }
                                            )}
                                        >
                                            <Checkbox
                                                checked={note.resolved}
                                                onClick={(e) =>
                                                    handleChangeResolve(
                                                        note.id,
                                                        note.resolved,
                                                    )
                                                }
                                                style={{ width: '100%' }}
                                            >
                                                <VStack max>
                                                    <Typography.Text
                                                        strong
                                                        delete={note.resolved}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        {note.title}
                                                    </Typography.Text>
                                                    <Typography.Text
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        {note.text}
                                                    </Typography.Text>
                                                </VStack>
                                            </Checkbox>
                                            <div className={cls.wrapperDelete}>
                                                <Typography.Text
                                                    style={{
                                                        marginBottom: 0,
                                                    }}
                                                >
                                                    {note.deadlineString}
                                                </Typography.Text>
                                                <Button
                                                    type="primary"
                                                    danger
                                                    onClick={() =>
                                                        handleDeleteNode(
                                                            note.id,
                                                        )
                                                    }
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </VStack>
                            )}
                        </VStack>
                    </Content>
                ) : (
                    <VStack gap="8" className={cls.marginTitle}>
                        <Typography.Title
                            level={5}
                        >
                            В хранилище нет клиентов...
                        </Typography.Title>
                        <Button
                            type="primary"
                            onClick={() => setAddUser(true)}
                        >
                            <HStack max gap="8">
                                <UserAddOutlined />
                                Создать клиента
                            </HStack>
                        </Button>
                    </VStack>
                )}
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
                        <Typography.Title
                            level={5}
                            style={{
                                width: '100px',
                                flexShrink: 0,
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Заголовок:
                        </Typography.Title>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </HStack>
                    <HStack gap="16" max>
                        <Typography.Title
                            level={5}
                            style={{
                                width: '100px',
                                flexShrink: 0,
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Описание:
                        </Typography.Title>
                        <Input.TextArea
                            autoSize
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </HStack>
                    <HStack gap="16" max>
                        <Typography.Title
                            level={5}
                            style={{
                                width: '100px',
                                flexShrink: 0,
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Дедлайн:
                        </Typography.Title>
                        <DatePicker
                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                            value={deadline ? dayjs(deadline) : undefined}
                            showTime
                            onChange={(value, valueString) => {
                                setDeadLine(value?.valueOf());
                                setDeadLineString(valueString);
                            }}
                        />
                    </HStack>
                    <HStack max gap="8">
                        <Button
                            type="primary"
                            disabled={
                                loadingAddNote ||
                                !title ||
                                !text ||
                                !deadline ||
                                !selectIdCustomer
                            }
                            style={{ width: '100%' }}
                            onClick={handleAddNote}
                        >
                            Создать
                        </Button>
                        <Button
                            style={{ width: '100%' }}
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
                    <Row
                        justify="center"
                        gutter={[4, 4]}
                        style={{ width: '100%' }}
                    >
                        {Object.entries(IconsUser).map(
                            ([keyName, iconValue]) => (
                                <Col xs={4} key={keyName}>
                                    <Button
                                        type={
                                            personIconName === keyName
                                                ? 'primary'
                                                : 'text'
                                        }
                                        onClick={() =>
                                            setPersonIconName(keyName)
                                        }
                                        style={{ width: '100%' }}
                                    >
                                        {iconValue}
                                    </Button>
                                </Col>
                            ),
                        )}
                    </Row>
                    <HStack max gap="8">
                        <Button
                            type="primary"
                            disabled={loadingSaveUser || !name}
                            style={{ width: '100%' }}
                            onClick={handleSaveUser}
                        >
                            Добавить
                        </Button>
                        <Button
                            style={{ width: '100%' }}
                            onClick={() => setAddUser(false)}
                        >
                            Закрыть
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
            <Modal
                centered
                open={showDeletePerson}
                onOk={() => setShowDeletePerson(false)}
                onCancel={() => setShowDeletePerson(false)}
                footer={null}
                closable={false}
            >
                <VStack gap="16">
                    <Typography.Title
                        level={5}
                        style={{
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        Вы уверены что хотите удалить {selectUser?.name}
                    </Typography.Title>
                    <HStack max gap="8">
                        <Button
                            type="primary"
                            style={{ width: '100%' }}
                            onClick={handleDeleteUser}
                        >
                            Удалить
                        </Button>
                        <Button
                            style={{ width: '100%' }}
                            onClick={() => setShowDeletePerson(false)}
                        >
                            Отмена
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </Layout>
    );
};
