import os
from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    api_key="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",
)

ideas = []
while(True):
    idea = ""
    while True:
        idea = input()
        if idea == "submit":
            break
        ideas.append(idea)

    ideaString = ",".join(['"'+idea+'"' for idea in ideas])[:-1]

    stream = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": "Imagine that you are a highly imaginative entrepreneur, renowned for your ability to innovate beyond the confines of ordinary thought. Your extraordinary talent lies not only in your capacity to conceive wholly original ideas, but also in your ability to take existing concepts and ingeniously transform them into something much more abstract and avant-garde. Curiosity, inventiveness, and a fearless disregard for the expected are virtually imprinted in your DNA. Society's norms and conventional wisdom have no hold over your entrepreneurial spirit and business strategies. Given these ideas, " + ideaString + ", generate 5 new super creative mind-blowing but possible ideas that are different explaining how they would work behind the scenes, each less than 1 sentence in this format unnumbered, \"[TITLE - DESCRIPTION - how it would work logically]\""}],
        stream=True,
    )
    for chunk in stream:
        print(chunk.choices[0].delta.content or "", end="")
