import React from "react";
import Chat from "./Chat";

export default function All() {
  return (
    <div className="flex items-center flex-col overflow-x-auto min-h-[420px] max-h-[420px]">
      <Chat
        profile="../public/assets/profile.jpg"
        name="John Doe"
        lastMessage="quod deserunt, dolore aut?"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Tony Stark"
        lastMessage="Lorem ipsum dolor sit amet"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Marry Bob"
        lastMessage="eveniet quae ipsa consequuntur"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Sara Sam"
        lastMessage="doloremque soluta accusantium,"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Tony Stark"
        lastMessage="amet consectetur adipisicing"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Sara Sam"
        lastMessage="dignissimos, voluptates quaerat velit"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Marry Bob"
        lastMessage="Asperiores nam mollitia fugiat"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Tony Stark"
        lastMessage="dignissimos, voluptates quaerat velit"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Bob Marly"
        lastMessage="quod deserunt, dolore aut?"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Lora Barry"
        lastMessage="amet consectetur adipisicing"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="John Doe"
        lastMessage="Lorem ipsum dolor sit amet"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Marry Bob"
        lastMessage="quod deserunt, dolore aut?"
      />
      <Chat
        profile="../public/assets/profile.jpg"
        name="Tony Stark"
        lastMessage="dignissimos, voluptates quaerat velit"
      />
    </div>
  );
}
