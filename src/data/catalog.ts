import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Boxes, Factory, Gauge, Headphones, Settings2, ShieldCheck, Wrench } from "lucide-react";
import machine542 from "@/assets/vv-m-542.webp";
import machine543 from "@/assets/vv-m-543.webp";
import machine433 from "@/assets/vv-m-433.webp";
import vmcMachine from "@/assets/vv-vmc-machine-optimized.webp";
import servoMotor from "@/assets/servo-motor.jpg";
import controlPanel from "@/assets/control-panel.webp";
import mpgHandwheel from "@/assets/mpg-handwheel.jpg";
import spindleMotor from "@/assets/spindle-motor.webp";
import servoDrives from "@/assets/servo-drives.jpg";
import powerSupply from "@/assets/power-supply.jpg";

export const contact = {
  phoneDisplay: "+91 93135 21824",
  phoneHref: "tel:+919313521824",
  whatsapp: "919313521824",
  email: "vikasch2802@gmail.com",
  addressLines: ["Plot no. 331, near Naurula Bakery", "Puth Khurd Industrial Area", "Delhi — 110039"],
  hours: "Monday–Saturday · 9:00 AM–6:00 PM",
};

export const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "500+", label: "Machines delivered" },
  { value: "28+", label: "States reached" },
  { value: "Pan-India", label: "Service support" },
];

export interface Product {
  id: string;
  number: string;
  name: string;
  englishName: string;
  description: string;
  image: string;
  applications: string[];
  models: string[];
  tag: string;
  profile: { detail: number; power: number; speed: number; volume: number };
}

export const products: Product[] = [
  {
    id: "cnc-machines",
    number: "01",
    name: "CNC Machines",
    englishName: "Precision Manufacturing Series",
    description: "Versatile systems engineered for repeatable accuracy and dependable daily output—from prototypes to production batches.",
    image: machine542,
    applications: ["Metal components", "Prototype development", "Batch production", "Precision machining"],
    models: ["VV M-542", "VV M-643", "VV M-853"],
    tag: "Most versatile",
    profile: { detail: 3, power: 3, speed: 3, volume: 3 },
  },
  {
    id: "cnc-engraving",
    number: "02",
    name: "CNC Engraving",
    englishName: "High-detail Engraving Series",
    description: "Compact machines delivering clean finishes and fine-detail control for nameplates, dies, patterns and detailed surface work.",
    image: machine543,
    applications: ["Signage", "Mould & die", "Jewellery", "Part marking"],
    models: ["VV M-543", "VV M-432", "VV M-322"],
    tag: "Fine detail",
    profile: { detail: 5, power: 1, speed: 3, volume: 2 },
  },
  {
    id: "cnc-milling",
    number: "03",
    name: "CNC Milling",
    englishName: "Heavy-duty Milling Series",
    description: "A robust structure and powerful spindle, built for demanding metal removal, complex surfaces and tool-room work.",
    image: machine433,
    applications: ["3D surfaces", "Metal cutting", "Tool & die", "Auto components"],
    models: ["VV M-433", "VV M-543", "VV M-644"],
    tag: "Heavy duty",
    profile: { detail: 3, power: 4, speed: 3, volume: 4 },
  },
  {
    id: "vmc-machines",
    number: "04",
    name: "VMC Machines",
    englishName: "Vertical Machining Centres",
    description: "Production-ready VMC systems that balance speed, rigidity and tight tolerances in high-volume environments.",
    image: vmcMachine,
    applications: ["Volume production", "Precision parts", "Aerospace", "Industrial equipment"],
    models: ["VV M-855", "VV M-645", "VV M-544"],
    tag: "Production ready",
    profile: { detail: 4, power: 5, speed: 5, volume: 5 },
  },
];

export const parts = [
  { id: "servo-motors", name: "Servo Motors", image: servoMotor, description: "High-precision motors for accurate positioning and smooth motion control.", applications: ["Axis positioning", "Spindle control", "Tool changers"] },
  { id: "spindle-motors", name: "Spindle Motors", image: spindleMotor, description: "Industrial spindle motors for high-speed cutting and consistent torque.", applications: ["Milling", "Drilling", "Engraving"] },
  { id: "controllers", name: "CNC Controllers", image: controlPanel, description: "Built for G-code processing, multi-axis coordination and live machine control.", applications: ["Automation", "G-code", "Monitoring"] },
  { id: "drives", name: "Servo Drives", image: servoDrives, description: "Dependable drives that precisely manage motor current, velocity and torque.", applications: ["Motor control", "Speed", "Torque"] },
  { id: "power-supplies", name: "Power Supplies", image: powerSupply, description: "Stable industrial power delivery for CNC control and auxiliary systems.", applications: ["Control power", "Motor power", "Backup"] },
  { id: "handwheels", name: "MPG Handwheels", image: mpgHandwheel, description: "Precise pulse generators for setup, calibration and fine manual positioning.", applications: ["Jog control", "Setup", "Calibration"] },
];

export interface Advantage {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const advantages: Advantage[] = [
  { icon: Settings2, title: "Requirement-led design", text: "Every configuration starts with your material, job size and production target." },
  { icon: Factory, title: "In-house manufacturing", text: "Direct control over design, assembly and testing means fewer compromises." },
  { icon: ShieldCheck, title: "Tested before dispatch", text: "Every system goes through functional, motion and output checks before delivery." },
  { icon: Headphones, title: "Direct technical support", text: "Installation, training, spare parts and after-sales help from our own team." },
];

export const serviceSteps = [
  { icon: Gauge, number: "01", title: "Requirement mapping", text: "We understand your material, work envelope, output and tolerance needs." },
  { icon: Wrench, number: "02", title: "Engineering & build", text: "We assemble and integrate the configuration suited to your work." },
  { icon: BadgeCheck, number: "03", title: "Testing & approval", text: "We validate performance and prepare the machine for handover." },
  { icon: Boxes, number: "04", title: "Install & support", text: "We provide site installation, operator guidance and ongoing support." },
];

export const milestones = [
  { year: "2014", text: "V&V Automation begins with CNC engraving machines." },
  { year: "2016", text: "Expansion into CNC milling and the VMC range." },
  { year: "2019", text: "The team reaches the 300+ delivered-machines milestone." },
  { year: "2022", text: "Pan-India supply and support network expands." },
  { year: "2024", text: "Next-generation precision series launches." },
];

/**
 * Every V&V machine is built to the customer's working size, and the model name encodes it:
 * VV M-542 = X 500 mm × Y 400 mm × Z 200 mm of travel (each digit = hundreds of mm).
 */
export interface MachineSize { x: number; y: number; z: number }

export const modelName = ({ x, y, z }: MachineSize) => `VV M-${x / 100}${y / 100}${z / 100}`;

export const decodeModel = (model: string): MachineSize | null => {
  const m = model.match(/M-(\d)(\d)(\d)$/);
  if (!m) return null;
  const [x, y, z] = m.slice(1).map((d) => Number(d) * 100);
  return x && y && z ? { x, y, z } : null;
};

export const sizeLabel = (size: MachineSize) => `X ${size.x} × Y ${size.y} × Z ${size.z} mm`;
