import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(1);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [currentpage, setCurrentPage] = useState();
  const [gametype, setGameType] = useState("");
  const [selectcategory, setSelectCategory] = useState("");
  const [topictype, setTopicType] = useState("");
  const [gamescore, setGameScore] = useState(Number);
  const [IPCONFIG, setIPCONFIG] = useState("http://10.243.243.219:8080");

  return (
    <GlobalContext.Provider
      value={{
        currentpage,
        setCurrentPage,
        gametype,
        setGameType,
        selectcategory,
        setSelectCategory,
        topictype, 
        setTopicType,
        gamescore, 
        setGameScore,
        IPCONFIG, 
        setIPCONFIG
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
