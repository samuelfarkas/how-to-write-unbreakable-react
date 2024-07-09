describe("useList hook", () => {
  test("should toggle selectedTodos correctly", () => {
    const { result } = renderHook(() => useList());

    // Initially, selectedTodos should be empty
    expect(result.current.selectedTodos).toEqual([]);

    // Add an item to selectedTodos
    act(() => {
      result.current.actions.toggleSelectedTodo(1);
    });
    expect(result.current.selectedTodos).toEqual([1]);

    // Add another item to selectedTodos
    act(() => {
      result.current.actions.toggleSelectedTodo(2);
    });
    expect(result.current.selectedTodos).toEqual([1, 2]);

    // Remove the first item from selectedTodos
    act(() => {
      result.current.actions.toggleSelectedTodo(1);
    });
    expect(result.current.selectedTodos).toEqual([2]);

    // Remove the second item from selectedTodos
    act(() => {
      result.current.actions.toggleSelectedTodo(2);
    });
    expect(result.current.selectedTodos).toEqual([]);
  });
});
