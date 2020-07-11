---
layout:	post
title:	"Building a chatbot with Rasa"
date:	2018-08-18
description: Get your hands dirty by creating a fully functional AI Chatbot
tag: [chatbot, ai, python]
image: img/1R1HRk-lpEcHaFz2fiiCC3Q.jpeg
---

  ![](/img/1R1HRk-lpEcHaFz2fiiCC3Q.jpeg)

#### Introduction

Before getting stared with the development lets first dwell into the requirements and why we drilled down to the mentioned technology. I wanted to build a chatbot which is able to learn the intent of the user, interact intelligently, perform actions if users asks so, provide efficient learning mechanism and most importantly doesn’t use any paid services. There are a bunch of online services (like [wit.ai](https://wit.ai/)) which provide nice NLU features but charge for traffic. This lead me to search for an open-source framework which can provides sufficient independence in building the bot. One such tool is [Rasa](https://rasa.com/).

#### Rasa — A chatbot solution

Rasa provides a set of tools to build a complete chatbot at your local desktop and completely free. Their flagship tools are,

* **Rasa NLU**: A natural language understanding solution which takes the user input and tries to infer the intent and extract the available entities.
* **Rasa Core**: A dialog management solution tries to build a probability model which decides the set of actions to perform based on the previous set of user inputs.
Some keywords you will find repeatably used in the post in reference to Rasa functions/tools,

* **Intent**: Consider it as the aim or target of the user input. If a user say, “*Which day is today*?”, the intent would be finding the day of the week.
* **Entity**: Consider it as the useful information from the user input that can be extracted. From previous example, by intent we understand the aim is to find the day of week, but of which date? If we extract “*Today*” as the entity, we can perform the action on today.
* **Actions**: As the name suggest, its an operation which can be performed by the bot. It could be replying something in return, querying a database or any other thing possible by code.
* **Stories**: These are a sample interaction between the user and bot, defined in terms of intents captured and actions performed. So developer can mention what to do if you get a use input of some intent with/without some entities. Like saying if user intent is to find the day of week and entity is today, find day of week of today and reply.
To make this work, Rasa need some files, which stores all the training and model information to build the bot. To give a brief overview, most important ones are,

* **NLU training file**: It contains a bunch of examples of the user input along with their mapping to a suitable intent and entities present in each of them. The more varying examples you provide, better your bot’s NLU capabilities become. Find one interactive way of creating training data [here](https://rasahq.github.io/rasa-nlu-trainer/).
* **Stories file**: Contains a bunch of stories to learn from. From each stories, creates a probability model of interactions.
* **Domain file**: Here you list all of the intents, entities, actions and similar information. You can also add sample bot reply templates and use them as actions.
Enough talking, lets start developing the bot!

#### Natural Language Understanding

Lets first train the bot to understand user language so it can classify the intent and extract entities. For this we will create sample nlu training file.

**NLU Training file (nlu\_train.md):**

Here, an intent’s name is defined after ‘##intent:’ and all sample user utterance for that intent are mentioned below. Notice for intent `*query\_days\_in\_month`* we have also mentioned entities. The format is [word](entity\_name), so the user utterance example is “How many days in January” and in it “January” is the entity of name “month”.

Now we will define the pipeline to use for training the NLU model, here we will use spacy to do so.

**config file (nlu\_config.yml)**

We are now ready to train the NLU model! Lets do so in Python.

This will train the nlu model and save it at ‘models/nlu/’. Lets try and test how is the model working.

The output looks something like this,

Here as you can see, the model was perfectly able to tag the user question to it’s intent (check ‘*name*‘ section under ‘*intent*‘). It says, that for the first question, the intent was ‘*query\_days\_in\_month*‘ and the extracted entity was ‘*January*‘ (check ‘*value’*under ‘*entities*‘). One cool thing is in the output of second question, even though we didn’t provide this in example, it was perfectly able to guess the intent and even extract the entity ‘*march*‘.

Nice, but the chatbot is only half way complete, we still need to build the dialog management.

#### Dialog Management

First, lets define the domain file which contains some sample templates we can use to reply back to user.

**Domain file (domain.yml):**

Here we have listed down the intents and entities (all present in nlu training file), along with some templates and actions. Templates contains replies that you want the bot to make, in this case I want the bot to greet, say goodbye and also answer the user asked question of number of days in the month. And right now bot will only answer these three types of month answers (bot is agnostic of leap years, stupid bot)

Now lets create a sample user-bot interaction.

**Stories file (stories.md):**

Here we are defining a sample interaction between the bot and user in form of a story. It goes like this, if user says something and its intent is ‘*greet*‘ bot will perform action ‘*utter\_greet*‘. One more example, if user’s message has ‘*query\_days\_in\_month*‘ intent and ‘February’ then bot will perform ‘*utter\_answer\_28\_days*‘ action.

Now lets train the dialog management part,

Here, you can change the training policy in which you can define your own LSTM or RNN for dialog training. One important point, ‘*max\_history*‘ is used to define how one action is dependent on previous questions. If max\_history is 1, then it just memorizes individual intent and its related actions. Due to lack of training data (huge load of stories), I am just making it memorize the rules now, you can create some sample stories and see the true potential of rasa dialog management.

Now we are done. Lets see if the bot is able to reply back to us and answers our question.

And it does!

#### Conclusion

Mapping every combination of intent-entity to its action in stories is quite inefficient. Just think of individually mapping each month to its answer. And what about the leap year? Well all of this could be handled by using custom actions, where the action calls a python function with all the info like the intent and entity. Now in python code you can perform all the necessary checks and return the message.

Also the true potential of the rasa nlu and core shines when you give it more data to train. Or even deploy the chatbot and it learns from interactions. It will make it capable of handling cases which are not yet fed to the training data. You can also change the policies by which it trains the model. Maybe all about this in next post.

Cheers.

Checkout more such articles [here](http://mohitmayank.com).

  