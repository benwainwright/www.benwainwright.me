import { render, screen } from "@testing-library/react"
import { Anchor } from "./anchor"

describe("<Anchor>", () => {
  it("renders its children without errors", () => {
    render(
      <Anchor>
        <p>test</p>
      </Anchor>
    )

    expect(screen.queryByText("test")).toBeInTheDocument()
  })
})
