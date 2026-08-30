---
order: 2
tag: "TASKI"
subtitle: "Task-oriented Social Matching App"
title: "Taski — Selina Liu's Portfolio"
description: "Taski is a task-based social matching platform connecting young adults through shared activities instead of appearance-based swiping."
heroHeading: "Made to match task, designed to ease"
heroImage: images/截圖-2025-11-07-下午2.05.37.png
heroImageAlt: "Taski app interface preview"
cardTitle: "Taski"
cardTagline: "Task-oriented Social Matching App"
thumbnail: images/截圖-2025-11-07-下午2.05.37.png
thumbnailSrcset: "images/截圖-2025-11-07-下午2.05.37-p-500.png 500w, images/截圖-2025-11-07-下午2.05.37-p-800.png 800w, images/截圖-2025-11-07-下午2.05.37-p-1080.png 1080w, images/截圖-2025-11-07-下午2.05.37-p-1600.png 1600w, images/截圖-2025-11-07-下午2.05.37-p-2000.png 2000w, images/截圖-2025-11-07-下午2.05.37-p-2600.png 2600w, images/截圖-2025-11-07-下午2.05.37.png 3024w"
skills: "Figma, WireFrame, User Journey Map, Iterative Design"
person: "Group Project"
role: "UX Research, Prototyping"
overview: "Taski is a task-based social matching platform for young adults who prefer doing activities with others rather than alone. It connects people through shared tasks instead of appearance or long conversations, reducing the pressure of asking someone to join and the awkwardness of mismatched expectations."
prototype:
  url: "https://www.figma.com/proto/p1lkTHcLnds23qFoq8ebwH/%E5%88%B0%E5%BA%95%E8%83%BD%E4%B8%8D%E8%83%BD%E5%85%B1%E7%B7%A8%E5%91%A2?page-id=4951%3A2196&node-id=4951-2199&viewport=240%2C306%2C0.11&t=lpEJxt3hBzFZFgrn-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4951%3A2199&show-proto-sidebar=1"
  icon: images/figma-2.png
features:
  - tag: "core Feature 1"
    title: "Participating & Starting up Events"
    image: images/Adobe-Express---螢幕錄影-2025-11-15-中午12.43.03-2-2.gif
    imageAlt: "Participating and starting up events screen"
    caption: "Browse and filter events, or launch your own with an urgency level that shapes how it's broadcast."
    portrait: true
    parts:
      - label: "Participate"
        body: "The system will recommend events by algorithm, or the user can use a filter to filter the events. If there's an event that the user is interested in, they can click on \"heart\" to save it, or swipe right to delete. If they want to participate, they can click on the card and answer the questions set by the host, then send an application."
      - label: "Start up"
        body: "Click on the \"plus\" to create a new event. Besides filling in the basic information of the event, like topic, time, and venue, the host can select how emergent this event is, which will lead to different broadcast and different chatroom mechanisms."
  - tag: "Core features 2"
    title: "Event Matching"
    image: images/Adobe-Express---螢幕錄影-2025-11-15-中午12.50.05.gif
    imageAlt: "Event matching results screen"
    caption: "See every application's scores at a glance before deciding to accept or reject."
    portrait: true
    parts:
      - label: "Matching Result Page"
        body: "Here, the successfully matched task will be shown, together with the link to the 1-on-1 chatroom."
      - label: "Application Page"
        body: "On this page, all the applications to your task will be shown. You can preview all the scores toward your customized questions in one glance, and clicking into the application card lets you see more detailed answers and decide to \"reject\" or \"accept.\""
  - tag: "core features 3"
    title: "Chatroom"
    image: images/Adobe-Express---螢幕錄影-2025-11-15-中午12.55.12-2.gif
    imageAlt: "Time-limited chatroom screen"
    caption: "A countdown keeps the conversation moving toward locking in a real plan."
    portrait: true
    parts:
      - body: "The chatroom is time-limited in order to put focus on getting the task done. The users have to discuss the meet-up information, like when and where to meet, and create the event within the time limit, or else the chatroom will vanish and the match will be cancelled. The time limit depends on the emergency level the host set up when publishing the task."
  - tag: "core features 4"
    title: "Personal Profile"
    image: images/Adobe-Express---螢幕錄影-2025-11-15-下午1.02.09.gif
    imageAlt: "Personal profile screen"
    caption: "Photos and a no-show rating build trust before anyone meets in person."
    portrait: true
    parts:
      - label: "Photo Gallery"
        body: "After the event, the user can upload photos from that event and add captions, not only to keep the memory but also to serve as safety verification for other participants who want to join future events."
      - label: "No-show Rating"
        body: "If the user ever no-shows an event, their rating will increase. This can be an indicator of whether to go out with this user again or not."
conclusion:
  learned: "User interviews and user feedback are really a game changer, and can help shape the design in completely different ways. Also, working with members from different backgrounds really inspired my thinking for the idea."
  future: "This is the MVP of the prototype; in the future we plan to program it into a real app and work with the university to test it on target users and gather more feedback."
---
{% metaBox skills, person, role, overview %}

{% section "background", "Why do we need an app for task matching?" %}
**Overview:**
While dating-app usage continues to grow globally, with over 36B+ users, the purpose behind social matching has significantly shifted. According to *Bumble's 2024 Year in Swipe*, users (especially Gen Z) are increasingly using these platforms not for romantic relationships but for sharing lifestyles, finding companions for activities, and expanding their social circles. Similarly, SSRS's 2024 report *The Public and Online Dating* highlights a growing emphasis on "nanoships" (micro-connections), lifestyle compatibility, and task-based interactions, marking a move away from traditional romance-oriented motivations.

{% problemGoals {
  eyebrow: "The shift",
  from: { kicker: "Dating apps today", headline: "Appearance-based matching" },
  to: { kicker: "This product", headline: "Activity-based pairing" },
  outcome: "Built around doing things together. The outcome we design for is **authentic human connection**.",
  findingsLabel: "Why: 4 findings",
  hint: "Click any card to open",
  findings: [
    { title: "**Appearance-centered evaluation** creates objectification risks", body: "Ranking on looks means the app never learns what someone actually wants to do. The match ends up built on the wrong signal." },
    { title: "**Gamified reward systems** hinder genuine relationships", body: "Likes, swipes and streaks reward volume over intent, turning meeting people into a scoring loop." },
    { title: "**Fast-paced screening** reinforces biases and prejudices", body: "Split-second decisions run on stereotype: with no context, people fall back on what a photo implies." },
    { title: "**No existing platform** focuses on task-oriented social matching", body: "Competitors optimize for romance or for events, never for pairing two people on one concrete task." }
  ]
} %}
{% endsection %}

{% section "background", "Target Audience" %}
Our target audience focuses on **youth aged 18–30 who prefer not to do activities alone**. This group can be divided into two segments:

**Peripheral Users:** Passive users who are not sure what they want to do. They prefer browsing, quick usage, and easily joining existing tasks.<br>
**Core Users:** Active users who proactively seek companions for specific tasks or activities they already have in mind.
{% endsection %}

{% prototypeCallout prototype %}

{% for f in features %}{% featureBlock f %}{% endfor %}

{% section "competitors", "Current Market" %}
We analyzed 4 other competitors, and found out that our app has the leading advantage.

<div class="site-ref-img is-wide"><img src="images/競品.jpg" alt="Competitor analysis chart"></div>
{% endsection %}

{% section "User needs", "Interview" %}
We conducted semi-structured interviews to find the real user needs. We interviewed **7 university students** with different backgrounds and personalities. We focused on scenarios where participants **wanted someone to join** them, to discover the underlying motivation and challenges of the process.

The interviews revealed that some frequently **give up on activities** due to not finding suitable task-buddies. Users desire **fast, low-commitment matching** without long conversations. Awkwardness and **fear of incompatible personalities** are major blockers to finding a task buddy online.

<div class="site-quote-row">
<blockquote class="site-quote">"Enjoys attending large-scale events with someone to share costs, but finds it stressful to be the host due to the risk of others not showing up. Prefers finding companions who match their vibe and energy."<cite>Emily, Extrovert</cite></blockquote>

<blockquote class="site-quote">"Enjoys having someone to share free-time activities with, but often struggles to align schedules or interests with friends, making plans hard to realize. Hopes to find someone with a compatible personality to create meaningful memories together."<cite>Amy, Introvert</cite></blockquote>
</div>

**Insight:**

{% insightBars [
  { title: "Motivation: Pull Factors", items: [
    { label: "Find peers who share similar values and vibes", value: 83 },
    { label: "Share the cost", value: 43 },
    { label: "Feel lonely", value: 33 }
  ] },
  { title: "Motivation: Push Factors", items: [
    { label: "Suddenly not feeling like going / got stood up", value: 67 },
    { label: "Gave up, friends are not available", value: 50 },
    { label: "Safety concern", value: 50 }
  ] }
] %}
{% endsection %}

{% section "User Needs", "User Journey Map" %}
We identified that our target users want genuine companionship when completing tasks. To better understand their motivations and pain points, we mapped a real scenario end to end, tracking the emotional highs and lows at each stage.

{% journeyMap {
  scenario: "Amy wants to visit the National Museum and uses Taski to find someone to go with her.",
  lowPoint: "Send Application",
  highPoint: "Doing the Task",
  stages: [
    {
      name: "Need", mood: "neutral", point: [140, 165],
      experience: ["Excited about the idea of going to the museum", "Annoyed by having no one to ask out"],
      opportunity: ["Task-oriented matching", "A quick, easy way to find a companion"]
    },
    {
      name: "Open & Browse", mood: "neutral", point: [320, 150],
      experience: ["Excited about the number of relevant options", "Unsure about hosts' credibility and whether they will actually show up"],
      opportunity: ["A filter to search for the exact event", "Access to host profiles and credibility signals"]
    },
    {
      name: "Send Application", mood: "low", point: [500, 215],
      experience: ["Stressed about what to write in the self-introduction", "Anxious about the decision, and afraid no one responds"],
      opportunity: ["A short personality quiz in place of a written self-intro"]
    },
    {
      name: "Match", mood: "neutral", point: [680, 175],
      experience: ["Decides the date and time in the app chatroom", "Waits a long time for replies, so planning drags"],
      opportunity: ["A time-limited chatroom that keeps task planning efficient"]
    },
    {
      name: "Task", mood: "high", point: [860, 66],
      experience: ["Waiting outside the museum, worried the conversation will be awkward if interests don't align", "Visits the National Museum with a new friend"],
      opportunity: ["Surface the personality-quiz overlap so the pairing feels right before meeting"]
    },
    {
      name: "End", mood: "high", point: [1010, 76],
      experience: ["Uploads photos to the gallery to record the memory and the new friend"],
      opportunity: ["A report mechanism for when the task didn't go well"]
    }
  ]
} %}

**Insights:**
1. How Might We make finding a companion quick and easy?
2. How Might We make task planning more efficient?
3. How Might We make the user trust the other person and be willing to go to a physical task?
{% endsection %}

{% section "Ideation", "Brainstorming" %}
**CityWanderer**
CityWanderer Challenge is a 3-week summer camp that blends travel, social interaction, and game-like exploration to help young people build genuine human connections. This challenge gave *Taski* the idea of task-based social matching to build genuine friendship.

<div class="site-ref-img"><img src="images/default-cover-fb7b9fdd099dfe40f2cb7c56eab20b2c.png" alt="CityWanderer reference"><p class="site-ref-caption">Reference: CityWanderer Challenge</p></div>

**MeetUp**
Meetup is a platform that helps people connect through interest-based events. Users can discover activities that match their hobbies and join or host their own events. Meetup's approach to hosting and joining events through an online platform inspired Taski's task-launching design.

<div class="site-ref-img"><img src="images/Meetup-Logo-2016-present.png" alt="Meetup reference logo"><p class="site-ref-caption">Reference: Meetup</p></div>
{% endsection %}

{% section "Prototype", "Wireframe" %}
Low fidelity prototype with key features, which was later used for testing.

{% imageRow [
  { src: "images/wireframe1.png", alt: "Wireframe screen 1", zoomable: true },
  { src: "images/wireframe2.png", alt: "Wireframe screen 2", zoomable: true },
  { src: "images/wireframe3.png", alt: "Wireframe screen 3", zoomable: true }
] %}
{% endsection %}

{% conclusionBox conclusion.learned, conclusion.future %}
