import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import ChatBox from "../components/miscellaneous/ChatBox";
import Mychats from "../components/miscellaneous/Mychats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { useState } from "react";
const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  return (
    <div style={{ width: "100" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91vh"
        p="10px"
        color="white"
      >
        {user && <Mychats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
