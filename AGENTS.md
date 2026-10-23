<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All site content lives in typed files under src/data/; pages read from there so copy can change without touching layout.
- Detail pages use trailing-underscore route files (e.g. properties_.$slug.tsx) so they render as standalone pages, not inside the list page.
- Navbar, footer and floating WhatsApp button are rendered once in src/routes/__root.tsx.

- Remaining content pages consume typed src/data/pages.ts and service/post datasets; keep new copy outside presentation files to preserve editable content.
- Enquiries use the shared client-only WhatsApp form; do not persist form submissions or imply a request was sent before the visitor sends it.
- ConsentProvider controls Google Maps and YouTube embeds across the shared shell; load third-party embeds only after optional-embed consent.
- Financial and document visibility is gated by the public policy module in all public property views so display exclusions stay consistent.
- Use native TanStack route head metadata, not react-helmet-async, to preserve SSR and route-specific social metadata.
