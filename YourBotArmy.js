import React from 'react';

const YourBotArmy = ({ enlistedBots, releaseBot, dischargeBot }) => {
  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
      <h2>Your Bot Army</h2>
      <div className="bot-list">
        {enlistedBots && enlistedBots.map((bot) => (
          <div key={bot.id} className="bot-card">
            <h3>{bot.name}</h3>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <p>Bot Class: {bot.bot_class}</p>
            <img src={bot.avatar_url} alt='Bot Avatar' />
            <button onClick={() => releaseBot(bot.id)}>Release</button>
            <button onClick={() => dischargeBot(bot.id)}>Discharge</button>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default YourBotArmy;
