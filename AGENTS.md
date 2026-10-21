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
