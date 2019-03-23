import styled from 'styled-components';
import { Menu } from 'antd';

const { Item } = Menu;

const VMenu = styled(Menu)`
	color: white;
`;

const VItem = styled(Item)`
	&:hover * {
		color: orangered !important;
	}
`;

VMenu.Item = VItem;
export { VMenu };
