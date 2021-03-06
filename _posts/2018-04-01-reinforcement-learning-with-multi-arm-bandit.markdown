---
layout:	post
title:	"Reinforcement Learning with Multi Arm Bandit"
date:	2018-04-01
description: Lets talk about the classical reinforcement learning problem which paved the way for delayed reward learning with balance between exploration and exploitation.
tag: [reinforcement-learning, math, python]
image: /img/1wYi8N9qBc8Ga3cGpSYofmQ.jpeg
---

**Lets talk about the classical reinforcement learning problem which paved the way for delayed reward learning with balance between exploration and exploitation.**

[](/img/1wYi8N9qBc8Ga3cGpSYofmQ.jpeg)

#### What is Multi-Armed Bandit Problem?

The ‘bandit problem’ deals with learning about the best decision to make in a static or dynamic environment, without knowing the complete properties of the decisions. Its like given a set of possible actions, selecting the series of actions which increases our overall expected gains. Suppose you found an teleportation portal (sci-fi anyone), which opens up to either your home or middle of the ocean, with the *either *being determined by some probability distribution. So if you step into the portal, there is some probability say p, of coming out at your home and probability 1-p, of coming out at the middle of the ocean (with sharks in it, to make it more unappealing). I don’t know about you guys, but I would like to go to the former. If we know, say that 60% of the time the portal leads to ocean, we would just never use it and if its the home most of the time, using portal would be a little more appealing. But what if we don’t have any such knowledge, how can we to gain it?

Suppose we found n* *other portals, all with the same choices of destinations and with no prior knowledge of the destination probability distribution. The n-armed or multi arm bandit problem is used to generalize this type of problems, where we are presented with multiple choices, with no prior knowledge of their true action rewards. We will try to find a solution to the problem, talk about different algorithms and which could help us converge faster i.e. get as close to the true action reward distribution, with least number of tries.

#### Exploration vs Exploitation

Given n portals, say we tried the portal #1, and it lead to home. Great, now should we just name it as the home portal and use it for all our future journeys or we should wait and try it out a few more times? Lets say we tried it a few more times and now we can say 40% of the times it leads to home. Not happy with the results, we move on to portal #2, tried it a few times and it has 60% chance of home journey. Now again, should we stop or try out other portals too. Maybe portal #3 has higher chance of home journey, maybe not. Well this is the dilemma of exploration and exploitation. The approach that favors exploitation, does so with logic of avoiding unnecessary loss when you have gained some knowledge about the reward distribution, whereas approach of favoring exploration, does so with logic of never getting biased with the early action rewards distribution and keep trying every actions in order to get the true properties of the reward distribution.

#### The Home Portal Game

Before going further lets define some terms,

1. **Environment**: It the container of agent, actions and reward; allows agent to take actions and assign rewards based on the action, following certain set of rules.
2. **Expected Action Value: **Reward can also be termed as value of the actions. In that sense the expected action value can be defined as the expected reward for the selected action i.e. the mean reward when an action is selected. This is the true action reward distribution.
3. **Estimated Action Value**: This is nothing but the estimation of the Expected Action values which is bound to change after every learning iteration. We start with an estimated action value, and try to bring it as close as possible to the true/expected action value. One way of doing it could be just taking the average of the rewards received for an action till now:
![](/img/1NHPTMp2EvLmq2Uybhm7uVQ.png)Say we have 10 portals with the expected action value for favorable home journey given as a uniform distribution,

>>> import numpy as np  
>>> np.random.seed(123)  
>>> expected\_action\_value = np.random.uniform(0 ,1 , 10)  
>>> expected\_action\_value  
array([0.69646919, 0.28613933, 0.22685145, 0.55131477, 0.71946897,  
 0.42310646, 0.9807642 , 0.68482974, 0.4809319 , 0.39211752])![](/img/1kZ9WgQJ3AIoXltxFZkos2g.png)Expected action value of the home portal gameWith knowledge of expected action value, we could say always choose portal #7; as it has the highest probability of reaching home. But as it is with the real world problems, most of the times, we are completely unfamiliar with the rewards of the actions. In that case we make an estimate of the reward distribution and update it as we learn. Another interesting topic of discussion could be selection of initial estimate values, lets keep it simple and define it as zeros.

>>> estimated\_action\_value = np.zeros(10)  
>>> estimated\_action\_value  
array([0., 0., 0., 0., 0., 0., 0., 0., 0., 0.])Lets define the reward function, going by our requirement we want to land at home, so lets set reward of value 1for landing at home and -1for landing in the ocean.

>>> def reward\_function(action\_taken, expected\_action\_value):  
>>> if (np.random.uniform(0, 1) <= expected\_action\_value[action\_taken]):  
>>> return(1)  
>>> else:  
>>> return(-1)#### The epsilon-greedy algorithms

The greedy algorithm in reinforcement learning always selects the action with highest estimated action value. Its a complete exploitation algorithm, which doesn't care for exploration. Well it can be a smart approach if we have successfully estimated the action value to the expected action value, like if we know the true distribution, just select the best actions. But what if we are unsure about the estimation? The epsilon comes to the rescue.

The epsilon in the greedy algorithm adds exploration to the mix. So counter to previous logic of always selecting the best action, as per the estimated action value, now few times (with epsilon probability) select a random action for the sake of exploration and the remaining times behave as the original greedy algorithm and select the best known action.

![](/img/1K11RJGEu3L92lOt6ewGvVQ.png)So a 0-epsilon greedy algorithm with always select the best known action and 1-epsilon greedy algorithm will always select the actions at random. Now lets define the bandit problem with estimate action value modification and epsilon-greedy action selection algorithm.

>>> def multi\_arm\_bandit\_problem(arms = 10, steps = 1000, e = 0.1, expected\_action\_value = []):  
>>> overall\_reward, optimal\_action = [], []  
>>> estimate\_action\_value = np.zeros(arms)  
>>> count = np.zeros(arms)  
>>> for s in range(0, steps):  
>>> e\_estimator = np.random.uniform(0, 1)  
>>> action = np.argmax(estimate\_action\_value) if e\_estimator > e else np.random.choice(np.arange(10))  
>>> reward = reward\_function(action, expected\_action\_value)  
>>> estimate\_action\_value[action] = estimate\_action\_value[action] + (1/(count[action]+1)) * (reward - estimate\_action\_value[action])  
>>> overall\_reward.append(reward)  
>>> optimal\_action.append(action == np.argmax(expected\_action\_value))  
>>> count[action] += 1  
>>> return(overall\_reward, optimal\_action)On running the game for multiple epsilon values over 2000 runs and plotting the result of the average, we get,

>>> def run\_game(runs = 2000, steps = 1000, arms = 10, e = 0.1):  
>>> rewards = np.zeros((runs, steps))  
>>> optimal\_actions = np.zeros((runs, steps))  
>>> expected\_action\_value = np.random.uniform(0, 1 , arms)  
>>> for run in range(0, runs):  
>>> rewards[run][:], optimal\_actions[run][:] = multi\_arm\_bandit\_problem(arms = arms, steps = steps, e = e, expected\_action\_value = expected\_action\_value)  
>>> rewards\_avg = np.average(rewards, axis = 0)  
>>> optimal\_action\_perc = np.average(optimal\_actions, axis = 0)  
>>> return(rewards\_avg, optimal\_action\_perc)![](/img/1aZk7d7HvKdAt_f6K4QQOlQ.png)e-greedy reward performance over 2000 runs, each with 1000 steps![](/img/1z2aqF-QVVmnsGW8-6Z61rQ.png)e-greedy optimal action selection performance over 2000 runs, each with 1000 stepsWe can observe,

* Complete exploration (e=1) algorithm has its shortcoming as it never make use of its leanings, it keep picking actions at random. Results are not good as our multi armed bandit problem has a clear inclination towards portal #7. What if all portals had the same expected action value?
* Complete exploitation (e=0) algorithm has its shortcoming as it get locked on the initial best reward and never explore for the sake for better reward discovery. What if it locks on to the optimal action?
* e(0.01)-greedy algorithm performs better the compete contrast approaches, because of its minute inclination towards exploration and rest of the times going for the best known result. It improves slowly but eventually (too long?) would outperform other approaches.
* e(0.1)-greedy algorithms stands out among its competitor because of it nature of making use of its learning and from time to time taking exploration initiatives with well distributed probabilities. It explores more and usually find the optimal action earlier.
#### Conclusion

The main take away from this post could be understanding the importance of exploration/exploitation and why a hybrid (0<e<1) implementation outperforms contrast (e=0,1) implementations for the given problem. That said, there are still a number of other approaches which we could have tried like selecting optimistic initial estimate action value, defining an upper confident bound or a gradient based bandit implementation. We also haven’t discussed about the non-stationary problems which increase the complexity of the problem. Well more on this in another post.

Complete code @ [Mohit’s Github](https://gist.github.com/imohitmayank/3b775bedb27a3ed1fbb6a2dbce12532b)

Cheers.

#### Reference

[1] Reinforcement Learning — An Introduction; Richard S. Sutton and Andrew G. Barto

  