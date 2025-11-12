import { formatNameWithHyphens } from "./formatName";

describe("formatNameWithHyphens", () => {
  it("should format a name with hyphens", () => {
    expect(formatNameWithHyphens("John Doe")).toBe("John-Doe");
  });

  it("should handle multiple spaces between words", () => {
    expect(formatNameWithHyphens("John   Doe")).toBe("John-Doe");
  });

  it("should handle leading and trailing spaces", () => {
    expect(formatNameWithHyphens("  John Doe  ")).toBe("John-Doe");
  });
});

