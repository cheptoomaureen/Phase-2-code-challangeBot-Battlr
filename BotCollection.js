import React, { useState,useEffect } from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, enlistBot }) {
  
  const [enlistedBots, setEnlistedBots] = useState([]);

  useEffect(() => {
    setEnlistedBots(bots.filter(bot => bot.enlisted));
  }, [bots]);

  const handleBotPost = (bot) => {
    // Add the bot to the enlisted bots list
    setEnlistedBots([...enlistedBots, bot]);
  };

  const handleBotDelete = (botId) => {
    // Remove the bot from the enlisted bots list
    setEnlistedBots(enlistedBots.filter((bot) => bot.id !== botId));

  };
  return (
    <div className="ui four column grid">
      <div className="row">
        {bots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            enlistBot={enlistBot} 
            onDelete={ handleBotDelete}
            onPost={handleBotPost}
          />
        ))}
        Collection of all bots
      </div>
    </div>
  );
}

export default BotCollection;
