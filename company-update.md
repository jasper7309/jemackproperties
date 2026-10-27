# Company content update for the Jemack Properties site

## How to work on this task

Read `AGENTS.md` first and follow it. Then implement every section below in order.

- Do NOT redesign anything. Do not change colours, layout, forms, WhatsApp behaviour or the property listings.
- Only add or replace content using the data in this file. Content lives in `src/data/`.
- Do not invent any facts beyond this text. No placeholder text. No naira amounts or financial figures.
- Where an item says HIDDEN, create the data and the component, but do not render it until its flag is set to `true`.
- Work one section at a time. After each section, make sure the project still builds.
- At the end, run the checks in the final section and the existing tests.

---

## 1. Company facts (use across About, Home, Footer and structured data)

- Legal name: Jemack Facilities and Engineering Services Limited. CAC registered, RC 746583, incorporated 12 May 2008. Established in Lagos in 2008.
- Full-service general contractor providing engineering services to the telecommunications, banking, oil and gas, and building and energy sectors in Nigeria, with an interest to expand to other West African countries. Do NOT say it currently operates across West Africa.
- Offices: Lagos (head office), Asaba, Umuahia. Keep the three real addresses already set in the data. Staff: over 20 people (management team, professional staff and field workers).
- Approach: cost-saving end-to-end (E2E) technical support and project delivery. Safe, cost-effective, aesthetically delivered projects, close interface with clients, fast delivery and quick response to issues. Capacity to execute large projects, shown by projects delivered in telecoms, oil and gas, and banking and pensions.
- Jemack Properties is the real estate arm: land and homes backed by the engineering team that can survey, develop and build on it.

---

## 2. About page

1. Keep the headline "Building in Nigeria since 2008". Replace the story text with:
   > Jemack Facilities and Engineering Services Limited is a full-service general contractor providing engineering services to the telecommunications, banking, oil and gas, and building and energy sectors in Nigeria. Established in Lagos in 2008, we deliver end-to-end technical support and project delivery that is safe, cost-effective and aesthetically pleasing, with close client contact, fast delivery and quick response. Jemack Properties is our real estate arm, connecting people with land and homes backed by the same engineering team.

2. Vision: "To be among the top providers of quality, cost-effective end-to-end engineering and property solutions, through innovation, in Nigeria and West Africa."
   Mission: "To conscientiously deliver our service with the professionalism, integrity and enthusiasm that earns the lifetime loyalty of our customers and business partners, the confidence of our shareholders and the respect and recognition of our employees and community."

3. Replace the Core values section with five success-pillar cards:
   - **Reputation and expertise:** a reputable firm in Nigeria with expertise in commercial and infrastructural project management.
   - **Proven delivery:** ability to take on large, complex projects and complete them on time, on budget and to top quality.
   - **Our values:** energetic enthusiasm, sensitivity to the needs of customers, willingness to accept total responsibility.
   - **Quality of staff:** a local team of over 20 people, including experienced professionals, managers and field workers, all focused on excellent service delivery.
   - **Safety, health and environment:** a commitment to strong safety, health and environmental policies.

4. Add a "How we are organised" block:
   - Division 1: Telecommunication engineering and cell-site maintenance; Building and road construction.
   - Division 2: Supply and procurement services; Contract supervision and management.
   - Division 3: Facilities management; Foundation works and soil stabilisation.
   - Across all divisions: Project management.

5. Credentials row: show only "CAC registered, RC 746583" now. Create data flags `coren: { verified: false }` and `iso9001: { verified: false }` and render those badges only when true. When shown, the COREN badge must read "Led by a COREN-registered engineer", not "COREN certified".

6. Leadership section: create the data below but set `leadershipApproved = false` so the section stays HIDDEN until I flip it. Remove any placeholder cards.
   - **Engr. Ephraim Ahamefula Kwakauzor**, Managing Director / Chairman. B.Eng, MSc, MNSE, COREN, Member NIStructE. Over 17 years in construction, project management, power support, facilities management and telecoms engineering. Career includes Ashaka Cement Plc, Alpha Consortium (formerly VMobile Nigeria), Ericsson Nigeria, and country head of facilities management at Stanbic IBTC Bank before founding Jemack.
   - **Engr. Emmanuel Abia**, Executive Director. HND, B.Eng, MSc, MNSE, COREN. Over 17 years in building design, project implementation and construction management across Nigeria, Senegal and Ghana. Formerly senior project manager at Huawei Technologies and project manager on the Main One optic fibre project.
   - **Mrs Chiamaka Ahamefula**, HR and Administration; founding member. B.Eng Electrical/Electronics. Experience across business development, financial management and power systems engineering.
   - **Stanley Ekere**, Operations Manager (power and PHCN projects). Over 15 years in power projects including rural electrification and transformer installations (50 kVA to 1,000 kVA).
   - **Oyeyode Joshua Akinrinade**, Power Specialist. B.Eng Electrical. ATS/AMF panels, diesel generator installation, rectifiers.
   - **Orji Jonah**, Operations Engineer. B.Eng Chemical. Project implementation, facilities management, procurement and logistics.
   - **Air-conditioning and electrical specialists (Jamui Hakeem and Tobias Ibekwe):** over 23 years in cooling systems: industrial, Uniflair, split, packaged and window units.

---

## 3. Services page and the six service pages

Expand each service with a one-paragraph intro, a "What we do" checklist (the full list below), and an objective line where one is given. Keep the existing six cards and slugs. Replace any thin descriptions with the content below.

### 3.1 Building and Construction
Tagline: "Timely delivery of building projects with seasoned professionals to customer satisfaction."

What we do:
- Design, construction and maintenance of all types of buildings and structures: recreational (stadiums, large halls, auditoriums), industrial (factories, commercial offices), residential (private homes, multi-storey flats)
- Building permits
- Bill of engineering estimation
- Supply of construction materials: paving stones, fresh concrete, sandcrete blocks, reinforcing rods
- Site management, project monitoring and control
- On-site construction supervision
- Handover and project close-out

### 3.2 Highways and Civil Works
What we do:
- Highway engineering: trunk A, B and C roads, minor road works, rehabilitation and maintenance
- Planning of highways within and between cities
- Design and construction of highways and highway structures
- Bridges and viaducts
- Sub-drains
- Ring and box culverts
- Mini bridges
- Earthworks
- Stone base
- Asphaltic concrete works
- All kinds of drainage
- Stone pitching and retaining walls
- Soil stabilisation for highways

### 3.3 Water Supply Engineering
What we do:
- Planning of water supply schemes for towns, cities and districts
- Pipeline design and installation
- Pressure testing and pipeline maintenance
- Borehole construction (different depths, industrial and residential)
- Overhead, ground-level and underground reservoirs
- Water treatment plants (filter beds, intake chambers, sedimentation tanks)
- Clear-water tanks in headworks and service reservoirs

### 3.4 Oil and Gas
What we do:
- Planning and design of oil and gas terminals
- Construction of oil tank farm facilities
- Design of offshore structures
- Design of pressure vessels and gas pipelines
- Foundation works
- Truck park design and construction
- Sand filling and earth improvement
- Civil works (drainage, pipe supports, manholes)
- Shoreline protection
- General procurement and construction

Objective: "Safe project delivery. Zero tolerance to quality issues."

### 3.5 Facilities Management
What we do:
- Facilities management
- Building alteration, renovation and structural repairs
- Electrical supplies and repairs
- Fumigation of offices and residential quarters
- Plumbing
- Wall screeding, POP installation and painting
- Safety and environment
- Civil works
- Cleaning services
- Furniture works
- Interior decoration
- Air-conditioning installation and repair
- Power support (generators, ATS/AMF panels, rectifiers, transformers)

Objective: "Whatever your needs are, we provide professional support. Zero tolerance to quality issues."

### 3.6 Telecoms Engineering
What we do:
- Civil works from tower foundation to tower erection
- Shelter installation and reticulation
- Power solutions (hybrid, solar, diesel generator installation and commissioning)
- Steel palisade fence supply and installation
- Diesel tank installation
- Pre-installation planning and audit
- Microwave link design and installation
- BTS radio equipment installation and commissioning
- RF/MW antenna and dish mounting with feeder installation and RF sweep testing
- BTS and BSC/RNC integration

Objective: "The highest level of quality expertise and professionalism at every stage of the project."

### 3.7 Also offered (Services page only, no separate pages)
- Supply and procurement services
- Logistics and warehouse management
- Scheduling, estimating and tender documents
- Project and programme management
- Construction and contract supervision
- Consultancy services
- Foundation works and soil stabilisation

### 3.8 Call to action on each service page
End each service page with a CTA "Request a quote on WhatsApp" (message prefilled with the service name) and a "Related project" line only where one exists in section 5.

---

## 4. Clients ("Organisations we have served")

Add a section on Home (below "Why Jemack") and on About, as text names in a clean responsive grid. No logos and no "partners" wording, because logo permission is not confirmed. Add a flag `clientNamesApproved = true` in `src/data`.

Heading: "Trusted by banks, pension managers, energy and property companies".

Names:
- PAL Pensions
- Pinnacle Oil and Gas Limited
- Zylus Homes and Property
- Stanbic IBTC Bank
- Stanbic IBTC Pension Managers
- Eko Electricity Distribution Plc (EKEDC)
- ATC Nigeria
- 9PSB (9 Payment Service Bank)
- Interkel Nigeria Limited
- GTEXT Homes
- Leadway Assurance Company Limited

Add an optional `logo` field per client (undefined for now). Render a logo only when it exists.

Do NOT list as clients or partners: Huawei, Ericsson, MTN, Zain, Main One, or any other organisation from the team biographies.

---

## 5. Projects page

Re-enable the `/projects` route in the navbar and footer. Replace the placeholder concept projects with these four real ones. Each is a card with title, type, location where known, and a neutral tile with a type icon and the text "Photos coming soon on request" (optional `image` field for later). No dates, values or sizes.

1. **Project management contract: Pinnacle Tank Farm, Lekki Free Trade Zone.** Type: Oil and gas, project management. Client: Pinnacle Oil and Gas Limited.
2. **Remodelling of PAL Pensions Regional Office, Maryland, Lagos.** Type: Facilities and building renovation. Client: PAL Pensions.
3. **Roadwork: Agungbuji-Ogbete Road, Enugu (4 km section of 21.7 km).** Type: Highway construction. Client not named: do not show a client line.
4. **Lekki Avana Phase II luxury bungalow resort, Elerangbe.** Type: Residential building construction. Client: Zylus Properties Ltd.

Rules:
- Show the client line only when `clientNamesApproved` is true.
- Add a short intro: "Selected projects delivered by Jemack's engineering team."
- Add a "Discuss a similar project on WhatsApp" button on each card.
- Link each service page's "Related project" line to the matching card: Oil and Gas to project 1, Facilities Management to project 2, Highways and Civil Works to project 3, Building and Construction to project 4.

---

## 6. Home page additions

1. **"Backed by a full engineering company" cards:** replace the short blurbs with these one-line summaries.
   - Building and Construction: "Residential, commercial, industrial and recreational buildings, from permits and estimates to supervision and handover."
   - Highways and Civil Works: "Roads, bridges, culverts, drainage and soil stabilisation, designed and built to last."
   - Water Supply Engineering: "Boreholes, pipelines, reservoirs and treatment plants for homes, estates and industry."
   - Oil and Gas: "Civil, foundation and construction support for terminals, tank farms and energy infrastructure."
   - Facilities Management: "Maintenance, renovation, repairs, cleaning, interiors and power support for offices, branches and homes."
   - Telecoms Engineering: "Tower civil works, shelters, power solutions, and radio and microwave installation."

2. **"Why Jemack" cards:** replace the five generic cards with the five pillars from section 2.3, using short titles: Expertise, Proven delivery, Our values, Experienced team, Safety first.

3. **Stats band:** keep "Serving since 2008" and the three offices. Add "20+ team members" and "6 service lines".

---

## 7. Footer, Contact and SEO

1. Footer "Services" column links to the six service pages. Footer tagline: "The real estate arm of Jemack Facilities & Engineering Services Ltd (RC 746583). Secure titles, serviced estates and homes built with engineering precision."
2. Update `organizationSchema`: `legalName`, `foundingDate` 2008, `areaServed` Nigeria, and a `hasOfferCatalog` listing the six services by name.
3. Add meta descriptions (150 to 160 characters each) for the Services page, each service page, the Projects page and the About page, using the text above.

---

## 8. Final checks (run before finishing)

- No new text contains "PLACEHOLDER", "coming soon" (except the exact tile text "Photos coming soon on request"), or any naira figure.
- Search the code: the word "partner" appears only in "Partner listing" labels, never next to the client names. No logos from the profile are displayed.
- Leadership, COREN and ISO items are hidden until their flags are true. CAC RC 746583 is visible.
- Every service page shows its full "What we do" list. The Services page shows the "Also offered" strip.
- Layout is unchanged. Check Services, a service page, About, Projects and Home at 360, 768 and 1280px: no horizontal scroll and all tap targets at least 44px.
- The build succeeds and the existing tests pass.
