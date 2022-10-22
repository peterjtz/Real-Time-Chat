import { shallowMount, mount } from "@vue/test-utils";
import CreateMessage from "@/components/CreateMessage.vue";

const wrapper = shallowMount(CreateMessage);

describe("CreateMessage", () => {
  it("has a createMessage method", () => {
    expect(typeof CreateMessage.methods.createMessage).toBe("function");
  });

  it("sets the correct default data", () => {
    expect(typeof CreateMessage.data).toBe("function");
    const defaultData = CreateMessage.data();
    expect(defaultData.newMessage).toBe(null);
    expect(defaultData.errorText).toBe(null);
  });

  it("correctly sets the message when created", () => {
    expect(wrapper.vm.$data.newMessage).toBe(null);
    expect(wrapper.vm.$data.errorText).toBe(null);
  });

  it("renders the correct message", () => {
    expect(wrapper.text()).toBe("Emoji  \n      Submit");
  });
});