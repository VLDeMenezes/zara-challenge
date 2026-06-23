import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce hook", () => {
  it("Should return the initial value instant", () => {
    const { result } = renderHook(() => useDebounce("iphone"));

    expect(result.current).toEqual("iphone");
  });

  it("Should debounce updates", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: { value: "iphone" },
      },
    );

    rerender({ value: "samsung" });

    expect(result.current).toBe("iphone");

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe("samsung");

    vi.useRealTimers();
  });

  it("Should debounce updates", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: { value: "iphone" },
      },
    );

    rerender({ value: "samsung" });

    expect(result.current).toBe("iphone");

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe("samsung");

    vi.useRealTimers();
  });
});
