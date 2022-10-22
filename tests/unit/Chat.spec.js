import { shallowMount, mount } from "@vue/test-utils";
import Chat from "@/views/Chat.vue";

const ChatWrapper = shallowMount(Chat);

describe("Chat", () => {
    it("does h2 title exists",() => {
        expect(ChatWrapper.find("h2").text()).toBe("Real-Time Ch");
    });

    it("does h5 title exists",() => {
        expect(ChatWrapper.find("h5").text()).toBe("Powered by Vue.js & Firebase");
    });
    
    it("renders the correct message", () => {
        expect(ChatWrapper.text().split('\n')[0]).toBe("Sign Out");
        expect(ChatWrapper.text().split('\n')[1]).toBe("       Real-Time Chat Powered by Vue.js & Firebase ");
    });
});