import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import SortBar from './SortBar'; 

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [showBotSpecs, setShowBotSpecs] = useState(false);
  const [selectedBot, setSelectedBot] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch("http://localhost:8002/bots");
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBots();
  }, []);

  const enlistBot = (bot) => {
    if (!enlistedBots.some((enlistedBot) => enlistedBot.id === bot.id)) {
      setEnlistedBots((prevEnlistedBots) => [...prevEnlistedBots, bot]);
    }
  };

  const releaseBot = (botId) => {
    setEnlistedBots((prevEnlistedBots) =>
      prevEnlistedBots.filter((bot) => bot.id !== botId)
    );
  };

  const dischargeBot = async (botId) => {
    try {
      const response = await fetch(`http://localhost:8002/bots`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete bot from the backend.");
      }

      setEnlistedBots((prevEnlistedBots) =>
        prevEnlistedBots.filter((bot) => bot.id !== botId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const showBotSpecsHandler = (bot) => {
    setSelectedBot(bot);
    setShowBotSpecs(true);
  };

  const hideBotSpecs = () => {
    setShowBotSpecs(false);
  };

  const sortBots = (property) => {
    setBots((prev) => [...prev].sort((a, b) => b[property] - a[property]));
  };

  const filterBots = (selectedClasses) => {
    if (selectedClasses.length === 0) {
      ;
    } else {
      const filteredBots = bots.filter((bot) =>
        selectedClasses.includes(bot.bot_class)
      );
      setBots(filteredBots);
    }
  };

  const botClasses = [
    "Support",
    "Medic",
    "Assault",
    "Defender",
    "Captain",
    "Witch",
  ];

  return (
    <div className="App">
      <h1>Bot Battlr - Custom Build Your Own Bot Army</h1>
      <div className="App-content">
        <div className="App-left">
          <SortBar sortBots={sortBots} />
          <BotCollection
            bots={bots}
            yourBotArmy={enlistedBots}
            enlistBot={enlistBot}
            releaseBot={releaseBot}
            dischargeBot={dischargeBot}
            showBotSpecs={showBotSpecsHandler}
          />
        </div>
        <div className="App-right">
          <YourBotArmy
            yourBotArmy={enlistedBots}
            releaseBot={releaseBot}
            dischargeBot={dischargeBot}
          />
        </div>
      </div>
      {showBotSpecs && selectedBot && (
        <div className="App-bot-specs">
          <button onClick={hideBotSpecs}>Back</button>
          <button onClick={() => enlistBot(selectedBot)}>Enlist</button>
          <h2>{selectedBot.name}</h2>
          <p>Health: {selectedBot.health}</p>
          <p>Damage: {selectedBot.damage}</p>
          <p>Armor: {selectedBot.armor}</p>
          <p>Bot Class: {selectedBot.bot_class}</p>
          <p>Catchphrase: {selectedBot.catchphrase}</p>
          <img src={selectedBot.avatar_url} alt="Bot Avatar" />
        </div>
      )}
      <div className="App-filter">
        <p>Filter by class:</p>
        {botClasses.map((botClass) => (
          <label key={botClass}>
            <input
              type="checkbox"
              value={botClass}
              onChange={(e) => {
                const selectedClasses = botClasses.filter(
                  (className) =>
                    e.target.value === className || classes.includes(className)
                );
                setClasses(selectedClasses);
                filterBots(selectedClasses);
              }}
            />
            {botClass}
          </label>
        ))}
        <button
          onClick={() => {
            setClasses([]);
            filterBots([]);
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default BotsPage;
