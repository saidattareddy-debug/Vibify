# Sitewide Performance Optimization Design

## Goal

Improve PageSpeed and Lighthouse performance across the whole Vibify site without changing how the site looks.

This work must preserve:

- the current visual design
- the current typography choices
- the existing motion language
- the current page structure and content hierarchy

## Current State

The current frontend already includes some good performance work:

- route-level lazy loading for non-home routes
- lazy loading for the contact dialog
- lazy loading for the preloader
- deferred toaster mount
- deferred analytics script loading

However, PageSpeed still reports issues around:

- render-blocking requests
- document request latency pressure
- forced reflow
- LCP breakdown
- network dependency depth
- image delivery
- unused JavaScript
- long main-thread work
- non-composited animations
- cache lifetime opportunities

## Optimization Strategy

Use a delivery-first optimization strategy across the whole site.

This means improving:

1. font delivery
2. third-party script timing
3. static asset delivery
4. bundle loading behavior
5. render stability

This excludes any redesign or visible simplification of the UI.

## Optimization Areas

### 1. Font Delivery

Current font loading is initiated from third-party CSS in `frontend/public/index.html`.

Planned work:

- reduce render-blocking behavior from remote font CSS
- self-host the exact font files if practical
- keep the same font families and weights
- preserve swap-based loading behavior
- preload only the font files that are actually needed above the fold

Expected outcome:

- lower render-blocking cost
- improved first paint behavior
- no visible font change

### 2. Third-Party Scripts

The site already defers analytics, but more critical-path trimming may still be possible.

Planned work:

- keep third-party analytics out of the initial rendering budget
- move any remaining inline initialization work later where safe
- avoid running non-essential startup work before the first meaningful paint
- preserve analytics functionality

Expected outcome:

- less main-thread contention during startup
- better LCP/FCP without breaking tracking

### 3. Static Asset Delivery

Images and other assets should load more efficiently while staying visually identical.

Planned work:

- improve image delivery format and size handling
- ensure stable layout sizing for visual assets
- verify strong caching for built assets and images
- avoid production asset-path issues

Expected outcome:

- reduced transfer size
- lower CLS risk
- fewer redundant asset downloads

### 4. Bundle Loading

The initial page should include only the code needed for first render.

Planned work:

- audit what still lands in the initial homepage bundle
- push non-critical logic further behind route boundaries or interaction boundaries where safe
- preserve route SEO behavior and current navigation behavior
- keep existing lazy boundaries where they are already helping

Expected outcome:

- less unused JavaScript
- lower parse/execute cost
- improved startup performance across landing and other routes

### 5. Render Stability And Runtime Cost

Animations should remain visually the same while reducing layout work and jank.

Planned work:

- reduce forced reflow hotspots where possible
- prefer compositor-friendly behavior for existing motion
- keep animation timing and design language unchanged
- ensure hero and section transitions remain visually consistent

Expected outcome:

- smoother runtime behavior
- fewer forced layout penalties
- preserved visual identity

## Scope By Page

### Landing Page

Primary optimization target because it drives the PageSpeed audit and public entry experience.

Focus:

- font delivery
- hero startup cost
- analytics startup timing
- image delivery
- initial bundle trimming

### About Page

Focus:

- route bundle size
- section asset stability
- footer and shared asset behavior

### Service Pages

Focus:

- shared shell performance
- route-level data and component loading
- image/layout stability on showcase content

### Admin Page

Focus:

- keep lazy loading intact
- avoid unnecessary shared homepage code leaking into admin route

## Constraints

Must not:

- change the visible design direction
- swap to visibly different fonts
- remove animations as a shortcut
- restructure page layouts in a user-visible way
- degrade SEO metadata or route accessibility

Can:

- change delivery method
- change script timing
- change build/deployment behavior
- optimize asset generation and caching
- reorganize internal code loading

## Verification Plan

### Build Verification

- run production build successfully
- inspect output bundle sizes before and after
- verify production asset paths remain correct

### Functional Verification

- landing page loads correctly
- about page loads correctly
- service pages load correctly
- admin page loads correctly
- existing modal contact flow still works
- analytics still initialize after page load

### Performance Verification

- rerun PageSpeed/Lighthouse on mobile
- rerun PageSpeed/Lighthouse on desktop
- compare improvement in:
  - render-blocking requests
  - image delivery
  - unused JavaScript
  - main-thread work
  - layout shift

## Implementation Notes

- Prefer safe, measurable performance fixes first.
- Keep the design pixel-identical unless a change is fully invisible to normal users.
- If self-hosted fonts are introduced, ensure license-safe usage and only include necessary files.
- If deployment headers are needed for cache tuning, implement them in the current deployment configuration rather than changing visual code unnecessarily.

## Out Of Scope

- full redesign
- typography change
- animation removal
- backend architectural rewrite
- new product features unrelated to performance
- large-scale component rewrites unless necessary for performance preservation

## Approved Direction

- Optimize the whole site, not just the landing page.
- Do not change the way the site looks.
- Use delivery-first optimization as the primary strategy.
