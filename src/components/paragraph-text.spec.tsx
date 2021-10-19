import { render, screen } from "@testing-library/react"
import ParagraphText from "./paragraph-text"

test("the paragraph-text component should render without throwing any errors", () => {
  render(<ParagraphText />)
})

test("the paragraph-text component should pass through all its props to the underlying component", () => {
  render(<ParagraphText role="foo" />)

  expect(screen.queryByRole("foo")).toBeInTheDocument()
})
