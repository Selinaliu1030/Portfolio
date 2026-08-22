---
order: 1
tag: "STREAMSYNC"
subtitle: "AI-driven Customized Meditation App"
title: "StreamSync — Selina Liu's Portfolio"
description: "StreamSync is an AI-customized meditation tool that helps knowledge workers recover smoothly after unexpected interruptions."
heroHeading: "Breaks are not barriers; <br>Back to work is as smooth as streams"
heroImage: images/1-.封面.png
heroImageAlt: "StreamSync app interface preview"
cardTitle: "StreamSync"
cardTagline: "AI-driven Customized Meditation App"
thumbnail: images/1-.封面.png
thumbnailSrcset: "images/1-.封面-p-500.png 500w, images/1-.封面-p-800.png 800w, images/1-.封面-p-1080.png 1080w, images/1-.封面-p-1600.png 1600w, images/1-.封面.png 1920w"
skills: "Figma, React, Postman, Background Research, Interactive Design"
person: "Group Project"
role: "Front-end, Background Research"
overview: "StreamSync is an AI-customized meditation tool designed to help knowledge workers recover quickly and smoothly after unexpected interruptions. By combining guided micro-meditation, progress reminders, and personalized cues, StreamSync helps users regain clarity, rebuild context, and return to work with a calmer state of mind. Grounded in Self-Determination Theory and supported by research on emotional regulation and Time Well Spent, StreamSync transforms interruption from a disruptive experience into a manageable, restorative moment. The goal is simple: help users protect their mental balance, maintain momentum, and feel in control of their workflow again."
prototype:
  url: "https://drive.google.com/file/d/1RILlVlOxNPeoS6OpDsNDJGW-MgmUitYD/view?usp=sharing"
  icon: link
features:
  - tag: "core Feature 1"
    title: "Mind Dump"
    image: images/Adobe-Express---enter_section-2-1.gif
    imageAlt: "Mind dump feature screen"
    caption: "Log what you were doing and what interrupted you, calmed by a slow-swimming goldfish."
    parts:
      - body: "When the system detects the user being interrupted, when the user comes back, the system will guide the user to the StreamSync page, where the user can mind-dump the task they were doing before the interruption and the interruption event. The background of the mind-dump page is a swimming goldfish, symbolizing the mid-flow and making the user feel more calm."
  - tag: "Core features 2"
    title: "Customized Meditation"
    image: images/Adobe-Express---meditation.gif
    imageAlt: "Meditation session animation"
    caption: "A 2-minute AI-generated, voice-guided meditation bridges you back into your last task."
    parts:
      - body: "Combining the input of the user in the entering phase and the Time Well Spent framework concept, we engineered the system prompt to ask Gemini to generate a 2-minute customized meditation prompt. Afterwards, through voice AI, the system speaks out the meditation prompt in a gentle, human-like voice tone that not only helps the user calm down but also reflects on the work they've done before being interrupted, gently bridging them toward working again. The background is chosen to be a bit blurred with a warm light color to reduce visual disruption to the user."
  - tag: "core features 3"
    title: "Work Review"
    image: images/Adobe-Express---end-3.gif
    imageAlt: "Work review summary screen"
    caption: "A summary of your progress reconnects you to the work as interruptions fade away."
    parts:
      - body: "After the meditation, the system bases on the input and presents a summary of the work the user has done, to help them connect back to the work. The bubble beside it stands for the interruption events the user encountered, which gradually disappear from the screen, as they do in the user's mind."
conclusion:
  learned: "Through this project, I learned how to cooperate with designers as an engineer and incorporate technology into the design solution."
  future: "In the future, we hope to combine StreamSync with a task-tracking system to monitor the user before the interruption, and to better customize the meditation prompt and support work-progress review."
tws:
  - aspect: "What I've worked on"
    prompt: "Input the interruption event"
  - aspect: "How I worked"
    prompt: "Sense the present moment"
  - aspect: "How I feel"
    prompt: "Feel the body and the emotion"
  - aspect: "How I take care of myself"
    prompt: "Back to self condition"
storyboard:
  - image: images/streamsync-storyboard-1.jpg
    alt: "Amy looking startled and turning back toward her laptop after being interrupted"
    caption: "After interruption, Amy wants to go back to the flow"
  - image: images/streamsync-storyboard-2.jpg
    alt: "Amy at her laptop with a small negative-thought cloud icon beside her, a gradient beam guiding her attention to the screen"
    caption: "StreamSync guides the user to release the negative thoughts"
  - image: images/streamsync-storyboard-3.jpg
    alt: "Amy sitting calmly with eyes closed, a warm glow surrounding her while she works"
    caption: "Meditation helps stabilize the mood"
  - image: images/streamsync-storyboard-4.jpg
    alt: "Amy smiling and relaxed, working happily at her laptop"
    caption: "Reflects on task progress and smoothly gets back to task"
personaChain:
  personas:
    - avatar: images/streamsync-persona-joseph.png
      name: "Joseph"
      quote: "Feel like the time being wasted and feel guilty about it"
    - avatar: images/streamsync-persona-rosa.png
      name: "Rosa"
      quote: "Feel more agitated when interrupted during deep work and ends up not returning to work"
    - avatar: images/streamsync-persona-greta.png
      name: "Greta"
      quote: "Can't control external interruption, feels no self control, and doubts self capability"
  chain:
    - "Interruption"
    - "Negative Emotions"
    - "Lower the Motivation"
---
{% metaBox skills, person, role, overview %}

{% section "background", "Background Introduction" %}
**Overview:**
Switching between devices constantly breaks focus. Every interruption costs users their original context, sometimes forcing them to redo work entirely. We set out to understand why these switches happen, and what kind of cue could help people recover faster.

**Problem:**
Unexpected interruptions can diminish positive attitude toward work and reduce one's sense of well-being.

**Research Questions:**
1. How can we mitigate the negative emotions caused by passive interruptions?
2. Can guided interruptions reduce overcompensation behaviors and, in turn, decrease long-term fatigue and anxiety?
3. Can meditation-based interventions improve users' efficiency in re-engaging with their original tasks and enhance their perceived sense of task control?
{% endsection %}

{% section "background", "Target Audience" %}
Our target audience is **self-paced knowledge workers** who highly value efficiency, autonomy, and control over their workflow. Self-Determination Theory holds that autonomy is essential to their psychological balance, so a passive interruption hits harder: it disrupts that autonomy directly, triggering cycles of productivity anxiety and self-criticism that lower motivation.
{% endsection %}

{% prototypeCallout prototype %}

{% featureBlock features[0] %}
{% featureBlock features[1] %}
{% twsFlowDiagram tws %}
{% featureBlock features[2] %}

{% section "competitors", "Current Market" %}
Existing tools focus on preventing interruptions, through schedules, focus timers, and notification blocking. None of them help once the flow is already broken. StreamSync targets that gap directly: work-progress tracking and guided recovery, addressing the frustration and anxiety at the root instead of just avoiding it.

![Competitive landscape frame](images/Frame-18-2.jpg)
{% endsection %}

{% section "User needs", "Interview" %}
We conducted semi-structured interviews with **20 university students**, who have high demand on themselves, to understand their real needs. We explored:
- Whether they face unexpected, uncontrollable interruptions during deep-focus tasks
- How these interruptions affect their emotions
- How they recover or reset afterward
- The state they hope to return to
- What prevents them from achieving that ideal recovery

**Insight:**
Through the interview we found out that passive interruption can lead to negative emotions and thus reduce the motivation of going back to work.

{% personaChain personaChain %}
{% endsection %}

{% section "User Needs", "Story Board" %}
We identified that our target users want genuine companionship when completing tasks. To better understand their motivations and pain points, we used a user journey map, which allowed us to extract key design insights for further ideation and prototyping.

{% storyboard storyboard %}

**Insights:** **How Might We** transform the negative emotions caused by passive interruptions into a controllable, positive experience?
{% endsection %}

{% section "Ideation", "Brainstorming" %}
**How Meditation Helps Soothe Negative Emotions and Improve Productivity:**
Short meditation sessions ease the negative feelings triggered by interruptions. Basso et al. (2019) found that just 13 minutes of guided meditation a day, for eight weeks, significantly improved attention, memory, mood, and emotion-regulation, even for people with no prior meditation experience. That's what makes a brief 3–5 minute intervention feasible for our design.

![Meditation research reference](images/6.解方研究.png)

*Reference: International Journal of Research in Human Resource Management. (2024). The impact of meditation on employee productivity*

**Time Well Spent Framework (TWS):**
Reflecting on how you spend your time can reshape how you feel about it. A week-long study of 40 knowledge workers (Guillou et al., 2023) found that just writing down *what*, *how*, and *how you felt* about your work shifted people's emotional response, no formal intervention needed.

![Time Well Spent framework reference](images/OpenHCI-期末.png)

*Reference: Guillou, L., Blandin, S., Calvary, G., & Lafont, A. (2023). Reclaiming Time Well Spent at Work: Exploring Definitions and Reflections through a Week-long ESM Study. Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems.*
{% endsection %}

{% conclusionBox conclusion.learned, conclusion.future %}
