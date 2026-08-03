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
overview: "Taski is a task-based social matching platform designed for young adults who prefer doing activities with others rather than alone. Instead of relying on appearance or long conversations, Taski connects users through shared tasks — whether it's grabbing a meal, studying together, attending events, or completing everyday errands. By focusing on action first and interaction second, Taski reduces the psychological burden of asking others to join and eliminates the awkwardness of mismatched expectations. The system enables quick, low-commitment pairing, helping users form genuine connections through simple, meaningful moments of doing things together."
prototype:
  url: "https://www.figma.com/proto/p1lkTHcLnds23qFoq8ebwH/%E5%88%B0%E5%BA%95%E8%83%BD%E4%B8%8D%E8%83%BD%E5%85%B1%E7%B7%A8%E5%91%A2?page-id=4951%3A2196&node-id=4951-2199&viewport=240%2C306%2C0.11&t=lpEJxt3hBzFZFgrn-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4951%3A2199&show-proto-sidebar=1"
  icon: images/figma-2.png
features:
  - tag: "core Feature 1"
    title: "Participating & Starting up Events"
    image: images/Adobe-Express---螢幕錄影-2025-11-15-中午12.43.03-2-2.gif
    imageAlt: "Participating and starting up events screen"
    parts:
      - label: "Participate"
        body: "The system will recommend events by algorithm, or the user can use a filter to filter the events. If there's an event that the user is interested in, they can click on \"heart\" to save it, or swipe right to delete. If they want to participate, they can click on the card and answer the questions set by the host, then send an application."
      - label: "Start up"
        body: "Click on the \"plus\" to create a new event. Besides filling in the basic information of the event, like topic, time, and venue, the host can select how emergent this event is, which will lead to different broadcast and different chatroom mechanisms."
  - tag: "Core features 2"
    title: "Event Matching"
    image: images/Adobe-Express---螢幕錄影-2025-11-15-中午12.50.05.gif
    imageAlt: "Event matching results screen"
    parts:
      - label: "Matching Result Page"
        body: "Here, the successfully matched task will be shown, together with the link to the 1-on-1 chatroom."
      - label: "Application Page"
        body: "On this page, all the applications to your task will be shown. You can preview all the scores toward your customized questions in one glance, and clicking into the application card lets you see more detailed answers and decide to \"reject\" or \"accept.\""
  - tag: "core features 3"
    title: "Chatroom"
    image: images/Adobe-Express---螢幕錄影-2025-11-15-中午12.55.12-2.gif
    imageAlt: "Time-limited chatroom screen"
    parts:
      - body: "The chatroom is time-limited in order to put focus on getting the task done. The users have to discuss the meet-up information, like when and where to meet, and create the event within the time limit, or else the chatroom will vanish and the match will be cancelled. The time limit depends on the emergency level the host set up when publishing the task."
  - tag: "core features 4"
    title: "Personal Profile"
    image: images/Adobe-Express---螢幕錄影-2025-11-15-下午1.02.09.gif
    imageAlt: "Personal profile screen"
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

**Problem:**
1. **Appearance-centered evaluation** creates objectification risks and fails to match people based on shared activities
2. **Gamified reward systems** (likes, swipes, streaks) hinder the formation of genuine, meaningful relationships
3. **Fast-paced screening** reinforces existing biases and prejudices
4. **No existing platform** focuses specifically on task-oriented social matching

**Goals:**
1. Built around doing things together: appearance-based matching → activity-based pairing
2. Fostering authentic human connection
{% endsection %}

{% section "background", "Target Audience" %}
Our target audience focuses on **youth aged 18–30 who prefer not to do activities alone**. This group can be divided into two segments:

**Peripheral Users:** Passive users who are not sure what they want to do. They prefer browsing, quick usage, and easily joining existing tasks.
**Core Users:** Active users who proactively seek companions for specific tasks or activities they already have in mind.

{% imageRow [
  { src: "images/young-adult-aged-18-30--confident-and-energetic--a.png", alt: "Confident and energetic young adult persona" },
  { src: "images/young-adult-aged-18-30--casually-browsing-on-smart.png", alt: "Young adult casually browsing on smartphone persona" }
] %}
{% endsection %}

{% prototypeCallout prototype %}

{% for f in features %}{% featureBlock f %}{% endfor %}

{% section "competitors", "Current Market" %}
We analyzed 4 other competitors, and found out that our app has the leading advantage.

![Competitor analysis chart](images/競品.jpg)
{% endsection %}

{% section "User needs", "Interview" %}
We conducted semi-structured interviews to find the real user needs. We interviewed **7 university students** with different backgrounds and personalities. We focused on scenarios where participants **wanted someone to join** them, to discover the underlying motivation and challenges of the process.

The interviews revealed that some frequently **give up on activities** due to not finding suitable task-buddies. Users desire **fast, low-commitment matching** without long conversations. Awkwardness and **fear of incompatible personalities** are major blockers to finding a task buddy online.

> "Enjoys attending large-scale events with someone to share costs, but finds it stressful to be the host due to the risk of others not showing up. Prefers finding companions who match their vibe and energy." — *Emily, Extrovert*

> "Enjoys having someone to share free-time activities with, but often struggles to align schedules or interests with friends, making plans hard to realize. Hopes to find someone with a compatible personality to create meaningful memories together." — *Amy, Introvert*

**Insight:**

{% imageRow [
  { src: "images/pull-factor.png", alt: "Pull factor insight chart" },
  { src: "images/push-fator.png", alt: "Push factor insight chart" }
] %}
{% endsection %}

{% section "User Needs", "User Journey Map" %}
We identified that our target users want genuine companionship when completing tasks. To better understand their motivations and pain points, we used a user journey map, which allowed us to extract key design insights for further ideation and prototyping.

![User journey map](images/Journey-map.png)

**Insights:**
1. How Might We make finding a companion quick and easy?
2. How Might We make task planning more efficient?
3. How Might We make the user trust the other person and be willing to go to a physical task?
{% endsection %}

{% section "Ideation", "Brainstorming" %}
**CityWanderer**
CityWanderer Challenge is a 3-week summer camp that blends travel, social interaction, and game-like exploration to help young people build genuine human connections. This challenge gave *Taski* the idea of task-based social matching to build genuine friendship.

![CityWanderer reference](images/default-cover-fb7b9fdd099dfe40f2cb7c56eab20b2c.png)

**MeetUp**
Meetup is a platform that helps people connect through interest-based events. Users can discover activities that match their hobbies and join or host their own events. Meetup's approach to hosting and joining events through an online platform inspired Taski's task-launching design.

![Meetup reference logo](images/Meetup-Logo-2016-present.png)
{% endsection %}

{% section "Prototype", "Wireframe" %}
Low fidelity prototype with key features, which was later used for testing.

{% imageRow [
  { src: "images/wireframe1.png", alt: "Wireframe screen 1" },
  { src: "images/wireframe2.png", alt: "Wireframe screen 2" },
  { src: "images/wireframe3.png", alt: "Wireframe screen 3" }
] %}
{% endsection %}

{% conclusionBox conclusion.learned, conclusion.future %}
