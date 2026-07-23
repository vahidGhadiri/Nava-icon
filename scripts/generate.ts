import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const ASSETS_DIR = join(ROOT, "assets", "icons");
const PACKAGES_DIR = join(ROOT, "packages");

type IconMode = "regular" | "filled";

interface IconEntry {
  name: string;
  regular: string | null;
  filled: string | null;
}

interface SvgData {
  viewBox: string;
  inner: string;
  strokeBased: boolean;
}

// ─── Discovery ──────────────────────────────────────────────────────────────

function discoverIcons(): IconEntry[] {
  const regularDir = join(ASSETS_DIR, "regular");
  const filledDir = join(ASSETS_DIR, "filled");

  const regularFiles = existsSync(regularDir)
    ? readdirSync(regularDir).filter((f) => f.endsWith(".svg"))
    : [];
  const filledFiles = existsSync(filledDir)
    ? readdirSync(filledDir).filter((f) => f.endsWith(".svg"))
    : [];

  const iconMap = new Map<string, IconEntry>();

  for (const file of regularFiles) {
    const baseName = file.replace(/^bx-/, "").replace(/\.svg$/, "");
    const existing = iconMap.get(baseName);
    if (existing) {
      existing.regular = join(regularDir, file);
    } else {
      iconMap.set(baseName, { name: baseName, regular: join(regularDir, file), filled: null });
    }
  }

  for (const file of filledFiles) {
    const baseName = file.replace(/^bxs-/, "").replace(/\.svg$/, "");
    const existing = iconMap.get(baseName);
    if (existing) {
      existing.filled = join(filledDir, file);
    } else {
      iconMap.set(baseName, { name: baseName, regular: null, filled: join(filledDir, file) });
    }
  }

  return Array.from(iconMap.values());
}

// ─── SVG Analysis ───────────────────────────────────────────────────────────

function isStrokeBased(svgContent: string): boolean {
  const pathSection = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const paths = pathSection ? pathSection[1] : svgContent;
  const hasStrokeOnPath = /<path[^>]*stroke=/.test(paths);
  const hasFillNoneOnPath = /<path[^>]*fill="none"/.test(paths);
  return hasStrokeOnPath || hasFillNoneOnPath;
}

function stripHardcodedFill(inner: string): string {
  return inner
    .replace(/fill="black"/g, "")
    .replace(/fill="none"/g, "")
    .replace(/fill="white"/g, "")
    .replace(/fill="#000000"/g, "")
    .replace(/fill="#000"/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function parseSvg(svgContent: string): SvgData {
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";
  const innerMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const rawInner = innerMatch ? innerMatch[1] : "";
  const inner = stripHardcodedFill(rawInner);
  return { viewBox, inner, strokeBased: isStrokeBased(svgContent) };
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

// ─── React Generation ───────────────────────────────────────────────────────

function generateReactComponent(icon: IconEntry): string {
  const componentName = toPascalCase(icon.name) + "Icon";
  const regularSvg = icon.regular ? parseSvg(readFileSync(icon.regular, "utf-8")) : null;
  const filledSvg = icon.filled ? parseSvg(readFileSync(icon.filled, "utf-8")) : null;

  const defaultSvg = regularSvg || filledSvg;
  if (!defaultSvg) return "";

  const regularInner = regularSvg ? escapeTemplateLiteral(regularSvg.inner) : "";
  const filledInner = filledSvg ? escapeTemplateLiteral(filledSvg.inner) : "";
  const viewBox = defaultSvg.viewBox;
  const isRegularStrokeBased = regularSvg?.strokeBased ?? false;
  const isFilledStrokeBased = filledSvg?.strokeBased ?? false;

  return `import type { CSSProperties } from "react";

interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  title?: string;
  mode?: "regular" | "filled";
  className?: string;
  style?: CSSProperties;
}

const regularPaths = \`${regularInner}\`;
const filledPaths = \`${filledInner}\`;

export function ${componentName}(props: IconProps) {
  const {
    size = 24,
    color,
    strokeWidth,
    className,
    style,
    title,
    mode = "regular",
  } = props;

  const isFilled = mode === "filled" && filledPaths;
  const paths = isFilled ? filledPaths : regularPaths;
  const strokeBased = isFilled
    ? ${isFilledStrokeBased}
    : ${isRegularStrokeBased};

  const appliedColor = color ?? "currentColor";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      width={size}
      height={size}
      fill={strokeBased ? "none" : appliedColor}
      stroke={strokeBased ? appliedColor : "none"}
      strokeWidth={
        strokeWidth ?? (strokeBased ? 0.5 : undefined)
      }
      strokeLinecap={strokeBased ? "round" : undefined}
      strokeLinejoin={strokeBased ? "round" : undefined}
      className={className}
      style={style}
    >
      {title && <title>{title}</title>}
      <g dangerouslySetInnerHTML={{ __html: paths }} />
    </svg>
  );
}`}




// ─── Vue Generation ─────────────────────────────────────────────────────────

function generateVueComponent(icon: IconEntry): string {
  const componentName = toPascalCase(icon.name) + "Icon";
  const regularSvg = icon.regular ? parseSvg(readFileSync(icon.regular, "utf-8")) : null;
  const filledSvg = icon.filled ? parseSvg(readFileSync(icon.filled, "utf-8")) : null;

  const defaultSvg = regularSvg || filledSvg;
  if (!defaultSvg) return "";

  const regularInner = regularSvg ? escapeTemplateLiteral(regularSvg.inner) : "";
  const filledInner = filledSvg ? escapeTemplateLiteral(filledSvg.inner) : "";
  const viewBox = defaultSvg.viewBox;
  const isRegularStrokeBased = regularSvg?.strokeBased ?? false;
  const isFilledStrokeBased = filledSvg?.strokeBased ?? false;

  return `import { defineComponent, h, type PropType } from "vue";

const regularPaths = \`${regularInner}\`;
const filledPaths = \`${filledInner}\`;

export const ${componentName} = defineComponent({
  name: "${componentName}",
  props: {
    size: { type: [Number, String] as PropType<number | string>, default: 24 },
    color: { type: String, default: "currentColor" },
    strokeWidth: { type: [Number, String] as PropType<number | string>, default: 0.5 },
    className: { type: String },
    style: { type: Object as PropType<Record<string, string | number>> },
    title: { type: String },
    mode: { type: String as PropType<"regular" | "filled">, default: "regular" },
  },
  setup(props) {
    return () => {
      const isFilled = props.mode === "filled" && filledPaths;
      const paths = isFilled ? filledPaths : regularPaths;
      const strokeBased = isFilled ? ${isFilledStrokeBased} : ${isRegularStrokeBased};
      const appliedColor = props.color || "currentColor";

      return h(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "${viewBox}",
          width: props.size,
          height: props.size,
          fill: strokeBased ? "none" : appliedColor,
          stroke: strokeBased ? appliedColor : "none",
          "stroke-width": props.strokeWidth,
          "stroke-linecap": strokeBased ? "round" : undefined,
          "stroke-linejoin": strokeBased ? "round" : undefined,
          class: props.className,
          style: props.style,
          innerHTML: paths,
        },
        [props.title ? h("title", props.title) : null]
      );
    };
  },
});
`;
}

// ─── Angular Generation ─────────────────────────────────────────────────────

function generateAngularComponent(icon: IconEntry): string {
  const componentName = toPascalCase(icon.name) + "Icon";
  const regularSvg = icon.regular ? parseSvg(readFileSync(icon.regular, "utf-8")) : null;
  const filledSvg = icon.filled ? parseSvg(readFileSync(icon.filled, "utf-8")) : null;

  const defaultSvg = regularSvg || filledSvg;
  if (!defaultSvg) return "";

  const regularInner = regularSvg ? escapeTemplateLiteral(regularSvg.inner) : "";
  const filledInner = filledSvg ? escapeTemplateLiteral(filledSvg.inner) : "";
  const viewBox = defaultSvg.viewBox;
  const isRegularStrokeBased = regularSvg?.strokeBased ?? false;
  const isFilledStrokeBased = filledSvg?.strokeBased ?? false;

  const selector = "icon-" + icon.name;

  return `import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "${selector}",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="${viewBox}"
      [attr.width]="size"
      [attr.height]="size"
      [attr.fill]="isStrokeBased ? 'none' : color"
      [attr.stroke]="isStrokeBased ? color : 'none'"
      [attr.stroke-width]="isStrokeBased ? strokeWidth : undefined"
      [attr.stroke-linecap]="isStrokeBased ? 'round' : undefined"
      [attr.stroke-linejoin]="isStrokeBased ? 'round' : undefined"
    >
      <ng-container [ngSwitch]="mode">
        <g *ngSwitchCase="'filled'" [innerHTML]="'${filledInner}'"></g>
        <g *ngSwitchDefault [innerHTML]="'${regularInner}'"></g>
      </ng-container>
    </svg>
  \`,
})
export class ${componentName}Component {
  @Input() size: number | string = 24;
  @Input() color: string = "currentColor";
  @Input() strokeWidth: number | string = 0.5;
  @Input() title: string | null = null;
  @Input() mode: "regular" | "filled" = "regular";

  get isFilled(): boolean {
    return this.mode === "filled";
  }

  get isStrokeBased(): boolean {
    return this.isFilled ? ${isFilledStrokeBased} : ${isRegularStrokeBased};
  }
}
`;
}

// ─── Web Component Generation ───────────────────────────────────────────────

function generateWebComponent(icon: IconEntry): string {
  const componentName = toPascalCase(icon.name);
  const regularSvg = icon.regular ? parseSvg(readFileSync(icon.regular, "utf-8")) : null;
  const filledSvg = icon.filled ? parseSvg(readFileSync(icon.filled, "utf-8")) : null;

  const defaultSvg = regularSvg || filledSvg;
  if (!defaultSvg) return "";

  const regularInner = regularSvg ? escapeTemplateLiteral(regularSvg.inner) : "";
  const filledInner = filledSvg ? escapeTemplateLiteral(filledSvg.inner) : "";
  const viewBox = defaultSvg.viewBox;
  const isRegularStrokeBased = regularSvg?.strokeBased ?? false;
  const isFilledStrokeBased = filledSvg?.strokeBased ?? false;

  const tagName = "icon-" + icon.name;

  return `class NavaIcon${componentName} extends HTMLElement {
  static get observedAttributes() {
    return ["size", "color", "stroke-width", "mode"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const size = this.getAttribute("size") || "24";
    const color = this.getAttribute("color") || "currentColor";
    const strokeWidth = this.getAttribute("stroke-width") || "0.5";
    const mode = this.getAttribute("mode") || "regular";
    const isFilled = mode === "filled";

    const regularPaths = \`${regularInner}\`;
    const filledPaths = \`${filledInner}\`;
    const paths = isFilled && filledPaths ? filledPaths : regularPaths;
    const strokeBased = isFilled ? ${isFilledStrokeBased} : ${isRegularStrokeBased};

    this.shadowRoot!.innerHTML = \`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${viewBox}"
        width="\${size}"
        height="\${size}"
        fill="\${strokeBased ? "none" : color}"
        stroke="\${strokeBased ? color : "none"}"
        stroke-width="\${strokeBased ? strokeWidth : ""}"
        \${strokeBased ? 'stroke-linecap="round"' : ""}
        \${strokeBased ? 'stroke-linejoin="round"' : ""}
      >
        \${paths}
      </svg>
    \`;
  }
}

if (!customElements.get("${tagName}")) {
  customElements.define("${tagName}", NavaIcon${componentName});
}
`;
}

// ─── Categories ─────────────────────────────────────────────────────────────

function getCategory(iconName: string): string {
  const name = iconName.toLowerCase();

  if (/^(arrow|chevron|caret|direction|left-|right-|up-|down-|navigate|skip-|first-page|last-page|back|forward|horizontal|vertical|subdirectory|to-top|expand|collapse|eject|exit|enter|log-in|log-out)/.test(name)) return "arrows";
  if (/^(align|border|grid|layout|list|menu|sidebar|toggle|checkbox|radio|select|dock|column|row|tab|panel|drag|drop|resize|move|order|swap|transfer|merge|split|unite|intersect|exclude|rotate|refresh|reset|redo|undo|repeat|sync|reload|block|copy|paste|cut|duplicate|clone|link|unlink|attach|detach|dots|sort|sort-a-z|sort-z-a|sort-alt|sort-down|sort-up|plus|minus|x-circle|x-square|check|check-circle|check-double|check-square|add-to-queue|minus-circle|minus-square|plus-circle|plus-square|minus-back|minus-front|plus-medical|no-signal|power-off|battery|battery-charging|battery-full|battery-low|wifi|wifi-0|wifi-1|wifi-2|wifi-off|bluetooth|signal|scan|search|search-alt|search-alt-2|zoom-in|zoom-out|refresh|rename|detail|collection|objects-horizontal|objects-vertical|adjust|adjust-alt|braille|cog|dialpad|dialpad-alt|downvote|upvote|filter|filter-alt|flag|flag-alt|flag-checkered|fullscreen|hide|infinite|loader|loader-alt|loader-circle|recycle|reflect-horizontal|reflect-vertical|repost|rfid|shuffle|slider|slider-alt|target-lock|task|task-x|trash|trash-alt|trim|upside-down|widget|x|reflection)/.test(name)) return "interface";
  if (/^(file|folder|archive|clipboard|save|download|upload|export|import|print|document|note|notepad|spreadsheet|book|bookmark|page|paper|receipt|library|news|paragraph|heading|quote|quote-alt|quote-left|quote-right|quote-single|certification)/.test(name)) return "files";
  if (/^(message|comment|chat|envelope|mail|bell|phone|call|inbox|notification|send|share|reply|forward|broadcast|volume|microphone|headphone|speaker|radio|rss|podcast|link|at|conversation|megaphone|tune|captions|alarm|bell-minus|bell-plus|bell-ring|bell-off|voicemail)/.test(name)) return "communication";
  if (/^(image|video|camera|music|film|movie|play|pause|stop|skip|rewind|fast-forward|record|slideshow|photo|gallery|palette|brush|paint|draw|crop|edit|pen|pencil|eraser|font|text|bold|italic|underline|strikethrough|highlight|color|droplet|eyedropper|spray-can|wand|album|cast|microchip|disc|note|lyrics|tv|desktop|laptop|mobile|tablet|device|monitor|screen|display|aperture|photograph|film|clapperboard|video|webcam|camera-home|camera-movie|camera-off|camera-plus)/.test(name)) return "media";
  if (/^(bar-chart|pie-chart|line-chart|scatter-chart|doughnut-chart|chart|graph|stats|data|equalizer|trending|analytics|report|network-chart|signal|analyse|area|measure|calculate|spreadsheet|database|table|index|catalog|directory|register|record|log|tachometer|dashboard|gauge|meter|poll|survey|questionnaire|census|assessment|evaluation|review|audit|inspection|examination|analysis|research|study|investigation|experiment|test|trial|sample|survey|poll|questionnaire)/.test(name)) return "data";
  if (/^(cloud|sun|moon|rain|snow|wind|weather|storm|thunder|lightning|temperature|thermometer|droplet|umbrella|flame|fire|smoke|fog|haze|rainbow)/.test(name)) return "weather";
  if (/^(car|bus|train|plane|truck|taxi|bicycle|cycling|walk|run|swim|navigation|compass|map|pin|location|directions|traffic|road|fuel|gas|ev-station|parking|metro|subway|helicopter|boat|ship|ferry|yacht|sail|anchor|raft|kayak|canoe|surf|skate|ski|cable-car|gondola|cable|lift|current-location|street-view|trip|travel|compass|directions|route|journey|destination|waypoint)/.test(name)) return "transport";
  if (/^(cart|shopping|purchase|tag|price|dollar|money|credit-card|wallet|coin|coupon|discount|offer|sale|store|bag|basket|receipt|barcode|qr|payment|bitcoin|ruble|rupee|euro|yen|won|lira|pound|badge|shop|market|bazaar|invoice|bill|cost|fee|charge|tax|donate|donate-blood|donate-heart|shekel)/.test(name)) return "shopping";
  if (/^(lock|unlock|shield|key|password|security|check-shield|no-entry|access|keyhole|safe|vault|guard|protect|defend|encrypt|cctv|fingerprint)/.test(name)) return "security";
  if (/^(health|medical|heart|pill|hospital|ambulance|syringe|dna|virus|vaccination|clinic|doctor|nurse|pulse|band-aid|first-aid|brain|body|bone|tooth|eye|ear|mask|test-tube|radiation|vial|flask|handicap|universal-access|capsule|injection|low-vision|water|droplet|droplet-half)/.test(name)) return "medical";
  if (/^(circle|square|triangle|rectangle|polygon|cube|cuboid|diamond|sphere|cylinder|pyramid|prism|star|cross|ring|shape|outline|layer|vector|yin-yang)/.test(name)) return "shapes";
  if (/^(code|terminal|bug|database|server|git|component|extension|plug|api|bracket|hash|command|code-block|code-alt|code-curly|sitemap|chip|hdd|memory-card|usb|device|hardware|invader)/.test(name)) return "code";
  if (/^(time|clock|timer|stopwatch|alarm|hourglass|schedule|calendar|date|day|month|year|history|revision|trend|past|present|future|deadline|duration|interval|period|frequency|rate|pace|speed|velocity|tempo|rhythm|cycle|rotation|revolution|orbit|spin|twist|turn)/.test(name)) return "time";
  if (/^(user|account|person|people|group|friend|family|male|female|child|baby|baby-carriage|id-card|badge|crown|royal|hand|like|dislike|happy|sad|angry|surprised|confused|sleepy|cool|face|emotion|emoji|smile|laugh|meh|dizzy|hot|cold|tired|shocked|wink|tongue|heart-eyes|beaming|ghost|skull|skull-crossbones|t-shirt|briefcase|contact|graduation|spa|hand|fist|thumb|palm|point|wave|clap|snap|hold|grip|pinch|squeeze|stroke|rub|pat|tap|knock|scratch|bite|kiss|lick|blow|whistle|scream|shout|whisper|mumble|stutter|stammer|groan|moan|sigh|yawn|sneeze|cough|hiccup|burp|fart|poo|pee|sweat|bleed|cry|weep|sob|wail|howl|scream|shriek|yell|bellow|roar|growl|hiss|snarl|bark|meow|moo|baa|oink|neigh|cluck|quack|honk|chirp|tweet|sing|hum|whistle|buzz|click|clack|clatter|rattle|rustle|swish|swoosh|whoosh|whiz|zoom|zip|zap|bang|boom|crash|smash|shatter|crack|snap|pop|bang|boom|pow|bam|wham|thwack|thud|thump|bump|clunk|clank|clang|ring|ding|dong|bell|buzzer|alarm|siren|horn|whistle|beep|blip|boop|bop|bip|bap|bop|bing|bong|ding|dong|dang|dung|dang|dung|dang|dung|dang|dung|dang|dung)/.test(name)) return "people";
  if (/^(home|house|building|apartment|hotel|office|factory|warehouse|school|university|library|church|temple|mosque|landmark|city|town|globe|world|map|landscape|mountain|tree|flower|nature|park|garden|castle|arch|bridge|tower|monument|statue|fountain|gate|door|window|wall|roof|floor|ceiling|column|pillar|beam|foundation|basement|attic|garage|porch|balcony|terrace|patio|courtyard|yard|lawn|field|meadow|pasture|forest|woods|jungle|desert|oasis|island|beach|shore|coast|river|lake|pond|stream|creek|waterfall|spring|well|reservoir|dam|canal|channel|strait|bay|gulf|harbor|port|dock|pier|wharf|marina|anchorage|mooring|berth|slip|drydock|shipyard|boatyard|terminal|station|stop|depot|hub|center|complex|plaza|square|court|arena|stadium|auditorium|theater|cinema|concert|hall|gallery|museum|exhibition|showroom|display|showcase|exhibit|hive|bank|institution)/.test(name)) return "building";
  if (/^(gift|party|balloon|confetti|celebration|trophy|medal|award|prize|champion|game|dice|puzzle|joystick|ball|sport|bowling|tennis|football|baseball|basketball|chess|casino|abacus|calculator|binoculars|blanket|bowl|cabinet|candle|chair|clock|coin|cup|mug|bottle|glass|jar|jug|kettle|knife|fork|spoon|plate|dish|pan|pot|oven|microwave|toaster|blender|mixer|grinder|juicer|food|meal|pizza|sushi|lemon|pear|popsicle|cricket-ball|dumbbell|fridge|dryer|washer|piano|guitar-amp|magic-wand|magnet|ruler|torch|towel|cushion|pillow|blanket|sheet|curtain|blind|shade|rug|carpet|mat|cushion|pillow|blanket|throw|quilt|comforter|duvet|bedspread|coverlet|afghan|shawl|wrap|cape|cloak|poncho|vest|jacket|coat|parka|anorak|windbreaker|raincoat|trench|overcoat|peacoat|duffle|duffel|trench|rain|snow|ski|winter|summer|spring|fall|autumn|season|climate|temperature|weather|forecast|report|warning|alert|advisory|watch|warning|emergency|disaster|crisis|accident|incident|event|occurrence|happening|phenomenon|miracle|wonder|marvel|spectacle|show|display|exhibit|demonstration|presentation|performance|concert|recital|play|drama|comedy|tragedy|musical|opera|ballet|dance|show|festival|fair|carnival|fete|festival|celebration|party|bash|shindig|hootenanny|jamboree|bash|blowout|rager|hurl|binge|bender|spree|fling|flirt|romance|love|affair|liaison|tryst|rendezvous|date|appointment|meeting|conference|convention|summit|symposium|colloquium|seminar|workshop|clinic|class|course|lecture|tutorial|lesson|session|lab|studio|atelier|workshop|garage|shed|barn|coop|pen|cage|stable|stall|kennel|litter|box|crate|basket|bin|tub|bucket|pail|can|tin|jar|bottle|flask|jug|mug|cup|glass|tumbler|goblet|chalice|stein|bath|bed|bible|bomb|bullseye|buoy|cake|chalkboard|cheese|closet|coffee|coffee-alt|coffee-bean|coffee-togo|cookie|drink|florist|hard-hat|leaf|package|restaurant|sticker|wine)/.test(name)) return "objects";
  if (/^(tool|wrench|screwdriver|hammer|drill|saw|nut|bolt|gear|setting|option|configure|customize|support|help|info|question|alert|warning|error|danger|exclamation|brightness|contrast|bulb|flask|ruler|math|robot|bot|radar|tone)/.test(name)) return "tools";
  if (/^(rocket|satellite|space|planet|star|galaxy|ufo|alien|meteor|orbit|launch|gravity)/.test(name)) return "space";
  if (/^(fish|dog|cat|bird|horse|cow|pig|sheep|goat|chicken|rabbit|mouse|bug|insect|butterfly|bee|ant|spider|snake|turtle|dolphin|whale|shark|octopus|crab|snail|owl|eagle|parrot|crow|flamingo|penguin)/.test(name)) return "animals";

  return "other";
}

function escapeTemplateLiteral(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

// ─── Index File Generation ──────────────────────────────────────────────────

function generateReactIndex(icons: IconEntry[]): string {
  return icons
    .map((icon) => `export { ${toPascalCase(icon.name)}Icon } from "./${icon.name}.js";`)
    .join("\n") + "\n";
}

function generateVueIndex(icons: IconEntry[]): string {
  return icons
    .map((icon) => `export { ${toPascalCase(icon.name)}Icon } from "./${icon.name}.js";`)
    .join("\n") + "\n";
}

function generateAngularIndex(icons: IconEntry[]): string {
  return icons
    .map((icon) => `export { ${toPascalCase(icon.name)}IconComponent } from "./${icon.name}.component.js";`)
    .join("\n") + "\n";
}

function generateWebComponentsIndex(icons: IconEntry[]): string {
  return icons
    .map((icon) => `import "./${icon.name}.js";`)
    .join("\n") + "\n";
}

function generateIconNameTypes(icons: IconEntry[]): string {
  const sortedNames = icons.map((icon) => icon.name).sort((a, b) => a.localeCompare(b));
  return `export type IconName =
${sortedNames.map((name) => `  | "${name}"`).join("\n")};

export type IconMode = "regular" | "filled";
`;
}

// ─── Main Generation ────────────────────────────────────────────────────────

function generateDocsManifests(icons: IconEntry[]): { meta: string; svg: string } {
  const metaEntries: { name: string; tags: string[]; categories: string[] }[] = [];
  const svgEntries: { name: string; regularSvg: string; filledSvg: string }[] = [];

  for (const icon of icons) {
    const displayName = icon.name.replace(/-/g, " ");
    const category = getCategory(icon.name);
    metaEntries.push({ name: icon.name, tags: [displayName], categories: [category] });

    const regularSvgContent = icon.regular ? readFileSync(icon.regular, "utf-8") : "";
    const filledSvgContent = icon.filled ? readFileSync(icon.filled, "utf-8") : "";
    const regularInnerMatch = regularSvgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    const filledInnerMatch = filledSvgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    const regularInner = regularInnerMatch ? stripHardcodedFill(regularInnerMatch[1].trim()) : "";
    const filledInner = filledInnerMatch ? stripHardcodedFill(filledInnerMatch[1].trim()) : "";
    svgEntries.push({ name: icon.name, regularSvg: regularInner, filledSvg: filledInner });
  }

  return { meta: JSON.stringify(metaEntries), svg: JSON.stringify(svgEntries) };
}

function main() {
  const icons = discoverIcons();

  console.log(`\nFound ${icons.length} icons in assets/icons/\n`);

  const reactIconsDir = join(PACKAGES_DIR, "react", "src", "icons");
  const vueIconsDir = join(PACKAGES_DIR, "vue", "src", "icons");
  const angularIconsDir = join(PACKAGES_DIR, "angular", "src", "icons");
  const wcIconsDir = join(PACKAGES_DIR, "web-components", "src", "icons");

  mkdirSync(reactIconsDir, { recursive: true });
  mkdirSync(vueIconsDir, { recursive: true });
  mkdirSync(angularIconsDir, { recursive: true });
  mkdirSync(wcIconsDir, { recursive: true });

  for (const icon of icons) {
    console.log(`  ${icon.name} (regular: ${!!icon.regular}, filled: ${!!icon.filled})`);

    const reactComponent = generateReactComponent(icon);
    if (reactComponent) writeFileSync(join(reactIconsDir, `${icon.name}.tsx`), reactComponent);

    const vueComponent = generateVueComponent(icon);
    if (vueComponent) writeFileSync(join(vueIconsDir, `${icon.name}.ts`), vueComponent);

    const angularComponent = generateAngularComponent(icon);
    if (angularComponent) writeFileSync(join(angularIconsDir, `${icon.name}.component.ts`), angularComponent);

    const wcComponent = generateWebComponent(icon);
    if (wcComponent) writeFileSync(join(wcIconsDir, `${icon.name}.ts`), wcComponent);
  }

  writeFileSync(join(reactIconsDir, "index.ts"), generateReactIndex(icons));
  writeFileSync(join(vueIconsDir, "index.ts"), generateVueIndex(icons));
  writeFileSync(join(angularIconsDir, "index.ts"), generateAngularIndex(icons));
  writeFileSync(join(wcIconsDir, "index.ts"), generateWebComponentsIndex(icons));

  writeFileSync(join(PACKAGES_DIR, "react", "src", "types.ts"), generateIconNameTypes(icons));
  writeFileSync(join(PACKAGES_DIR, "vue", "src", "types.ts"), generateIconNameTypes(icons));
  writeFileSync(join(PACKAGES_DIR, "angular", "src", "types.ts"), generateIconNameTypes(icons));

  const docsPublicDir = join(ROOT, "docs", "public");
  mkdirSync(docsPublicDir, { recursive: true });
  const manifests = generateDocsManifests(icons);
  writeFileSync(join(docsPublicDir, "icons-meta.json"), manifests.meta);
  writeFileSync(join(docsPublicDir, "icons-svg.json"), manifests.svg);

  console.log(`\nGenerated ${icons.length} icon components across 4 frameworks\n`);
}

main();
