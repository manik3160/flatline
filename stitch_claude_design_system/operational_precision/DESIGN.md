---
name: Operational Precision
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c6c4d8'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa1'
  outline-variant: '#464555'
  surface-tint: '#c1c1ff'
  primary: '#c1c1ff'
  on-primary: '#1400a8'
  primary-container: '#5d5dff'
  on-primary-container: '#fefaff'
  inverse-primary: '#4644e9'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb690'
  on-tertiary: '#542100'
  tertiary-container: '#bf5400'
  on-tertiary-container: '#fffbfa'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1dfff'
  primary-fixed-dim: '#c1c1ff'
  on-primary-fixed: '#09006b'
  on-primary-fixed-variant: '#2a21d2'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb690'
  on-tertiary-fixed: '#331100'
  on-tertiary-fixed-variant: '#783200'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
  ai-indigo: '#5D5DFF'
  logic-lime: '#10B981'
  slate-950: '#020617'
  slate-900: '#0F172A'
  slate-800: '#1E293B'
  slate-400: '#94A3B8'
  pure-white: '#FFFFFF'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The brand personality is **Developer-Centric**, defined by **Strategic Clarity** and **Operational Precision**. It acts as a "tactical bridge" between human intent and machine execution, prioritizing logic, efficiency, and depth over decorative flair. The aesthetic is clean, structured, and inherently trustworthy, echoing the meticulous nature of high-quality documentation and codebases.

The design style is a hybrid of **Minimalism** and **Modern Corporate**, utilizing a highly structured layout with subtle **Tonal Layering**. It avoids unnecessary shadows or skeuomorphism, instead relying on precise geometry, clear typographic hierarchy, and a high-contrast palette to guide the user through complex information densities. The UI should evoke a feeling of "ordered intelligence"—a space where developers and strategists can find immediate focus.

## Colors

The palette is rooted in a professional and technical spectrum, primarily utilizing a **dark mode** default to reduce eye strain during prolonged technical work. 

- **Primary (AI Indigo):** A vibrant, high-energy indigo used for primary actions, active states, and brand-critical highlights.
- **Secondary (Logic Lime):** A sharp, technical green used for success states, terminal outputs, and secondary "tactical" emphasis.
- **Neutral (Deep Slate):** A series of deep blues and slates form the foundation. `#020617` is the base background, while `#0F172A` and `#1E293B` are used for containers and borders to create depth without traditional shadows.
- **Text:** High-contrast pure white for headings and primary content, with muted slate (`#94A3B8`) for metadata and secondary descriptions.

## Typography

Typography is the primary vehicle for the "tactical bridge" concept, mixing clean sans-serif for navigation with refined monospace for data.

- **Headlines:** Use **Hanken Grotesk**. It provides a sharp, contemporary feel with high legibility at large scales. Tighten letter spacing on XL headers to enhance the "structured" look.
- **Body:** Use **Inter**. It is a utilitarian workhorse that excels in information-dense environments like documentation and dashboards.
- **Technical/Labels:** Use **JetBrains Mono**. This is reserved for code blocks, file paths (e.g., `CLAUDE.md`), and UI labels that require a technical "terminal" feel. 
- **Hierarchy:** Ensure a clear distinction between the "Strategic" (Headlines) and "Operational" (Code/Labels) through the intentional switching of font families.

## Layout & Spacing

The layout follows a **Modular Grid** philosophy, reflecting the structured nature of machine logic. It uses a 12-column fixed-width grid for desktop (`1280px` max) and a fluid single-column layout for mobile.

- **Spacing Rhythm:** Based on a 4px baseline. Use `stack-md` (16px) for standard gaps between elements and `stack-lg` (32px) to separate major content sections.
- **Modular Blocks:** Components should be treated as self-contained modules that can be rearranged without breaking the visual logic. 
- **Responsive Behavior:** 
  - **Desktop:** Wide gutters (24px) and ample side margins (40px) to provide "white space" that emphasizes clarity.
  - **Mobile:** Margins reduce to 16px, and typography scales down (e.g., `headline-xl` becomes `headline-lg`) to maintain readability on smaller viewports.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** rather than shadows. In a developer-centric UI, depth should feel like "nested containers" in a code structure.

- **Base Layer:** Background (`#020617`).
- **Surface Layer:** Containers, cards, and sidebars use a slightly lighter slate (`#0F172A`).
- **Accent Layer:** Borders and dividers use `#1E293B`. These should be crisp, 1px lines that define edges with mathematical precision.
- **Interaction:** Hover states are signaled by subtle background color shifts or the appearance of a 1px border in `AI Indigo`.
- **Glassmorphism:** Reserved exclusively for high-level overlays (modals or dropdowns), using a very subtle background blur (8px) and a semi-transparent border to maintain focus on the content underneath.

## Shapes

The shape language is **Soft (0.25rem)**. This provides just enough approachable warmth to prevent the UI from feeling "cold" or "brutalist," while maintaining the efficiency of a structured grid.

- **Base Radius:** 4px (0.25rem) for inputs, buttons, and small components.
- **Large Radius:** 8px (0.5rem) for cards and main content modules.
- **Exceptions:** Use 0px (sharp) for vertical accent lines (like the blockquote marker) to emphasize the "stark" documentation roots.

## Components

- **Buttons:** Primary buttons use a solid `AI Indigo` background with white text. Secondary buttons are "ghost" style with a 1px `slate-800` border, switching to `Logic Lime` on hover to signal tactical readiness.
- **Input Fields:** Dark backgrounds (`#020617`) with subtle 1px borders. The focus state must be a high-contrast 2px border in `AI Indigo`. Labels should use `JetBrains Mono` in all-caps at 12px.
- **Cards:** Flat surfaces with `#0F172A` background and a `#1E293B` 1px border. No shadows. Use for grouping related tactical data.
- **Chips/Badges:** Use for status or tags. Backgrounds should be low-opacity versions of the status color (e.g., 10% Logic Lime) with a high-contrast border and text.
- **Code Blocks:** A distinct surface color (`#020617`) with a left-hand accent border in `Logic Lime`. Always use `JetBrains Mono`.
- **Lists:** Bullet points should be custom geometric markers (small squares or arrows) instead of standard circles, reinforcing the technical aesthetic.
- **Blockquotes:** Use a 4px solid vertical stroke in `AI Indigo` to the left of the text, mirroring the "Search Results" reference style.