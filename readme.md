# Hacker News PWA

https://hackernews.robweb.dev/

This Hacker News reader was built as an excercise in inclusive design, accessibility, progressive enhancement,progressive web apps and streamed rendering. It is a work in progress. :construction:

- Streamed server side rendering using Express and lit-html-server node renderToStream
- Streamed service worker rendering using lit-html-server browser renderToStream
- Offline experience
- Currently no JS runs in the window context only in the service worker - the plan is to add web components for UI interactions such as comment collapsing
- Lighthouse score: **100**
- Minimal and inclusive design
