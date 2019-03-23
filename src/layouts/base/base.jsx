import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './base.css';

import { BrowserRouter, Switch, NavLink } from 'react-router-dom';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import NotFound from '../../pages/NotFound';
import Nested from '../../pages/Nested';
import { ProtectedRoute } from '../../routes';
import { Login } from '../login/login';
import { Authentication } from '../../services';
import { VSider, VMenu } from '../../components';

const { Header, Sider, Content } = Layout;

class BaseLayout extends Component {
	state = {
		collapsed: false
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	logo = () => {
		return this.state.collapsed === false ? <span>Vidly</span> : <span>V</span>;
	};

	handleLogout = () => {
		Authentication.logout();
		this.props.history.push('/login');
	};

	renderClasses = () => {
		let classes = 'logo text-';
		classes += this.state.collapsed ? 'left' : 'center';
		return classes;
	};

	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<Layout style={{ height: '100vh' }}>
						<VSider trigger={null} collapsible collapsed={this.state.collapsed}>
							<div className={this.renderClasses()}>{this.logo()}</div>
							<VMenu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
								<VMenu.Item key="1">
									<NavLink to="/">
										<Icon type="home" />
										<span>Home</span>
									</NavLink>
								</VMenu.Item>
								<VMenu.Item key="2">
									<NavLink to="/about">
										<Icon type="read" />
										<span>About</span>
									</NavLink>
								</VMenu.Item>
								<VMenu.Item key="3">
									<NavLink to="/contact">
										<Icon type="phone" />
										<span>Contact</span>
									</NavLink>
								</VMenu.Item>
								<VMenu.Item key="4">
									<NavLink to="/nested">
										<Icon type="mail" />
										<span>Nested</span>
									</NavLink>
								</VMenu.Item>
								<VMenu.Item key="5" onClick={this.handleLogout}>
									<Icon type="poweroff" />
									<span>Logout</span>
								</VMenu.Item>
							</VMenu>
						</VSider>
						<Layout>
							<Header style={{ background: '#fff', padding: 0 }}>
								<Icon
									className="trigger"
									type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
									onClick={this.toggle}
								/>
							</Header>
							<Content
								style={{
									margin: '24px 16px',
									padding: 24,
									background: '#fff',
									minHeight: 400
								}}
							>
								<div>
									<Switch>
										<ProtectedRoute path="/login" component={Login} />
										<ProtectedRoute path="/" component={Home} exact />
										<ProtectedRoute path="/about" component={About} />
										<ProtectedRoute
											path="/contact"
											component={Contact}
											render={props => <Contact {...props} />}
										/>
										<ProtectedRoute path="/nested" component={Nested} />
										<ProtectedRoute component={NotFound} />
									</Switch>
								</div>
							</Content>
						</Layout>
					</Layout>
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default BaseLayout;
