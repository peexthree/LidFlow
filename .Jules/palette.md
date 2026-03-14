## 2024-05-24 - Form status contrast and visual feedback

**Learning:** Adding a spinner indicator to the form submit button prevents duplicate submissions, provides immediate feedback, and reassures the user that something is happening during network latency. In addition, dynamically styling error messages and success messages with high contrast colors (`text-red-400` and `text-emerald-400`) instead of the default low-contrast `text-white/60` significantly improves accessibility, making it easier for users with visual impairments to notice the status change and interpret the result.
**Action:** Always include a visual spinner or progress indicator on asynchronous buttons, and conditionally map status states (error, success) to semantically correct, high-contrast colors in UI forms.
