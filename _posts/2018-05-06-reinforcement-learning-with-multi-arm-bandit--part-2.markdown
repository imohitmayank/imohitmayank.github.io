---
layout:	post
title:	"Reinforcement Learning with Multi Arm Bandit (Part 2)"
date:	2018-05-06
---

  #### Let make the problem a little bit more….complex!

![](/img/1wYi8N9qBc8Ga3cGpSYofmQ.jpeg)#### Recap

This is in continuation of the original [post](https://itnext.io/reinforcement-learning-with-multi-arm-bandit-decf442e02d2), I highly recommend to go through it first, where we understood the intuition of multi arm bandit and tried to apply e-greedy algorithms to solve a representative problem. But the world isn’t that simple. There are some factors, introducing which, the problem changes completely and the solution has to be redefined. We will pick where we left, introduce new problem, show how our beloved algorithm fails and try to build intuition of what might help in the case.

#### Non-stationary problems

If we recall the problem in the first post, we had defined some portals with fixed reward distribution and tried to bring our estimated action value closer to the expected action value or reward distribution. Now the bulk of the definitions remains same, but we will just tweak the part of fixed reward distribution. In the original problem, we defined a reward distribution function whose values were not changing throughout the process, but what if they are? What if expected action value is not constant? In terms of the Home portal game, what if the a home portal is slowly becoming an ocean one or vice versa or just fluctuating enough to cause major confusion. In this case, will our simple e-greedy algorithm work? Well, lets try to find out.

First, on running original code to generate the optimal action selection percentage, our plot is as expected, even with increasing the steps to 10k, the epsilon value of 0.01 is out-performing the contrast setting of e = 0 or 1. And the performance is constant, with no sign of decrease in future.

![](/img/1MT9W5NZYuBZFMafLi2zQXw.png)Stationary Problem: e-greedy algorithm performance; increased the steps to 10kNow, we need a slight modification to transform the stationary problem to non-stationary. As per the definition, the reward distribution is subject to change. Lets define the term of change, say after each step, and by a normal distribution with mean 0 and deviation of 0.01. So after each step, we will compute random numbers based on the defined normal distribution and add it to the previous expected action value. Now this will be the new reward distribution. This could be easily done adding few lines to the original code, and then we can compute the latest optimal action selection percentage.

# define a function to update the expected\_action\_value  
>>> def update\_expected\_action\_value(expected\_action\_value):  
>>> expected\_action\_value += np.random.normal(0, 0.01, arms)   
>>> return(expected\_action\_value)# inside the multi\_arm\_bandit\_problem function add,   
>>> estimate\_action\_value = update\_estimate\_action\_value(estimate\_action\_value)![](/img/1UDOLBsr9RUkP5qVcmAppXA.png)Non-Stationary Problem: e-greedy algorithm performance decreasing after initial peaksWell on comparing, we could say the performance of the e-greedy algorithms started decreasing after a certain period. Note, even though e=0.01 is still showing good results, but this drastic decrease in performance is visible even by a slight random increment (0.01 deviation), what if the change factor was of higher magnitude? Well as it turn out the decrease would have been more prominent. The question to ask is, what could have been the issue here?

#### Estimation of reward distribution

Lets try to recall the estimation function of the true reward distribution, it goes something like this,

![](/img/1lMrnCA-ycRthNR83ynJZOA.png)Estimation formulation chosen for stationary problemswhere,

1. The first equation gives the formula for the estimated reward value at t which is a simple average of all the rewards we received till time step t-1
2. The second equation is just a nice way of writing the same thing. Saying the estimation for n+1 step will be average of all the rewards till step n
3. The third one, is what you get when you expand the second equation and put in the formulae of Qn which is similar to the one of Qn+1, just one step less (replace n with n-1). Here, Qn+1 is the new estimation for the n+1 steps, Qn is the old estimation i.e. estimation till step n,Rn is the rewards for nth step and 1/n is step size by which we want to update the new estimation.
To be clear, as per this formulation, if a particular action was chosen say 5 times, then each of the 5 rewards (n actions leads to n rewards) will be divide by 1/5 and then added to get the estimation till step 5. If you look closer, you will see we are giving equal weights to all the rewards, irrespective of their time of occurrence, which means we want to say, every reward is equally important to us and hence the equal weights. This holds true for the stationary problems but what about the newer problem? With rewards distribution changing, isn’t the latest rewards better estimation of the true rewards distribution. So shouldn’t we just give more weight to the newer rewards and lesser to the old one? Well this thought is definitely worth pursuing. And this would mean just changing the reward weights, which can be done by replacing the average reward estimation to exponential recency-weighted average. We can further make this process generic by providing an option of weather the newer or older rewards should be given more weight or a middle workaround of decreasing weights with time. As it turns out this could be easily done by replacing the step function of 1/n in the older formulation with a constant, say 𝛂. This updates the estimation function to,

![](/img/1GOU-Jgx6iMjdCiNzDd18cA.png)Estimation formulation chosen for non-stationary problemswhere,

1. If 𝛂 = 1; Rn i.e. the very latest reward will have maximum weight of 1 and rest will have 0. So if your excepted action value’s deviation is too drastic, we could use this setting.
2. If 𝛂 = 0; Q1 i.e. the oldest reward estimation will have maximum weight of 1 and rest will have 0. We could use this when we only want to consider initial estimation values.
3. If 0 < 𝛂 < 1; the weight decreases exponentially according to the exponent 1-𝛂. In this case the oldest reward will have smaller weight and latest rewards higher. And this is what we want to try out.
#### The non-stationary solution

Lets formalize the solution by simply updating the code to replace the step size by an constant of value, say 0.1 and keeping rest of the parameters same. This will implement the exponential decreasing weight. Later we will compute the optimal action selection percentage and reflect on it.

# update the estimation calculation  
>>> estimate\_action\_value[action] = estimate\_action\_value[action] + 0.1 * (reward - estimate\_action\_value[action])![](/img/1exj_eqNM2Zi2wXmVwkHGcw.png)Non-Stationary Problem: e-greedy algorithm performance due to constant step-sizeWell, we are back in business. We can conclude,

1. The e=0.01 setting is out-performing its rival and the performance converges to maximum after some steps. Here we are not seeing any decrease in performance, because of our modified estimation function which factor the changing nature of reward distribution.
2. The estimation function provide an insight of the state of environment, based on which we will have to design the function. As per the stationary problem we were able to get by with basic average but for complex environment of changing reward distribution, we had to apply exponentially decreasing reward average.
3. This provides an intuition of how mathematically, by just modifying one parameter of step-size, we were able to factor the complex behavior of new environment which was in fact much similar to the real world problems.
#### Conclusion

The take away from this post could be understanding the stationary and non-stationary environment. The art of designing estimation functions by questioning and considering all the properties of the environment. And how sometimes minimal but intuitive changes could lead to maximum advancements in accuracy and performance. We still have some set of problems and improvements left which could lead to better accuracy and optimization, but later on that.

Cheers.

#### Reference

[1] Reinforcement Learning — An Introduction; Richard S. Sutton and Andrew G. Barto

  