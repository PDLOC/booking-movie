import { Outlet, Navigate, Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { lazy, Suspense } from "react"
import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined,
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
    getItem("Trang chủ", "0", <PieChartOutlined />),
    getItem('Người dùng', '1', <UserOutlined />, [
        getItem(<Link to="/admin/list-user">Quản lý người dùng</Link>, '3'),
        getItem(<Link to="/admin/add-user">Thêm người dùng</Link>, '4'),
    ]),
    getItem("Phim", '2', <DesktopOutlined />, [
        getItem(<Link to="/admin/list-films">Quản lý phim</Link>, '5'),
        getItem(<Link to="/admin/add-film">Thêm phim</Link>, '6'),
    ]),
    getItem("Đăng xuất", '9', <LogoutOutlined />),
];

export default function AdminTemplate() {
    const { data } = useSelector(state => state.loginAdminReducer);
    const location = useLocation();
    const navigate = useNavigate();

    const getKey = () => {
        const path = location.pathname;
        if (path.includes("list-user")) {
            return "3";
        } else if (path.includes("add-user")) {
            return "4";
        } else if (path.includes("list-films")) {
            return "5";
        } else if (path.includes("add-film")) {
            return "6";
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("USER_ADMIN");
        navigate("/", { replace: true });
        window.location.reload();
    };

    const getOpenKey = () => {
        const path = location.pathname;
        if (path.includes("user")) return '1';
        if (path.includes("film")) return '2';
        return '1';
    };

    const getBreadcrumbItems = () => {
        const path = location.pathname;
        const breadcrumbs = [{ title: "Admin" }];

        if (path.includes("list-user")) {
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
        } else if (path.includes("showtime")) {
            breadcrumbs.push({ title: "Phim" });
            breadcrumbs.push({ title: "Thêm lịch" });
        }
        return breadcrumbs;
    };

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    selectedKeys={[getKey()]}
                    defaultOpenKeys={[getOpenKey()]}
                    mode="inline"
                    onClick={(e) => {
                        if (e.key === '9') {
                            handleLogout();
                        }
                        if (e.key === '0') {
                            navigate("/");
                        }
                    }}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <h1 className="text-right p-4 font-bold text-lg"><i class="fa-solid fa-circle-user"></i> {data.hoTen}</h1>
                </Header>
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
                        <Suspense fallback={<div className="flex justify-center items-center h-full">Đang tải...</div>}>
                            <Outlet />
                        </Suspense>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
