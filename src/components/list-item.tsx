import { FC } from "react"
import styled from "@emotion/styled"

const StyledLi = styled.li`
	font-family: "Milliard";
	line-height: 2rem;
	font-size: 1.15rem;
	text-align: left;
	@media (max-width: 800px) {
		line-height: 1.7rem;
	}
`

const ListItem: FC = props => {
	return <StyledLi>{props.children}</StyledLi>
}

export default ListItem
