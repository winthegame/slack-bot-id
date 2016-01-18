var Botkit = require('botkit');

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    throw new Error(err);
  }
});

/*
@idbot: help
*/
controller.hears(["help"], ['direct_mention', 'direct_message'], function(bot, message) {
  bot.startPrivateConversation(message, function(err, convo) {
    if (err) { throw err; }
    convo.say("Here's a short list of commands you can give to me:");
    convo.say("*@idbot: @{user}* to see a person's Slack ID");
    convo.say("*@idbot: #{channel}* to see a channel's Slack ID");
  });
});

/*
@idbot: @user
*/
controller.hears(["<@[^>]+>"], ['direct_message', 'direct_mention'], function(bot, message) {
  var match = /<@([^>]+)>/.exec(message.text);
  if (match === null) {
    if ((match = /@(.+)/.exec(message.text)) !== null) {
      bot.reply(message, "As far as I know, the user @" + match[1] + " doesn't exist.");
    } else {
      bot.reply(message, "Sorry, I don't understand what you mean.");
      bot.reply(message, "Try something like *@idbot: @user* instead!");
    }
  } else {
    var user = match[1];
    bot.reply(message, "The user-id of <@" + user + "> is *" + user + "*.");
  }
});

/*
@idbot: #channel
*/
controller.hears(["<#[^>]+>"], ['direct_message', 'direct_mention'], function(bot, message) {
  var match = /<#([^>]+)>/.exec(message.text);
  if (match === null) {
    if ((match = /#(.+)/.exec(message.text)) !== null) {
      bot.reply(message, "As far as I know, the channel #" + match[1] + " doesn't exist.");
    } else {
      bot.reply(message, "Sorry, I don't understand what you mean.");
      bot.reply(message, "Try something like *@idbot: #channel* instead!");
    }
  } else {
    var channel = match[1];
    bot.reply(message, "The channel-id of <#" + channel + "> is *" + channel + "*.");
  }
});
