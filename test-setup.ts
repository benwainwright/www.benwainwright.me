import "jest-extended"
import "@testing-library/jest-dom/extend-expect"

import { createSerializer, matchers } from "@emotion/jest"

expect.extend(matchers)

expect.addSnapshotSerializer(createSerializer())
