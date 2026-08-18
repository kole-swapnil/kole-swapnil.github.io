/**
 * Selected work.
 *
 * Adding a project is one object appended to the array below. Nothing else
 * needs to change — the grid, the detail panel and the sitemap all read
 * from here.
 *
 * Writing rule: make the platform engineering visible. A reader skimming
 * only the `stack` tags on these projects would conclude the work is nothing
 * but smart contracts. Each `description` should show the React app, the API,
 * the cloud infrastructure and the integrations — the chain is a component of
 * these systems, not the whole of them. This is what makes the general
 * packages above credible.
 */

export interface ProjectLinks {
  /** Live production URL. */
  live?: string
  /** Public repository. */
  github?: string
  /** Long-form write-up, usually an article on this site. */
  caseStudy?: string
}

export interface Project {
  /**
   * URL-safe slug. Used as the React key, the image filename and the
   * `projectSlug` reference from testimonials. Never change one in place —
   * it will silently break a testimonial link.
   */
  slug: string
  /** Project name as it should be displayed. */
  title: string
  /**
   * One sentence, ~95 chars max — it truncates to two lines in the card.
   * This is the line most visitors will read; make it say what the thing is.
   */
  summary: string
  /**
   * 2–4 sentences. Shown when the card is expanded. This is where the full
   * engineering scope goes: front end, API, infrastructure, integrations.
   */
  description: string
  /**
   * Who it was built for. Shown as an eyebrow above the title, so keep it
   * short and recognisable — "Govt. of Odisha", not the full department name.
   * ~34 chars max.
   */
  client: string
  /** Optional longer client attribution, shown in the expanded view. */
  clientDetail?: string
  /** Year or range, e.g. "2023" or "2020–2025". Shown as metadata. */
  period?: string
  /**
   * Technologies. 3–6 entries — beyond six the row wraps awkwardly and the
   * tags stop being scannable. Order them front end → backend → infra → chain
   * so the general engineering reads first.
   */
  stack: string[]
  /**
   * Optional screenshot at `public/images/projects/<slug>.jpg`.
   * 16:10 landscape, 1600×1000 recommended.
   * When absent the card degrades to a typographic treatment by design —
   * that path is built and tested, so shipping without an image is fine.
   */
  image?: string
  /** Alt text. Required whenever `image` is set. Describe the screen. */
  imageAlt?: string
  /** Optional extra screenshots, same aspect ratio as `image`. */
  gallery?: string[]
  links?: ProjectLinks
  /**
   * Short outcome strings shown in the expanded view. ≤ 40 chars each,
   * 2–3 entries. Optional — omit rather than inventing one.
   */
  outcomes?: string[]
}

export const projects: Project[] = [
  {
    slug: 'land-record-management',
    title: 'Decentralized Land Record Management',
    client: 'Govt. of Odisha',
    clientDetail:
      'Department of Science and Technology, Government of Odisha — delivered as Technical Blockchain Assistant at IIIT Bhubaneswar',
    summary:
      'A land ownership registry for a state government, where every transfer is traceable end to end.',
    description:
      'Land ownership in India is recorded across registries that rarely agree with each other, and reconciling them is manual, slow and disputable. This system records ownership and transfer on an immutable ledger so the chain of title for a parcel can be traced rather than reconstructed. Delivered as a complete decentralized application: the interface officials use to register, search and verify parcels, the core algorithms the system runs on, and the Solidity contracts holding record state and enforcing the rules a transfer must satisfy — written, tested and deployed. The work was published as a peer-reviewed conference paper.',
    stack: ['React', 'Solidity', 'Smart Contracts', 'Blockchain', 'dApp'],
    // TODO(content): real screenshot at 16:10 — see CONTENT-NEEDED.md
    image: '/images/projects/land-record-management.jpg',
    imageAlt:
      'The land record registry interface showing a parcel search and its verified ownership history',
    outcomes: ['Built for a state government', 'Auditable chain of title'],
  },
  {
    slug: 'getfi',
    title: 'GetFi',
    client: 'GetFi',
    clientDetail: 'GetFi — freelance engagement, under NDA',
    period: '2025',
    summary:
      'A Telegram mini-app store with gamified rewards and a conversational AI product recommender.',
    description:
      'A commerce product that lives entirely inside Telegram: users earn gamified rewards, browse and buy without leaving the chat. The part that made it work is an AI recommendation engine built as a “ChatGPT for shopping” — a conversational front end that reads intent from ordinary questions and surfaces matching products in real time against the Amazon catalogue API. I built the whole thing end to end: the mini-app front end, the backend services behind it, and the recommendation system itself.',
    stack: ['Telegram Mini App', 'AI / LLM', 'Amazon API', 'Node.js', 'Full-stack'],
    outcomes: ['Conversational product discovery', 'Delivered solo, end to end'],
  },
  {
    slug: 'superworld-map',
    title: 'SuperWorld Map',
    client: 'SuperWorld',
    clientDetail: 'SuperWorld, California, USA',
    period: '2020–2025',
    summary:
      'A map-based marketplace where every plot of virtual land is an NFT traded on Polygon.',
    description:
      'A virtual real estate platform covering the whole globe, where each plot is an NFT that can be bought, sold and traded. The front end renders a tiled world map with search, ownership overlays and a bidding flow; a Node and Express API over MongoDB handles listings, offers, accounts and notifications; and Web3.js binds the application to the marketplace contracts on Polygon. I also built the payment gateway and third-party integrations so buyers who had never held crypto could complete a purchase, and led the team of five engineers who built and maintained it.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Web3.js', 'Solidity', 'Polygon'],
    // TODO(content): real screenshot at 16:10 — see CONTENT-NEEDED.md
    image: '/images/projects/superworld-map.jpg',
    imageAlt:
      'The SuperWorld map interface with virtual land plots overlaid on a world map and a listing panel',
    outcomes: ['Led a team of 5 engineers', 'Fiat on-ramp for non-crypto buyers'],
  },
  {
    slug: 'domx',
    title: 'DOMX',
    client: 'Bridgetower Capital',
    clientDetail: 'Bridgetower Capital',
    period: '2025–present',
    summary:
      'A phygital NFT platform where investors buy asset-backed tokens with a card, not a wallet.',
    description:
      'A platform for purchasing NFTs backed by real physical assets. The entire backend runs on AWS serverless, defined as code with AWS CDK and Terraform so every environment is reproducible and nothing lives only in a console. The token layer is T-REX (ERC-3643), which enforces investor eligibility and transfer restrictions on-chain rather than in application code, shipped with deployment scripts and an automated test suite. I integrated the React front end with those backend services and designed the end-to-end system flows.',
    stack: ['React', 'AWS CDK', 'AWS Serverless', 'Terraform', 'Solidity', 'ERC-3643'],
    // TODO(content): real screenshot at 16:10 — see CONTENT-NEEDED.md
    image: '/images/projects/domx.jpg',
    imageAlt:
      'The DOMX purchase flow showing an asset-backed NFT listing and its compliance details',
    outcomes: ['Compliance enforced on-chain', 'Fully reproducible infrastructure'],
  },
  {
    slug: 'blockx-staking',
    title: 'BlockX Staking App',
    client: 'BlockX',
    clientDetail: 'BlockX, Singapore — freelance engagement, under NDA',
    period: '2024–2025',
    summary:
      'A staking dApp on the BlockX chain, with custom contracts and a React front end.',
    description:
      'Staking infrastructure for the BlockX chain. I designed and wrote the staking contracts — deposit, lock, reward accrual and withdrawal — then tested and deployed them on-chain. On top of that sits a React application that reads live position state and lets holders stake and unstake without touching a block explorer.',
    stack: ['React', 'Solidity', 'Smart Contracts', 'BlockX Chain'],
  },
  {
    slug: 'superworld-nft-salon',
    title: 'SuperWorld NFT Salon',
    client: 'SuperWorld',
    period: '2022–2025',
    summary:
      'A crypto and NFT marketplace where creators and collectors list, buy and sell work.',
    description:
      'The marketplace side of SuperWorld, separate from the land map: creators mint and list work, collectors browse and buy. Built on the same MERN foundation, with Web3.js binding the listing and settlement flows to the marketplace contracts.',
    stack: ['React', 'Node.js', 'MongoDB', 'Web3.js', 'Solidity'],
  },
  {
    slug: 'certichain',
    title: 'Certichain',
    client: 'Independent',
    period: '2022',
    summary:
      'Certificate verification that makes a forged document detectable rather than plausible.',
    description:
      'An anti-forgery system for certificates. The document itself is stored on IPFS and its hash is anchored on-chain, so anyone holding a certificate can verify it against the issuer\'s record instead of trusting the paper. Built as a decentralized database with the verification contracts and an issuer-facing front end.',
    stack: ['React', 'Solidity', 'IPFS', 'Blockchain'],
  },
  {
    slug: 'distributed-doctor',
    title: 'Distributed Doctor',
    client: 'B.Tech major project',
    clientDetail: 'IIIT Bhubaneswar — final year major project',
    period: '2022',
    summary:
      'Health records held by patients rather than hospitals, with time-bound access for clinicians.',
    description:
      'Medical records normally sit in whichever hospital system created them, which makes them hard to move and easy to lose. This system distributes them across a permissioned blockchain and inverts custody: the patient holds the keys and grants clinicians time-bound access to specific records. Built as a complete application — a React front end for both patients and doctors, an API layer for record indexing and retrieval, and Solidity contracts governing the access grants and their expiry.',
    stack: ['React', 'Node.js', 'Solidity', 'Blockchain'],
    outcomes: ['Patient-held record custody'],
  },
  {
    slug: 'process-lineage',
    title: 'Process_Lineage',
    client: 'Dell Technologies',
    clientDetail: 'Built for the Dell Technologies hiring track',
    period: '2021',
    summary:
      'Supply chain traceability that records each manufacturing step as a verifiable on-chain event.',
    description:
      'A process lineage and control tool for supply chains. Each step in a manufacturing process is recorded as an event anchored on-chain, so a finished unit can be traced back through every component, handoff and quality check rather than trusting a spreadsheet. Built as a web dashboard for querying lineage, an ingest service that accepts process events from the factory floor, and the contracts that anchor and verify them.',
    stack: ['React', 'Node.js', 'Solidity', 'Blockchain'],
  },
]
