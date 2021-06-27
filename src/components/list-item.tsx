import { FC, Fragment } from "react"
import styled from "@emotion/styled"

const StyledLi = styled.li`
  line-height: 2rem;
`

const ListItem: FC = props => {
  return <StyledLi>{props.children}</StyledLi>
}

export default ListItem
