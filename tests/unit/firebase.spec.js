import firebase from "@/firebase/init";
let fb = firebase.firestore;

const createMessage = async (
  message,
  name,
  timestamp,
  status,
  updatedBy
) => {
  await fb.collection("messages").add({
    message,
    name,
    timestamp,
    status,
    updatedBy
  })          
  .catch(err => {
    console.log(err);
  });

  return true;
};

describe("createFreeCourse", () => {
  it("creates a message in messages", async () => {
    const result = createMessage(
      "firebase testing 123",
      "Jest test",
      Date.now(),
      "Admin",
      ""
    );
    await expect(result).resolves.toEqual(true);
  });
});