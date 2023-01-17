---
layout:	post
title:	"Getting started with AI Art"
date:	2023-01-17
image: /img/getting-started-wtih-ai-post/poster.jpeg
tag: [aiart, ai, nlp, computer-vision]
description: Learn the Fundamentals of Generating Art with Text Prompts. Discover the secrets behind creating stunning artwork with the help of AI.
---

{% include elements/figure.html image="/img/getting-started-wtih-ai-post/poster.jpeg" caption="Generated using Stable Diffusion 2.1 (By Author)" %}

## Introduction

Artificial Intelligence (AI) is a form of technology that enables machines to perform tasks that would normally require human intelligence and skills. It has been used for many years to forecast weather, find the most efficient route home, predict trends in the stock market, and much more. But recently a new type of AI is trending - one that can generate art using text prompts. The process is quite simple, the user needs to provide a description of the desired artwork and the AI can generate an image that matches the description.

While the process is simple, the execution is another story due to two reasons, firstly we need a good AI Art model (and it comes with its own complexities) and secondly, we need to provide clear prompts to the model. In this article, we will first discuss these two fundamentals that any AI Art aspirants should know about, i.e. model engineering (history of AI Art models and how to set them up) and prompt engineering (how to communicate with AI Art models). If this sounds confusing, complicated, and too technical, then don't worry as I will also discuss CF Spark which takes care of all complexities so that anyone can create their own artwork easily.

## Model Engineering 🤖

Let's start with a brief history of AI Art models. AI has been used to generate images since 2014 with GANs (a lifetime ago from an AI perspective). But they were full of problems - the models were very specific (one model for one subject), the outputs were not good (unclear and funny looking) and there was no way to control the output (text prompts were missing). It was not until 2021 when OpenAI released Dall-E, that it seemed possible to have a generic model that could generate quality images with text input. While Dall-E was behind a paywall, OpenAI did open-sourced CLIP, a neural network model that was trained to capture the relationship between image and text. This led to a new trend of combining GAN (which could generate images) with CLIP (which could guide GAN toward the input prompt). And recently GANs have been replaced with Diffusion models, as they showed substantial improvements in generating higher-quality images. Most of the famous names in the industry like Dall-E, CF Spark, Midjourney, and RunwayAI, internally use diffusion-based AI models.
Now we know that diffusion models are state-of-the-art, but how can we really use them? Let me start by saying that there are open-source options, but they are not user-friendly as they require programming knowledge and the models are quite big hence they require powerful GPUs to generate images. Nevertheless, Stable Diffusion on Huggingface Spaces [1] is an option that works like charm. One example for the prompt "painting of a man working on computer" is shown below,

{% include elements/figure.html image="/img/getting-started-wtih-ai-post/img1.png" caption="Showing two generations for prompt 'painting of a man working on computer' on Stable Diffusion 2.1 Demo hosted on Hugging Face Spaces. [1] (Image by Author)" %}

While the generations are quite good, it is not intended for professional use as you have to share the machine with everyone. This means you would often find yourself waiting in a long virtual queue for single-generation requests. Another option is to download the latest Stable Diffusion [2] model and run it locally on your system. There are several desktop applications like Automatic1111 [3] that provide a UI on top of AI art models, but I will not recommend it if you are not a programmer or don't have a powerful GPU machine (which is not the case for many of us).

## Prompt Engineering ✍️

Prompt Engineering is the art of conveying what you want from AI in a way that the machine could understand. This is complicated mainly due to the data on which these models are trained. Deep Learning based models require a very specific type of data and a lot of data to learn any given task. For image generation models, researchers scrap the internet to find images with corresponding text. These texts are usually not well-formatted and syntactically correct, because of this the model learns to associate the presence of certain phrases with certain artistic styles. For example, just adding "trending on artstation" to your prompt could lead to high-quality generations. This makes it difficult for aspiring AI artists to convey exactly what they want, so much so that there is a Prompt Book [4] to help create prompts for Dall-E. To add to the complexity, the different model might have their own unique phrase-to-style association based on which dataset they were trained on and how they were trained. One thing to add, my prompt example was quite innocent because I was open to artistic liberties AI could do, but that might not be the same for a professional artist who knows wants they want in their artwork. Because of these reasons, it becomes imperative that we not only have the best model but also develop an understanding of how to efficiently communicate with it. We can either spend time and effort to develop such an intuition or we can use a tool like CF Spark. On to it 👉

## CF Spark to the rescue! 🫡

[CF Spark](https://www.creativefabrica.com/spark/ai-image-generator/) [5] makes it super easy to generate AI artwork and that is because it tackles both of our problems quite efficiently. Firstly, they host, retrain and maintain the state-of-the-art model on their server so that we can run it from our browsers. And if you want to skip the queues, just use speed credits. This solves our model engineering problems as they do most of the heavy lifting for us.

{% include elements/figure.html image="/img/getting-started-wtih-ai-post/img2.png" caption="Showing four generations for prompt 'painting of a man working on computer' on CF Spark. [5] (Image by Author)" %}

Next, what makes CF Spark unique is its Prompt Builder [6] tool that can be used to create suitable prompts to get exactly the image that you need. They provide various options (with previews) of how an artistic style connects to a phrase. Browse through the options and select the ones you want your artwork to have - it's that easy!

{% include elements/figure.html image="/img/getting-started-wtih-ai-post/img3.png" caption="Prompt builder tool of CF Spark. [6] (Image by Author)" %}

To add to it, the UI is quite simple and intuitive enough that even an AI Art beginner can play around with it easily. In case you are lacking ideas or facing artist's block, just browse through the community feed to see what others are generating. I usually do this a lot, as it showcases the capability of the models and is a good source of inspiration. They also provide their own version of the prompt book [7] that covers some good practices for using the model. CF Spark is free to try and all these features just add to the value!

## Conclusion

The intention of this article was to act as a 101 for aspiring AI artists, for someone who wants to leverage the recent advances in the field of AI or wants to explore it for the first time. While these models are good at generating images, they still require humans to tell them what to do. And this to me is another art form (hence I described prompt engineering as an "art"). What makes AI Art generation unique is not that the scientist and artists are collaborating on a much grander scale, but that literally anyone (someone without a Ph.D. or Arts degree) can use these models to generate high-quality personalized artwork and share that with the world. This is what makes the field interesting and one could only imagine what surprises the future hold for us. ✌️

## References

- [Stable Diffusion 2.1 Demo on Hugging face spaces](https://huggingface.co/spaces/stabilityai/stable-diffusion)
- [Stable Diffusion 2.1 Model](https://huggingface.co/stabilityai/stable-diffusion-2-1)
- [Automatic1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui/)
- [The DALL·E 2 Prompt Book](https://dallery.gallery/the-dalle-2-prompt-book/)
- [CF Spark - Image Generation](https://www.creativefabrica.com/spark/ai-image-generator/)
- [CF Spark - Prompt Builder](https://www.creativefabrica.com/spark/tools/prompt-builder/)
- [CF Spark - Prompt Book](https://www.creativefabrica.com/spark/prompt-book/)

Cheers 👋