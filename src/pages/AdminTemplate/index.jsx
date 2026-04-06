import { Outlet, Navigate, Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(<Link to="/admin/dashboard">Dashboard</Link>, '1', <PieChartOutlined />),
    getItem('Người dùng', 'sub1', <UserOutlined />, [
        getItem(<Link to="/admin/list-user">Quản lý người dùng</Link>, '3'),
        getItem(<Link to="/admin/add-user">Thêm người dùng</Link>, '4'),
    ]),
    getItem("Phim", "film", <DesktopOutlined />, [
        getItem(<Link to="/admin/list-films">Quản lý phim</Link>, 'list-film'),
        getItem(<Link to="/admin/add-film">Thêm phim</Link>, 'add-film'),
    ]),
];


export default function AdminTemplate() {
    const { data } = useSelector(state => state.loginAdminReducer);
    const location = useLocation();

    const getBreadcrumbItems = () => {
        const path = location.pathname;
        const breadcrumbs = [{ title: "Admin" }];

        if (path.includes("dashboard")) {
            breadcrumbs.push({ title: "Dashboard" });
        } else if (path.includes("list-user")) {
            breadcrumbs.push({ title: "Người dùng" });
            breadcrumbs.push({ title: "Quản lý người dùng" });
        } else if (path.includes("add-user")) {
            breadcrumbs.push({ title: "Người dùng" });
            breadcrumbs.push({ title: "Thêm người dùng" });
        } else if (path.includes("update-user")) {
            breadcrumbs.push({ title: "Người dùng" });
            breadcrumbs.push({ title: "Cập nhật người dùng" });
        } else if (path.includes("list-films")) {
            breadcrumbs.push({ title: "Phim" });
            breadcrumbs.push({ title: "Quản lý phim" });
        } else if (path.includes("add-film")) {
            breadcrumbs.push({ title: "Phim" });
            breadcrumbs.push({ title: "Thêm phim" });
        } else if (path.includes("update-film")) {
            breadcrumbs.push({ title: "Phim" });
            breadcrumbs.push({ title: "Cập nhật phim" });
        }

        return breadcrumbs;
    };

    if (!data) {
        return <Navigate to="/auth" />
    }

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" selectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={getBreadcrumbItems()} />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
