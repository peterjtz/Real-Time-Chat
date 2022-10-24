import WordList from "@/components/CreateMessage.vue";

describe("WordList.vue", () => {
  it("has the correct method", () => {
    expect(typeof WordList.methods.createMessage).toBe("function");
  });

  it("sets the correct default data", () => {
    expect(typeof WordList.data).toBe("function");
    const defaultData = WordList.data();
    expect(defaultData.newMessage).toBe(null);
    expect(defaultData.errorText).toBe(null);
  });
});