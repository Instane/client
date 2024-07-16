import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(1);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [currentpage, setCurrentPage] = useState(1);
  const [gametype, setGameType] = useState("");
  const [selectcategory, setSelectCategory] = useState("");
  const [topictype, setTopicType] = useState("");
  const [gamescore, setGameScore] = useState(Number);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
