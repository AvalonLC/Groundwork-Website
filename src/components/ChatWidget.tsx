import { Icon } from './Icon'

// Groundwork AI — site-wide chat widget. Click-to-open launcher, every page
// (mounted once in Layout.tsx). Desktop renders as a slide-over; mobile
// renders full-screen — both are the SAME markup, switched by CSS media
// query (see styles.css .gw-chat-panel rules), matching the pattern already
// used for .demo-slideover elsewhere on this site.
//
// All behavior (open/close, SSE streaming, session continuity across page
// navigation via sessionStorage, accessibility focus handling) lives in
// public/static/chat-widget.js — this component only renders the markup and
// ARIA scaffolding. No inline <script> (CSP has no 'unsafe-inline' on
// script-src — see src/index.tsx CSP comment).
interface ChatWidgetProps {
  path: string
}

export function ChatWidget({ path }: ChatWidgetProps) {
  return (
    <div id="gw-chat-root" data-gw-chat-root data-gw-chat-path={path}>
      <button
        type="button"
        id="gw-chat-launcher"
        data-gw-chat-launcher
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="gw-chat-panel"
        aria-label="Open Groundwork AI chat"
      >
        <Icon name="sparkle" size={18} />
        <span class="gw-chat-launcher-label">Groundwork AI</span>
      </button>

      <div
        id="gw-chat-panel"
        class="gw-chat-panel"
        data-gw-chat-panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="gw-chat-title"
        hidden
      >
        <div class="gw-chat-header">
          <div class="gw-chat-header-title">
            <Icon name="sparkle" size={16} style="color: var(--gw-green-500);" />
            <span id="gw-chat-title">Groundwork AI</span>
          </div>
          <button type="button" class="gw-chat-close" data-gw-chat-close aria-label="Close chat">
            <Icon name="x" size={16} />
          </button>
        </div>

        <div class="gw-chat-disclosure">
          I'm an AI assistant, not a person. I can help with pricing, features, and connecting you with the team.
          Conversations are stored to improve answers and follow up on requests — see our{' '}
          <a href="/security">privacy &amp; data practices</a>.
        </div>

        <div class="gw-chat-log" data-gw-chat-log role="log" aria-live="polite" aria-relevant="additions">
          <div class="gw-chat-bubble gw-chat-bubble-ai" data-gw-chat-welcome>
            Hi — I'm Groundwork AI. What's the main thing you're trying to figure out: pricing, a specific feature, or
            whether Groundwork fits your trade?
          </div>
        </div>

        <div class="gw-chat-status" data-gw-chat-status hidden aria-live="polite"></div>

        <form class="gw-chat-inputrow" data-gw-chat-form>
          <label class="sr-only" for="gw-chat-input">
            Message Groundwork AI
          </label>
          <input
            type="text"
            id="gw-chat-input"
            data-gw-chat-input
            placeholder="Ask about pricing, features, or your trade…"
            autocomplete="off"
            maxlength="2000"
          />
          <button type="submit" class="gw-chat-send" data-gw-chat-send aria-label="Send message">
            <Icon name="arrow" size={15} />
          </button>
        </form>
      </div>

      <div class="gw-chat-backdrop" data-gw-chat-backdrop hidden></div>
    </div>
  )
}
