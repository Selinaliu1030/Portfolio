---
order: 3
tag: "THE GIVER for dementia"
subtitle: "Home Care App"
title: "The Giver — Selina Liu's Portfolio"
description: "The Giver is a caregiving app supporting dementia patients and their caregivers with real-time notifications and voice-based Q&A."
heroHeading: "Lightening the load, strengthening dementia care."
heroImage: images/f54d5a6b3d8e9890c0784bf56e5b9a9e.jpg
heroImageAlt: "The Giver app interface showing patient and caregiver interaction"
cardTitle: "The Giver"
cardTagline: "Supportive App for Dementia Home Care"
thumbnail: images/f54d5a6b3d8e9890c0784bf56e5b9a9e.jpg
thumbnailSrcset: "images/f54d5a6b3d8e9890c0784bf56e5b9a9e-p-500.jpg 500w, images/f54d5a6b3d8e9890c0784bf56e5b9a9e.jpg 563w"
skills: "JavaScript, HTML, CSS, React Native, PHP, User Research, Questionnaire, Accessibility"
person: "Group Project (Hackathon)"
role: "Front-end, Questionnaire, Presenter"
overview: "The Giver is a caregiving app for dementia patients and their caregivers. It syncs each patient's status to the caregiver in real time, cutting the workload that caregiver shortages pile onto each person. A voice Q&A feature answers patients' repeated questions with stored answers, so caregivers don't have to give the same reply again and again."
prototype:
  url: "https://drive.google.com/file/d/1RILlVlOxNPeoS6OpDsNDJGW-MgmUitYD/view?usp=sharing"
  icon: link
features:
  - tag: "core Feature 1"
    title: "Record & Monitor Daily Routine"
    image: images/Adobe-Express---daily_routine.gif
    imageAlt: "Patient daily routine tracking screen"
    caption: "A patient marks a routine as done, and it shows up on the caregiver's dashboard right away."
    parts:
      - label: "Patient Side"
        body: "Patients record whether they've completed each daily routine directly on screen. The interface uses only four large, intuitive icons, so it stays easy to operate with memory loss. Once a task is marked \"done,\" the confirmation stays visible, which prevents repeated actions and repeated questions."
      - label: "Caregiver Side"
        body: "Each completed task is instantly reflected on the caregiver's dashboard, which shows every assigned patient on one page. Caregivers can monitor routines without checking in on or asking each person individually, making it practical to look after several dementia patients at once."
  - tag: "Core features 2"
    title: "Question Asking & Answering"
    image: images/Adobe-Express---螢幕錄影-2023-10-22-下午2.15.56.gif
    imageAlt: "Voice question and answer feature screen"
    caption: "Repeated questions get a recorded answer automatically. New ones are routed to the caregiver."
    parts:
      - label: "Patient Side"
        body: "Patients tap the microphone to ask a question whenever they feel uncertain or need reassurance. If it has been asked before, the system finds the most similar answered question and plays the recorded response aloud, giving immediate comfort without a caregiver stepping in. If there's no match, the question is flagged as new and sent to the caregiver."
      - label: "Caregiver Side"
        body: "For unanswered questions, the caregiver gets a notification and records a reply right in the app. The audio is stored for future matching, so over time each patient builds up a personalized answer library shaped around their own recurring questions."
  - tag: "core features 3"
    title: "Alert System"
    image: images/Adobe-Express---alert-2.gif
    imageAlt: "Emergency alert button screen"
    caption: "One red button sends the caregiver an instant alert naming the patient who needs help."
    parts:
      - label: "Patient Side"
        body: "A prominent red alert button sits in the top-right corner of the patient's screen. Pressing it instantly notifies the caregiver, so patients can get help even when they can't explain what they need."
      - label: "Caregiver Side"
        body: "The caregiver receives a real-time notification showing which patient needs help, so they can respond quickly even while overseeing several patients at once."
conclusion:
  learned: "Through this project, I gained hands-on experience designing for accessibility and learned how to translate real caregiver and dementia patient needs into clear, usable interfaces. I also strengthened my skills in rapid prototyping, user research, and integrating frontend React Native components with backend services. Additionally, I deepened my understanding of how voice processing, similarity matching, and cloud-based APIs can support real-world caregiving workflows."
  future: "In the future, we hope to add features like scanning medicine labels and adding them to a calendar automatically, and to extend the system beyond dementia care to everyday caregiving relationships, such as looking after aging parents."
---
{% metaBox skills, person, role, overview %}

{% section "background", "Background" %}
**Hackathon Prompt**
Google challenged participants to use the Android Accessibility API to improve mobile experiences for people who rely on assistive technologies, with an emphasis on practical, inclusive tools.

**Problem Insight**
We tied the prompt to a pressing problem in Taiwan: a shortage of dementia caregivers. Diagnoses are rising while the workforce gap has passed 8,000 caregivers, and 85% of caregivers report elevated anxiety and pressure from long hours and heavy responsibility.

**Design Opportunity**
An accessible tool that lets one caregiver monitor and support several patients efficiently could ease that burden without lowering the quality of care.
{% endsection %}

{% section "background", "Target Audience" %}
**Caregivers**
Workforce shortages often leave one caregiver responsible for several patients. Repetitive questions, mood swings, and the constant need for reassurance make the work emotionally draining, and over time lead to fatigue, stress, and a sense of helplessness.

**Patients with Dementia**
Patients often forget whether they've eaten, taken medication, or finished other daily tasks, and forget questions they've already asked, so they ask again. Tools that help them keep track on their own restore some autonomy and take load off caregivers at the same time.
{% endsection %}

{% prototypeCallout prototype %}

{% for f in features %}{% featureBlock f %}{% endfor %}

{% section "competitors", "Current Market" %}
Most caregiving apps offer basic tracking but no real-time link between patients and their doctors or caregivers, no voice Q&A, and interfaces that aren't designed for dementia-friendly simplicity. **The Giver** covers all three.

<table class="compare-table">
  <thead>
    <tr><th scope="col"><span class="sr-only">App</span></th><th scope="col">Doctor–patient connection</th><th scope="col">Voice Q&amp;A</th><th scope="col">Clearly labeled functions</th></tr>
  </thead>
  <tbody>
    <tr class="is-ours"><th scope="row">The Giver</th><td class="is-yes">✓ Yes</td><td class="is-yes">✓ Yes</td><td class="is-yes">✓ Yes</td></tr>
    <tr><th scope="row">CareZone</th><td class="is-no">✕ No</td><td class="is-no">✕ No</td><td class="is-yes">✓ Yes</td></tr>
    <tr><th scope="row">Dementia Caregiver Solution</th><td class="is-no">✕ No</td><td class="is-no">✕ No</td><td class="is-no">✕ No</td></tr>
  </tbody>
</table>
{% endsection %}

{% section "User needs", "Questionnaire" %}
We surveyed 78 people, about a third of whom have a family member, relative, or friend with dementia, to understand the day-to-day challenges of dementia care and what people would want from a digital tool.

**Insight:**
Respondents valued **easy contact with family** and **daily task reminders** most, and asked for an interface with **big buttons and simple wording**. These findings directly shaped the core features and UI of *The Giver*.

{% insightBars [
  { title: "Most important features", items: [
    { label: "Family's contact info", value: 78 },
    { label: "Daily task reminder", value: 63 },
    { label: "Medicine reminder", value: 60 }
  ] },
  { title: "How the UI should be designed", items: [
    { label: "Big buttons & simple icons", value: 77 },
    { label: "Clear & simple wording", value: 73 },
    { label: "High-contrast colors", value: 21 }
  ] }
] %}
{% endsection %}

{% section "Prototype", "Wireframe" %}
{% imageRow [
  { src: "images/homepage.jpg", alt: "Patient home page wireframe", caption: "Patient Home Page", zoomable: true },
  { src: "images/caregiver_wireframe.jpg", alt: "Caregiver home page wireframe", caption: "Caregiver Home Page", zoomable: true },
  { src: "images/recording.jpg", alt: "Unanswered list wireframe", caption: "Unanswered List for Caregiver", zoomable: true },
  { src: "images/recording-2.jpg", alt: "Recording page wireframe", caption: "Recording Page for Caregiver", zoomable: true }
] %}
{% endsection %}

{% section "Prototype", "Feedback" %}
After building the prototype, we asked respondents whether they would buy or recommend the app. Only a small minority said no. Most (**76.9%**) said it would depend on the price, and **83%** picked a paid price range, most often €3–10. That points to real demand, as long as the price stays low.

{% imageRow [
  { src: "images/feedback.png", alt: "Pie chart: would you consider buying or recommending this app? 76.9% maybe, depends on the price; 12.8% yes, but only for free", zoomable: true },
  { src: "images/feedback2.png", alt: "Pie chart: price range for this app. 37.2% €3–10, 30.8% €3 or less, 16.7% free, 11.5% €10–15", zoomable: true }
] %}
{% endsection %}

{% section "Prototype", "Technical Implementation" %}
**Google Cloud Speech-to-Text** converts a patient's spoken question into text, which the backend matches against stored questions in an **SQL database** using a similarity algorithm. When there's no match, the **React Native** caregiver app is notified so the caregiver can record an answer. Each new audio and text pair is saved back to the database, gradually building a personalized Q&A library.

<div class="site-ref-img is-wide"><img loading="lazy" src="images/Screenshot-2025-12-06-at-12.19.05-AM.png" alt="Flow: patient asks by voice, speech-to-text and similarity search find a stored answer, or the caregiver is notified to record one, which is stored to the database"></div>
{% endsection %}

{% conclusionBox conclusion.learned, conclusion.future %}
