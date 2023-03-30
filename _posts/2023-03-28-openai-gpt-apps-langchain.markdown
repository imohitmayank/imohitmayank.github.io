---
layout:	post
title:	"Creating GPT-driven Applications using LangChain"
date:	2023-03-28
image: /img/langchain_blog_cover.jpeg
tag: [gpt-4, chatgpt, langchain, nlp]
description: Explore the art of creating super-intelligent GPT-4 powered applications using LangChain.
---

{% include elements/figure.html image=" /img/langchain_blog_cover.jpeg" caption="Generated using Dall-E 2 (By Author)" %}

## Introduction

Large Language Models (LLMs) like OpenAI ChatGPT are called foundational models because even though they are trained for a relatively small set of tasks, they work exceptionally well for multiple unseen downstream tasks. While there is still some debate on how they are soo good, at a high level it is quite easy to under what they do — they just predict the next word *(read tokens)*. And all the cool tools you see built using these models, are nothing but smart application of this feature.

All said and done, they are also quite infamous for a lot of things — sometimes the generations don’t make sense, the models hallucinate *(generating the same things over and over again)*, generations are not factually correct, they can’t do maths well, and more. While one research paradigm believes training bigger models with more data can fix some of these problems, another approach is to improve the existing model by connecting them with external apps. The idea is quite simple, use LLMs for what they are good at and for the rest use external experts (read Apps or Scripts). This blog will shed some light on the second paradigm and how you can connect any LLM with your apps!

## Power of Prompt Engineering

The hero of the second paradigm discussed above is “prompt”, so let’s talk about prompt engineering. Essentially, prompt engineering involves crafting effective prompts or input sequences that help guide the model's generation towards desired outputs. This can involve using various techniques such as conditioning the model on specific input formats or injecting additional information into the prompt to improve the model's performance on specific tasks. Effective prompt engineering can be key to achieving high accuracy and performance on a wide range of natural language processing (NLP) task. Let’s look into some examples, 

- To begin with, if you want OpenAI’s `text-davinci-003` model to write a poem, your prompt might look something like `Write a poem on {topic}`, where you can replace `{topic}` variable with the desired topic. Btw this is called zero-shot prompting as only the intention was mentioned and no examples.
- A little complex example where you want the model to write a SQL query for your DB table might look like this, `Write a SQL query for a question for the given table {table_name} \n {table_schema}. Begin! Question: {Question}\nSQL Query:` . Note, this contains additional details like `table_schema` and `table_name` as GPT has no idea what your DB looks like. Also, you might want to add a few examples here to improve the accuracy *(this will make it a few shot prompt)*

The crux here is that prompts play an important role in the performance of LLM on your downstream task. Also, do notice one important point from the second example, you just connected an LLM with your DB *(albeit in an implicit manner where it generates the query and your code runs it)*. But anyways, it is still haunted by the problems we discussed in the last section. So the question is, can we make it better? Let’s move on to the next section. 😉

## ReAct framework

Quoting the ReAct paper, [1]

> A unique feature of human intelligence is the ability to seamlessly combine task-oriented actions with verbal reasoning. Consider the example of cooking up a dish in the kitchen. Between any two specific actions, we may reason in language in order to track progress (“now that everything is cut, I should heat up the pot of water”), to handle exceptions or adjust the plan according to the situation (“I don’t have salt, so let me use soy sauce and pepper instead”), and to realize when external information is needed (“how do I prepare dough? Let me search on the Internet”).
> 

The important point of the above quote *(and in fact the paper)* is the intention to combine two powerful abilities of LLMs — reasoning *(e.g. chain-of-thought prompting)* and acting *(e.g. action plan generation)*. While the former helps with improving the accuracy of an individual task, the latter provides the LLM power to perform multiple tasks. The plan is quite simple — ask LLM a question *(input)* and let it “plan” what to do next *(action)* by reasoning on the input *(thoughts)*. It can even propose values to the action *(action input)*. Once we perform the action and get an output *(observation)* the LLM can again reason *(thought)* to propose the next “plan” *(action)*. In a way, we keep the LLM busy in this loop, until it terminates and we get the result we wanted. To summarize we iterate over “input —> **thoughts —> action —> action input —> observation** —> thoughts”. 

Okay, enough theory, let’s see this in action and for this we will use LangChain [2]. Do note, this is a complex application of prompt engineering, so before we even start we will take a quick detour to understand the basic functionalities of LangChain. 

## LangChain 101

LangChain [2] is the newest kid in the NLP and AI town. If you want to work on Generative AI, there is a high chance this package does what you want to do. Let’s start with understanding the building blocks *(modules)* of the package, 

### **Prompts**

LangChain provides PromptTemplate to create and format prompts on the go. Taking the example shared above, we can create the template

```python
# load thePromptTemplate
from langchain import PromptTemplate

# create a template that needs to be filled on the go
template = """Write a SQL query for a question for the given table: 
{table_name} \n {table_schema}.\nBegin!\nQuestion: {question}\nSQL Query:
"""

# create the prompt
prompt = PromptTemplate(
    input_variables=["table_name", "table_schema", "question"],
    template=template,
)

# format the prompt (done on the go)
print(prompt.format(table_name="customers", 
    table_schema="CREATE customers ...", 
    question="How many customers are there?"))
# output below
>> Write a SQL query for a question for the given table: customers 
>> CREATE customers .... 
>> Begin! 
>> Question: How many customers are there?
>> SQL Query:

```

### **LLM**

Next comes the brain of the system, the LLM. LangChain supports multiple LLMs, let’s see how to use OpenAI’s GPT for now. 

```python
# import
from langchain.llms import OpenAI

# load OpenAI LLM model
llm = OpenAI(model_name="text-ada-001")

# Let LLM generate for one input
llm("Tell me a joke")
# output
>> '\n\nWhy did the chicken cross the road?\n\nTo get to the other side.'

# Let LLM generate for multiple inputs
llm_results = llm.generate(["Tell me a joke", "Write me a song"])
print(llm_result.generations)
# output
>> ['generation 1....', 'generation 2....']
```

We can even load Chat models like ChatGPT, below is an example. 

```python
# import 
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage

# load chat model (very similar to llm)
chat = ChatOpenAI(temperature=0.9, model_name="gpt-3.5-turbo")

# running ChatGPT model
chat([HumanMessage(content="Translate this sentence from English to French. I love programming.")])
# output
>> AIMessage(content="J'aime programmer.", additional_kwargs={})
```

### **Chains**

We can combine the Prompts and LLM together to create a simple app using Chains. Below is an example, 

```python
# import
from langchain import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain

# create a template that needs to be filled on the go
template = """Tell me a joke on {topic}"""

# create the prompt
prompt = PromptTemplate(
    input_variables=["topic"],
    template=template,
)

# load OpenAI LLM model
llm = OpenAI(model_name="text-curie-001")

# create a chain
joke_chain = LLMChain(llm=llm, prompt=prompt)

# Run the chain only specifying the input variable.
print(joke_chain.run(topic="football"))
# output
>> Why did the football go out of style?
>> Because it was replaced by soccer!
```

What’s more, you can even combine the several chains together. One such way to do this is using `SimpleSequentialChain`. Below is an example,

```python
# import
from langchain.chains import SimpleSequentialChain

# create a new chain (chain two)
second_prompt = PromptTemplate(
    input_variables=["joke"],
    template="Translate to french: {joke}",
)
# create translate chain
translate_chain = LLMChain(llm=llm, prompt=second_prompt)

# combine the joke chain with the translate chain
overall_chain = SimpleSequentialChain(chains=
    [joke_chain, translate_chain], verbose=True)

# Run the chain specifying only the input variable for the first chain.
joke = overall_chain.run("football")
# output of first chain
>> Q: What did the football coach say to the broken vending machine?
>> A: Give me my quarterback!
# output of second chain
>> Q : Que dit l'entraîneur de football à la machine distributrice en panne ?
>> R : Donnez-moi mon quarterback !
```

## LangChain Agents for External Apps

With all that refresher out of the way, let’s get back to the task in hand i.e. to create an intelligent application by connecting LLM with multiple external tools. Now while LangChain chains are impressive in themselves, they are not enough. This is because some applications don’t have a pre-determined sequence of chains to run. User’s input might determine which chain to run. For such cases we can use Agents.

Let’s understand this with an example where want a Chat Assistant that can search the web and do maths. For this we will use LangChain Agents. *(Example from LangChain doc)*

```python
# import
from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.llms import OpenAI

# load llm
llm = OpenAI(temperature=0)

# load external tool
tools = load_tools(["serpapi", "llm-math"], llm=llm)

# init agent
agent = initialize_agent(tools, llm, 
    agent="zero-shot-react-description", verbose=True)

# ask a question
agent.run("Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?")

# output below
> Entering new AgentExecutor chain...
 I need to find out who Leo DiCaprio's girlfriend is and then calculate her age raised to the 0.43 power.
Action: Search
Action Input: "Leo DiCaprio girlfriend"
Observation: Camila Morrone
Thought: I need to find out Camila Morrone's age
Action: Search
Action Input: "Camila Morrone age"
Observation: 25 years
Thought: I need to calculate 25 raised to the 0.43 power
Action: Calculator
Action Input: 25^0.43
Observation: Answer: 3.991298452658078

Thought: I now know the final answer
Final Answer: Camila Morrone is Leo DiCaprio's girlfriend and her current age raised to the 0.43 power is 3.991298452658078.

> Finished chain.
```

Wow, it worked, isn’t it awesome!? With just a couple of lines, we were able to fix two major problems of any LLM model - factual incorrectness and maths! Let’s understand the code, 

- We use `load_tools` to specify which external tools we want the Agent to use. Internally, LangChain adds the descriptions and examples *(if available)* in the prompt so that LLM can suggest using it if needed. In our case, below is the prompt the agent creates. Notice it contains the descriptions of Search and Calculator tools. It also contains two variables `{input}` and `{agent_scratchpad}` that are used to put the input question and LLM’s output respectively.
    
    ```python
    Answer the following questions as best you can. You have access to the following tools:
    
    Search: A search engine. Useful for when you need to answer questions about current events. Input should be a search query.
    Calculator: Useful for when you need to answer questions about math.
    
    Use the following format:
    
    Question: the input question you must answer
    Thought: you should always think about what to do
    Action: the action to take, should be one of [Search, Calculator]
    Action Input: the input to the action
    Observation: the result of the action
    ... (this Thought/Action/Action Input/Observation can repeat N times)
    Thought: I now know the final answer
    Final Answer: the final answer to the original input question
    
    Begin!
    
    Question: {input}
    Thought:{agent_scratchpad}
    ```
    
- As the name suggests, `initialize_agent` function is used to create an instance of the agent and it takes `llm` and `tool` as input. Apart from this we also specify the agent type. A complete list of supported agent type is [shared here](https://python.langchain.com/en/latest/modules/agents/agents/agent_types.html), but in our we use `zero-shot-react-description` which is based on the ReAct framework we discussed above and only uses the tool’s description and no example. Note, it is also possible to modify the prompt to add examples if required.
- [`agent.run`](http://agent.run) is called to execute the agent and this is where the magic happens! Let’s go through the background process in detail. First of all, agent takes the prompt, formats it to add the question given in `agent.run` and runs the LLMs. The first run looks something like this,
    
    ```python
    ... (initial prompt omitted)
    
    Question: Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?
    Thought:
    ```
    
    Now, the LLM model’s generation will try to complete it based on the prompt. It might look as shown below, but we only care about the part till the first “Action Input” *(the part within **)*. The rest could be ignored.  
    
    ```python
    ... (omitted)
    
    Question: Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?
    Thought:**I need to find out who Leo DiCaprio's girlfriend is and then calculate her age raised to the 0.43 power.
    Action: Search
    Action Input: "Leo DiCaprio girlfriend"**
    Observation: Gigi Hadid
    Thought: I need to find out Gigi Hadid's age
    Action: Search
    Action Input: "Gigi Hadid age"
    ```
    
    Next, we use the tool suggested by LLM and get the result. Here it is asking us to search “Leo DiCaprio girlfriend” which is automatically done by LangChain using `serpapi`.  Notice, while the model might give the wrong result, google search is capable of giving accurate results. Once we have the result, it is formatted into the ReAct format *(adding Observation prefix)* and provided again to the LLM. 
    
    ```python
    ... (omitted)
    
    Question: Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?
    Thought: I need to find out who Leo DiCaprio's girlfriend is and then calculate her age raised to the 0.43 power.
    Action: Search
    Action Input: "Leo DiCaprio girlfriend"
    **Observation: Camila Morrone**
    
    ```
    

    This is the next output from the LLM. We again truncate generations after “Action Input” and perform the operation suggested by LLM. This time it wants us to search for "Camila Morrone’s age"

    ```python
    ... (omitted)

    Question: Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?
    Thought: I need to find out who Leo DiCaprio's girlfriend is and then calculate her age raised to the 0.43 power.
    Action: Search
    Action Input: "Leo DiCaprio girlfriend"
    Observation: Camila Morrone
    **Thought: I need to find out Camila Morrone's age
    Action: Search
    Action Input: "Camila Morrone age"**
    ```

    The result from the google search is appended to the prompt and again passed to LLM for the next step. 

    ```python
    ... (omitted)

    Question: Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?
    Thought: I need to find out who Leo DiCaprio's girlfriend is and then calculate her age raised to the 0.43 power.
    Action: Search
    Action Input: "Leo DiCaprio girlfriend"
    Observation: Camila Morrone
    Thought: I need to find out Camila Morrone's age
    Action: Search
    Action Input: "Camila Morrone age"
    **Observation: 25 years
    Thought: I need to calculate 25 raised to the 0.43 power
    Action: Calculator
    Action Input: 25^0.43**
    ```

    This time LLM suggests using Calculator tool. The result is computed, formatted and shared again for the next iteration of LLM. The final result looks as shown below, 

    ```python
    ... (omitted)

    Question: Who is Leo DiCaprio's girlfriend? What is her current age raised to the 0.43 power?
    Thought: I need to find out who Leo DiCaprio's girlfriend is and then calculate her age raised to the 0.43 power.
    Action: Search
    Action Input: "Leo DiCaprio girlfriend"
    Observation: Camila Morrone
    Thought: I need to find out Camila Morrone's age
    Action: Search
    Action Input: "Camila Morrone age"
    Observation: 25 years
    Thought: I need to calculate 25 raised to the 0.43 power
    Action: Calculator
    Action Input: 25^0.43
    **Observation: Answer: 3.991298452658078

    Thought: I now know the final answer
    Final Answer: Camila Morrone is Leo DiCaprio's girlfriend and her current age raised to the 0.43 power is 3.991298452658078.**

    ```

    LLM is able to understand that the question has been answered, so we can stop the iterations. While the answers were spread across the iterations, LLM is able to consolidate them and present a single sentence. 

There you go, we just created a full-fledged Bing competitor 😜 

I hope this article shed some light on the internal workings of LangChain, making it possible to create powerful GPT-4 or ChatGPT-powered AI applications! Note, this is just the tip of the iceberg. LangChain contains multiple builtin Chains and Agents that can be used out of the box for several common applications. Apart from this, it is also possible to create custom agents, prompts and even tools. Maybe more on this later :wink:

Cheers. :wave:

## References

[1] [REACT: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)

[2] LangChain - [Github](https://github.com/hwchase17/langchain); [Doc](https://python.langchain.com/en/latest/index.html)

[3] [Blog: Implement ReAct (Reason+Act) with OpenAI GPT and LangChain](https://tsmatz.wordpress.com/2023/03/07/react-with-openai-gpt-and-langchain/)