---
layout:	"post"
categories:	"blog"
title:	"Intro to Bitcoin — the economics and technology behind it"
date:	2018-03-23
thumbnail:	/img/1*V8KMHNd72fS_jiYbb3H-WQ.png
author:	
---

* * *

#### Introduction

Bitcoin has been in news for some time now, be it for the mysterious founder
Satoshi Nakamoto (nobody know who he/she is) or its ripple in the socio-
economical world due to the ever fluctuating price or its underlining open
source peer to peer blockchain technology. From major institutions shunning
it, to countries trying to replicate their election with the tech; from being
a prominent currency in the dark markets, to tech giants like Microsoft and
PayPal supporting it, it has been quite a ride. It has grasped the interest of
economist and technologist alike and has the potential to disrupt the very
fabric of banking system. Here let us try to understand the intuition behind
the bitcoin, the technology which powers it and how all it works together.

![](/img/1*V8KMHNd72fS_jiYbb3H-WQ.png)

Figure 1: Bitcoin price over the years in Indian Rupee

#### Intuition -- a brief history of money

Economist define money as a medium of exchange, a unit of some value. This
basic idea has been the cornerstone of the monetary systems. It took humans
thousands of year to get used to the idea of virtual money and let go of
defining money as some piece of paper or some gold coin. In this regards, the
Yap tribe out in the Pacific Ocean were leagues ahead of us. Deprived of
precious minerals like silver and gold, they carved huge stone disks using
limestone, which was their idea of precious metal. Being heavy, they were
immobile and this very concrete form of money became something very abstract.
They would usually deal in coin without really moving the coins; it is just
that everybody in the village knew that the coin has a new owner. As per the
stories, once a stone fell into the ocean, but it did not change the value of
the stone, as everybody decided that money was still good -- even though it is
in the bottom of the ocean. This has a striking similarity with the current
digital system. Online transactions are nothing but modification of a ledger
(database) which contains all your transaction history. In a way, our
definition of money has been the same even though what we identify as money
keeps changing.

In this whole conversation, we missed something very novice but at the same
time very important in the monetary system. Who and how will we maintain the
ledger, the so-called history of all our transactions. In addition, who should
have the power to create new money? During the medieval period, many private
institutions were set up, with their independent ledgers and currency. Which
paved the way for the modern government controlled central banks, which has
the complete autonomy on the creation of money and let private institution
work under it following strict guidelines. This lead to the centralization of
the complete banking system. Be it a private bank or the government, people
have a tendency of doubting a third party when it comes down to their money.
We are subject to their wimps (political cycles impact banking rates), their
policies can change overnight (demonetization), and many institution have
shown their incompetency in handling global crisis (financial crisis of 2008).
This called for a decentralized banking environment with fixed rules with
independent & unbiased policing, which motivated the research for
decentralized digital currency.

####  **Innovation  -- the block chain technology and how it helps realize the
**dream

If designing an independent banking system was not hard enough, the major
roadblock for many cryptocurrency researchers came during the idealization of
a system, which performs all the important task of a centralized bank while
keeping itself decentralized. Bank provides trust in transactions, keeps
records and contracts with well-defined reparations in case of default. A
digital currency should incorporate protocols to factor the said requirements.
One of the major issue with decentralized system is the infamous double
spending problem, when you make multiple credits on same debit. Bring in the
risk associated with multiple ledger holders and you have complete chaos.

The idea of a digital currency has been floating for a while now, even before
the bitcoins. However, due to the discussed issues, it was yet to be realized
and tested on large scale. Blockchain changed the game completely. With
publishing of a white paper titled "Bitcoin", Nakamota underlined the
foundation of a decentralized cryptocurrency, which is, in one word,
revolutionary. It proposes a formation of peer-to-peer distributed network
where everyone in the system is the ledger holder and cryptographic signatures
mark the transactions. Bunches of latest transactions requests are grouped
together in blocks and are broadcasted to every member of the system, where
they perform computational extensive operations to mark their proof of work.
On completion, they broadcast the new digitally hashed block to respective
members who add it to their ever-growing chain of blocks. In sense, ledgers in
bitcoin is nothing but a long chain of blocks, each containing a bunch of
transaction records, from its time of inception to the latest epoch.

The technology behind the blockchain can be understood by undertaking the
problems it was designed to solve, one by one. Lets see the problem of,

  1.  **Counterfeit transactions**

In the centralized system, difficulty in counterfeiting previous transaction
completely depends on the security measures of the 3rd trusted party. Once a
fraudulent entity acquires access to the ledger, he can simply update the
ledger and completely disrupt the system. Just imagine a person adding a few
zeroes to its balance or adding a fake transaction showing you transferred
them a huge amount. With the recent advancement in the technology and
computational power, and going by the recent increasing trend in illegal
attacks overall the institutions, one thing is clear, these activities are
quite possible.

Blockchain solves the problem of counterfeit transaction by maintaining open
distributed peer-to-peer ledger. Being open, ledger is accessible to users,
referred to as miners, in the system whose role is to maintain authentic
copies of the complete ledger. Being peer-to-peer, miners keep polling among
themselves to verify the authenticity of the ledgers. The ledger, in case of
bitcoin, consists of chain of blocks, with each block containing transaction
information. Briefly, anatomy of a single block contains some data, here
transaction records, hash of the previous block and hash of the current block
(refer Figure 2). As the first block doesn't have any predecessor, its
previous hash is 0 and it's called the genesis block. This link of previous
block with the next block using the hash value forms a chain like structure,
which comprises the blockchain. So say someone modified a previous entry in
the blockchain to increase the amount transferred to his account (refer figure
3). Here he made the modification in block #1, increasing the amount from 10rs
to 100rs. However, this modification changed the hash of block #1 and as next
block in line i.e. block #2 had the original block hash, this just disturbed
the authenticity of the blockchain. This discrepancy will be noticed on next
polling among the miners and will be rejected by the overall system.

![](/img/1*ActCiM-Ly4NPllgw_dtGVw.png)

 _Figure 2: Original blockchain_

![](/img/1*ix3q1Ls8jJsk-0AeAPoAIw.png)

 _Figure 3: Fradulent blockchain, modified block  1_

2. **Proof of work**

Let's take the example in the previous section. Attacker changed the
transaction history in block#1 and before anyone can notice, he hashed the
block#1 and block#2 in the proper order. This may disrupt the network, as now
two different ledger shown in figure 2 & 3 are correctly mapped, valid and
there is no way to authenticate which one is correct. This could encourage
each miner to modify their copy of ledger as per their need, which will be
disastrous. To handle this, blockchain implements proof of work concept, as
per which, some effort has to be invested for generation of blocks. If that
effort is fair, equal for all (mostly), stochastic and difficult enough, it
might just make the life of attacker difficult. Lets try to understand it.

Assume there is some work (high mathematical computations in this case) which
is difficult to do but quite easy to validate, and we request miners to
perform it before any valid blocks are generated. This means, any attacker who
changes a block, will have to keep doing the same amount of work for each
block until he reaches the last block in the blockchain. This is because our
work is easily verifiable and any loose end, (here invalid block) will be
discarded by the network. This make one thing clear, its will be easier to
counterfeit newer blocks then older one.

The proof of work in blockchain involves scanning for a value, nonce, which
when added to the block, make the hash of the block start with certain number
of zeros. Hash of any block, or any value for that matter, is a unique
representation of that value. You might have seen large files provided with
hash values to check their authenticity after download. Here, each block's
unique representation is calculated. However, hash calculation is quite fast
and easy, to make this as a proper proof of work, a little twist was added to
it. Now we want a hash of our block such that it starts with certain number of
zeros. This makes the problem exponentially difficult, as complexity of
computing such nonce is 2^n with n being the number of zeros at the start.
There is only one-way to solve it, we increment nonce, which is appended to
the block, until desired hash is achieved. The following python script will
clarify the hashing,

    
    
    >>> import hashlib
    
    
    >>> hashlib.sha256("This is a block. I added a nonce:1".encode('utf-8')).hexdigest()  
    'a8633ea60ffa0ad14a3589f35eacefda7c18e45eb600d504404e6d85798715b6'
    
    
    >>> hashlib.sha256("This is a block. I added a nonce:2".encode('utf-8')).hexdigest()  
    '5050787fe1c5350b9f40fe9483f0aed0818f620bd059219272aef4a03bad0107'
    
    
    >>> hashlib.sha256("This is a block. I added a nonce:3".encode('utf-8')).hexdigest()  
    'ff1b7e973471c3f196c3980252faf22d0a03b363153e80f63e958a8cce8ac502'
    
    
    >>> hashlib.sha256("This is a block. I added a nonce:35600".encode('utf-8')).hexdigest()  
    '00002c0b233a9c4aca08ee71baaaa036c16f7780853c3c54418721c323e85e23'

Now to calculate the nonce, which gives us four zeros at the start, we keep
doing this computation, as hashing is a stochastic process, because even a
slight change in input may result in complete change in the hash output. For
this particular string, we found the desired hash at, nonce 35600. The number
of starting zeros is re-calculated after every fixed interval so as to keep
the average time of each block generation around 10 mins. This is encoded to
keep adapting with increasing computational power over the years.

3. **Peer-to-peer**

Lets try to understand how the peer to peer network in case of blockchain
works. After every new transaction, it is broadcasted in the network to every
miner. Each miners collects them into blocks and tries to find the proof of
work for its block. On successfully computing the nonce and generating the
special hash, the successful miner broadcasts the block in the network. Now
each receiving miner validates the block, in which all the transactions inside
the block is checked for fraudulent or impossible transactions by following
rules such as, a user with non-positive balance cannot make a transaction. If
all the transactions are valid, and the special hash of the block also stands
out as specified in the latest difficulty rule, the new new block is accepted
in the local ledger of each miner. In case of complete honest network, every
miner will have the correct and same ledger. But this may not be the case
every time.

Now miners always consider the longest chain to be correct as more proof of
work or effort has been invested in that chain. In case an attacker broadcast
a fraudulent block simultaneously as a honest miner, two parallel branch from
original chain may originate in the receiving miners. And as the time goes by,
attacker and honest miner compete to generate next block. Lets say this
process continues for some time and now each new branch has some more extra
blocks, still it will be difficult for the attacker to keep up with the whole
network of honest miners in generating valid blocks by performing proof of
work. This ideas requires majority of the network to be honest, to work. As
soon as a new block is generated by the honest miners, faster than the
attacker miners, the receiving miners switch to the honest branch. This is why
it is always suggested to wait for some confirmation before actually believing
the transaction has occurred. A confirmation is just next block added to the
one which contain your transactions. The more confirmation you receive the
lesser the chance of fraudulent activity.

4\. **Incentive**

Now comes the main question, why would anyone in their right mind, perform
these mathematical computations without some reparations? Well what if you
give them money for their effort. And in this network, bitcoin is money. So
for each block, miner compete to find the nonce, and one to find it first is
provided with some bitcoins because of their effort. This adds an incentive
for miners to support the network and this way the creation of the bitcoin is
circulated as there is no central authority like in centralized banking system
which generate money out of thin air. The rate of bitcoin generation per block
started with 50 per block in 2009 and is halved every four years. So lets do a
little math,

    
    
    1 block per 10 mins  
    6 block per hour (60 mins / 10 mins)  
    144 blocks per day (6 * 24)  
    52560 blocks per year (144 * 365)  
    210240 blocks per cycle of 4 years (52560  * 4)

And the number of bitcoin generated with a new block is decreasing as,

    
    
    g = 50 + 25 + 12.5 + .....   
    g = 100 (geometric series)

So the maximum number of bitcoin in existence can be approximated as,

    
    
    # max bitcoin = 100 * 210240 ~ 21 million

Additional incentive comes in the form of transaction fee. Every transaction
spends zero to more bitcoin to zero to more recipients. The difference in
amount being spent and amount being received is transaction fee. In simple
words, if the output value of a transaction of a transaction is less than its
input value, the difference is transaction fee that is added to the incentive
value of the block containing the transaction. And once we have reached the 21
million bitcoin count, then transaction fee will solely count for the
incentive, creating a complete incentive free network.

#### Conclusion

We tried to get a brief idea of bitcoin, by starting with some intuition about
the money and then dwell into the technology behind blockchain. I have tried
to keep the post simple, there is still a large portion of bitcoin
technologies to cover like Merkel Tree, payment verification, transaction
briefing, privacy and much more. Also there is more I can say for the
economics section, but maybe all that in Part 2. Well, it all depends on the
response to this post.

Cheers.

* * *

#### Reference

[1] [Bitcoin: A Peer-to-Peer Electronic Cash
System](https://bitcoin.org/bitcoin.pdf)

[2] Blockchain [demo](https://blockchaindemo.io/)

[3] [Bitcoin Wiki](https://en.bitcoin.it/wiki/Main_Page)

