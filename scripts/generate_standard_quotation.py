#!/usr/bin/env python3
"""Generate V&V Automation's no-price standard quotation PDF."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Iterable

from PIL import Image
from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "VV-Automation-Standard-Quotation.pdf"
ASSETS = ROOT / "src" / "assets"

PAGE_W, PAGE_H = A4
NAVY = HexColor("#09131F")
NAVY_2 = HexColor("#101D2B")
INK = HexColor("#131C26")
ORANGE = HexColor("#F2552A")
ORANGE_LIGHT = HexColor("#FF7650")
PAPER = HexColor("#F7F4ED")
PAPER_2 = HexColor("#EEEAE1")
LINE = HexColor("#D5D0C5")
MUTED = HexColor("#697078")
SOFT_WHITE = HexColor("#DCE0E4")

FONT_REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_ITALIC = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"


def register_fonts() -> None:
    pdfmetrics.registerFont(TTFont("VVA-Regular", FONT_REGULAR))
    pdfmetrics.registerFont(TTFont("VVA-Bold", FONT_BOLD))
    pdfmetrics.registerFont(TTFont("VVA-Italic", FONT_ITALIC))


def wrap_lines(text: str, font: str, size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if pdfmetrics.stringWidth(candidate, font, size) <= max_width:
            current = candidate
        elif current:
            lines.append(current)
            current = word
        else:
            lines.append(word)
            current = ""
    if current:
        lines.append(current)
    return lines


def draw_wrapped(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    font: str = "VVA-Regular",
    size: float = 9,
    leading: float = 13,
    color=INK,
    max_lines: int | None = None,
) -> float:
    lines = wrap_lines(text, font, size, width)
    if max_lines:
        lines = lines[:max_lines]
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_cover_image(c: canvas.Canvas, path: Path, x: float, y: float, width: float, height: float) -> None:
    with Image.open(path) as image:
        image_w, image_h = image.size
    scale = max(width / image_w, height / image_h)
    draw_w = image_w * scale
    draw_h = image_h * scale
    draw_x = x + (width - draw_w) / 2
    draw_y = y + (height - draw_h) / 2
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(ImageReader(str(path)), draw_x, draw_y, draw_w, draw_h, preserveAspectRatio=True, mask="auto")
    c.restoreState()


def draw_label(c: canvas.Canvas, text: str, x: float, y: float, color=ORANGE) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(1.4)
    c.line(x, y + 3, x + 23, y + 3)
    c.setFillColor(color)
    c.setFont("VVA-Bold", 6.7)
    c.drawString(x + 32, y, text.upper())


def draw_logo_lockup(c: canvas.Canvas, x: float, y: float, light: bool = False) -> None:
    logo_size = 38
    c.setFillColor(white)
    c.circle(x + logo_size / 2, y + logo_size / 2, logo_size / 2, fill=1, stroke=0)
    c.drawImage(ImageReader(str(ASSETS / "logo.png")), x + 4, y + 4, logo_size - 8, logo_size - 8, preserveAspectRatio=True, mask="auto")
    text_color = white if light else INK
    muted_color = HexColor("#98A1AA") if light else MUTED
    c.setFillColor(text_color)
    c.setFont("VVA-Bold", 12.5)
    c.drawString(x + 49, y + 22, "V&V Automation")
    c.setFillColor(muted_color)
    c.setFont("VVA-Regular", 6.2)
    c.drawString(x + 49, y + 9, "PRECISION IN MOTION")


def draw_footer(c: canvas.Canvas, page: int, dark: bool = False) -> None:
    line_color = Color(1, 1, 1, alpha=0.18) if dark else LINE
    text_color = HexColor("#919AA3") if dark else MUTED
    c.setStrokeColor(line_color)
    c.setLineWidth(0.5)
    c.line(42, 27, PAGE_W - 42, 27)
    c.setFillColor(text_color)
    c.setFont("VVA-Bold", 5.8)
    c.drawString(42, 14, "V&V AUTOMATION  /  STANDARD TECHNICAL & COMMERCIAL PROPOSAL")
    c.drawRightString(PAGE_W - 42, 14, f"0{page} / 03")


def draw_cover(c: canvas.Canvas) -> None:
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    draw_cover_image(c, ASSETS / "cnc-hero-branded-v3.jpg", 0, 0, PAGE_W, 414)
    c.saveState()
    c.setFillColor(Color(0.035, 0.075, 0.12, alpha=0.28))
    c.rect(0, 0, PAGE_W, 414, fill=1, stroke=0)
    c.restoreState()
    c.setFillColor(NAVY)
    c.rect(0, 392, PAGE_W, 42, fill=1, stroke=0)

    c.setStrokeColor(Color(1, 1, 1, alpha=0.08))
    c.setLineWidth(0.45)
    for x in range(0, 600, 72):
        c.line(x, 414, x, PAGE_H)
    for y in range(414, 850, 72):
        c.line(0, y, PAGE_W, y)

    draw_logo_lockup(c, 42, 767, light=True)
    c.setFillColor(ORANGE)
    c.roundRect(PAGE_W - 174, 774, 132, 27, 13.5, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("VVA-Bold", 6.6)
    c.drawCentredString(PAGE_W - 108, 784, "NO-PRICE / CONFIGURATION-LED")

    draw_label(c, "Standard proposal  /  Issue 12 September 2026", 42, 720, ORANGE_LIGHT)
    c.setFillColor(white)
    c.setFont("VVA-Bold", 41)
    c.drawString(42, 659, "Built for the job.")
    c.setFillColor(ORANGE_LIGHT)
    c.drawString(42, 613, "Specified around you.")
    draw_wrapped(
        c,
        "A standard technical and commercial overview for CNC machine systems, critical components and pan-India engineering support.",
        44,
        572,
        438,
        size=11.2,
        leading=16,
        color=SOFT_WHITE,
    )

    c.setStrokeColor(Color(1, 1, 1, alpha=0.2))
    c.line(42, 511, PAGE_W - 42, 511)
    cover_points = [
        ("01", "Machine families", "CNC, engraving, milling and VMC"),
        ("02", "Engineering scope", "Build, test, install and support"),
        ("03", "Clear next step", "Final quote after requirement mapping"),
    ]
    point_w = (PAGE_W - 84) / 3
    for index, (number, title, copy) in enumerate(cover_points):
        x = 42 + index * point_w
        if index:
            c.setStrokeColor(Color(1, 1, 1, alpha=0.18))
            c.line(x, 440, x, 493)
        c.setFillColor(ORANGE_LIGHT)
        c.setFont("VVA-Bold", 7)
        c.drawString(x + (12 if index else 0), 484, number)
        c.setFillColor(white)
        c.setFont("VVA-Bold", 8.4)
        c.drawString(x + (12 if index else 0), 468, title)
        draw_wrapped(c, copy, x + (12 if index else 0), 452, point_w - 22, size=6.6, leading=9, color=HexColor("#BFC6CD"))

    c.setFillColor(Color(0.025, 0.05, 0.08, alpha=0.72))
    c.rect(0, 0, PAGE_W, 77, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("VVA-Bold", 7.2)
    c.drawString(42, 52, "DOCUMENT REFERENCE")
    c.setFillColor(ORANGE_LIGHT)
    c.setFont("VVA-Bold", 12)
    c.drawString(42, 35, "VVA-STD-2026-01")
    c.setFillColor(white)
    c.setFont("VVA-Bold", 7.2)
    c.drawRightString(PAGE_W - 42, 52, "DELHI  /  BUILT IN INDIA")
    c.setFillColor(HexColor("#B8C0C8"))
    c.setFont("VVA-Regular", 7)
    c.drawRightString(PAGE_W - 42, 36, "Technical discussion precedes final commercial pricing")


def product_card(
    c: canvas.Canvas,
    x: float,
    y: float,
    width: float,
    height: float,
    number: str,
    title: str,
    series: str,
    models: str,
    applications: str,
    image_path: Path,
) -> None:
    c.setFillColor(white)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.65)
    c.rect(x, y, width, height, fill=1, stroke=1)
    c.setFillColor(NAVY_2)
    c.rect(x, y + height - 27, width, 27, fill=1, stroke=0)
    c.setFillColor(ORANGE_LIGHT)
    c.setFont("VVA-Bold", 6.5)
    c.drawString(x + 13, y + height - 17, number)
    c.setFillColor(white)
    c.setFont("VVA-Bold", 8.5)
    c.drawString(x + 36, y + height - 18, title)

    draw_cover_image(c, image_path, x + 12, y + height - 118, 92, 76)
    c.setFillColor(PAPER_2)
    c.rect(x + 12, y + height - 118, 92, 76, fill=0, stroke=1)

    c.setFillColor(ORANGE)
    c.setFont("VVA-Bold", 5.8)
    c.drawString(x + 117, y + height - 52, series.upper())
    c.setFillColor(INK)
    c.setFont("VVA-Bold", 7.3)
    c.drawString(x + 117, y + height - 71, "Model range")
    draw_wrapped(c, models, x + 117, y + height - 84, width - 130, size=7, leading=9.2, color=MUTED)

    c.setStrokeColor(LINE)
    c.line(x + 12, y + 51, x + width - 12, y + 51)
    c.setFillColor(INK)
    c.setFont("VVA-Bold", 6.5)
    c.drawString(x + 12, y + 36, "TYPICAL APPLICATIONS")
    draw_wrapped(c, applications, x + 12, y + 23, width - 24, size=6.4, leading=8.4, color=MUTED, max_lines=2)


def draw_portfolio(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_logo_lockup(c, 42, 766, light=False)
    c.setFillColor(MUTED)
    c.setFont("VVA-Bold", 6.2)
    c.drawRightString(PAGE_W - 42, 788, "VVA-STD-2026-01")
    c.drawRightString(PAGE_W - 42, 776, "NO-PRICE STANDARD PROPOSAL")

    draw_label(c, "Machine portfolio", 42, 735)
    c.setFillColor(INK)
    c.setFont("VVA-Bold", 23.5)
    c.drawString(42, 693, "Four platforms. One engineering standard.")
    draw_wrapped(c, "Select the closest machine family. The final configuration is matched to material, work envelope, tolerance and production target.", 42, 666, 500, size=8.7, leading=12.2, color=MUTED)

    gap = 12
    card_w = (PAGE_W - 84 - gap) / 2
    card_h = 197
    top_y = 430
    product_card(c, 42, top_y, card_w, card_h, "01", "CNC Machines", "Precision manufacturing series", "VV M-542  /  VV M-540  /  VV M-538", "Metal components / prototypes / batch production / precision machining", ASSETS / "vv-m-542.png")
    product_card(c, 42 + card_w + gap, top_y, card_w, card_h, "02", "CNC Engraving", "High-detail engraving series", "VV M-543  /  VV E-320  /  VV E-215", "Signage / mould and die / jewellery / part marking", ASSETS / "vv-m-543.png")
    product_card(c, 42, 220, card_w, card_h, "03", "CNC Milling", "Heavy-duty milling series", "VV M-433  /  VV M-430  /  VV M-425", "3D surfaces / metal cutting / tool and die / auto components", ASSETS / "vv-m-433.png")
    product_card(c, 42 + card_w + gap, 220, card_w, card_h, "04", "VMC Machines", "Vertical machining centres", "VV VMC-850  /  VV VMC-640  /  VV VMC-540", "Volume production / precision parts / aerospace / industrial equipment", ASSETS / "vv-vmc-machine-optimized.jpg")

    c.setFillColor(NAVY_2)
    c.rect(42, 62, PAGE_W - 84, 132, fill=1, stroke=0)
    c.setFillColor(ORANGE_LIGHT)
    c.setFont("VVA-Bold", 6.4)
    c.drawString(58, 171, "CRITICAL CNC PARTS & COMPONENTS")
    parts = ["Servo motors", "Spindle motors", "CNC controllers", "Servo drives", "Power supplies", "MPG handwheels"]
    for index, item in enumerate(parts):
        col = index % 3
        row = index // 3
        x = 58 + col * 166
        y = 138 - row * 34
        c.setFillColor(ORANGE)
        c.circle(x + 4, y + 2, 2.3, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("VVA-Bold", 7.3)
        c.drawString(x + 14, y, item)
    c.setStrokeColor(Color(1, 1, 1, alpha=0.18))
    c.line(58, 84, PAGE_W - 58, 84)
    c.setFillColor(HexColor("#C1C8CE"))
    c.setFont("VVA-Regular", 6.4)
    c.drawString(58, 70, "Commercial value: configuration-specific. A formal priced quotation follows requirement mapping.")
    draw_footer(c, 2, dark=False)


def detail_row(c: canvas.Canvas, x: float, y: float, number: str, title: str, copy: str, width: float) -> float:
    c.setFillColor(ORANGE)
    c.roundRect(x, y - 2, 27, 18, 9, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("VVA-Bold", 6.1)
    c.drawCentredString(x + 13.5, y + 4.5, number)
    c.setFillColor(INK)
    c.setFont("VVA-Bold", 8.3)
    c.drawString(x + 38, y + 7, title)
    end_y = draw_wrapped(c, copy, x + 38, y - 7, width - 38, size=6.6, leading=9, color=MUTED)
    return min(y - 47, end_y - 8)


def bullet_list(c: canvas.Canvas, items: Iterable[str], x: float, y: float, width: float, leading: float = 26) -> float:
    for item in items:
        c.setFillColor(ORANGE)
        c.rect(x, y + 1, 5, 5, fill=1, stroke=0)
        draw_wrapped(c, item, x + 14, y, width - 14, size=7.2, leading=9.6, color=INK, max_lines=2)
        y -= leading
    return y


def draw_scope(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_logo_lockup(c, 42, 766, light=False)
    c.setFillColor(MUTED)
    c.setFont("VVA-Bold", 6.2)
    c.drawRightString(PAGE_W - 42, 788, "VVA-STD-2026-01")
    c.drawRightString(PAGE_W - 42, 776, "SCOPE / PROCESS / NEXT STEP")

    draw_label(c, "From requirement to running machine", 42, 735)
    c.setFillColor(INK)
    c.setFont("VVA-Bold", 29)
    c.drawString(42, 693, "A complete path to production.")
    draw_wrapped(c, "The standard scope below establishes the working framework. Exact deliverables are confirmed in the final formal quotation.", 42, 666, 500, size=8.7, leading=12.2, color=MUTED)

    left_x = 42
    right_x = 311
    col_w = 242
    c.setFillColor(NAVY_2)
    c.rect(left_x, 615, col_w, 31, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("VVA-Bold", 7)
    c.drawString(left_x + 13, 626, "STANDARD ENGINEERING SCOPE")
    y = 584
    y = detail_row(c, left_x, y, "01", "Requirement mapping", "Material, job size, tolerance, output and site conditions.", col_w)
    y = detail_row(c, left_x, y, "02", "Engineering and configuration", "Machine platform, motion system, spindle and controls aligned to the work.", col_w)
    y = detail_row(c, left_x, y, "03", "In-house build and testing", "Assembly, functional checks, motion validation and output verification before dispatch.", col_w)
    y = detail_row(c, left_x, y, "04", "Installation and support", "Site installation, operator guidance, service coordination and spare-part support.", col_w)

    c.setFillColor(NAVY_2)
    c.rect(right_x, 615, col_w, 31, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("VVA-Bold", 7)
    c.drawString(right_x + 13, 626, "FINAL FORMAL QUOTATION WILL SPECIFY")
    final_items = [
        "Selected machine model and technical configuration",
        "Accessories, tooling and optional engineering services",
        "Commercial price, applicable taxes and freight",
        "Site readiness, delivery schedule and installation plan",
        "Payment milestones, warranty and validity period",
        "Any exclusions, customer dependencies and acceptance terms",
    ]
    bullet_list(c, final_items, right_x + 13, 585, col_w - 26, leading=43)

    c.setStrokeColor(LINE)
    c.line(42, 355, PAGE_W - 42, 355)
    draw_label(c, "How to proceed", 42, 329)
    process = [
        ("01", "Share the job", "Tell us the material, component and production target."),
        ("02", "Review with engineering", "We recommend a suitable platform and configuration."),
        ("03", "Receive the formal quote", "A priced, project-specific commercial proposal follows."),
    ]
    process_w = (PAGE_W - 84) / 3
    for index, (number, title, copy) in enumerate(process):
        x = 42 + index * process_w
        if index:
            c.setStrokeColor(LINE)
            c.line(x, 225, x, 311)
        c.setFillColor(ORANGE)
        c.setFont("VVA-Bold", 7.2)
        c.drawString(x + (13 if index else 0), 299, number)
        c.setFillColor(INK)
        c.setFont("VVA-Bold", 8.7)
        c.drawString(x + (13 if index else 0), 281, title)
        draw_wrapped(c, copy, x + (13 if index else 0), 264, process_w - 27, size=6.6, leading=9.2, color=MUTED)

    c.setFillColor(NAVY_2)
    c.rect(42, 72, PAGE_W - 84, 126, fill=1, stroke=0)
    c.setFillColor(ORANGE_LIGHT)
    c.setFont("VVA-Bold", 6.4)
    c.drawString(58, 174, "START A TECHNICAL DISCUSSION")
    c.setFillColor(white)
    c.setFont("VVA-Bold", 16)
    c.drawString(58, 150, "+91 93135 21824")
    c.setFont("VVA-Regular", 7.1)
    c.drawString(58, 132, "vikasch2802@gmail.com")
    c.drawString(58, 116, "Plot no. 331, near Naurula Bakery, Puth Khurd Industrial Area, Delhi - 110039")
    c.setFillColor(HexColor("#AEB6BE"))
    c.setFont("VVA-Regular", 6.4)
    c.drawString(58, 92, "Monday-Saturday / 9:00 AM-6:00 PM  |  Pan-India supply and support")
    c.setFillColor(ORANGE)
    c.roundRect(PAGE_W - 177, 140, 119, 33, 2, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("VVA-Bold", 7.2)
    c.drawCentredString(PAGE_W - 117.5, 153, "REQUEST A TAILORED QUOTE")
    c.linkURL("https://v-v-automation.rohan-crossinghurdle.chatgpt.site/quote", (PAGE_W - 177, 140, PAGE_W - 58, 173), relative=0)

    c.setFillColor(HexColor("#535B63"))
    c.setFont("VVA-Regular", 5.35)
    disclaimer = (
        "Important: This document is a standard capability and commercial-framework proposal only. It contains no prices and is not a tax invoice, proforma invoice, purchase contract or binding offer. "
        "Machine selection, scope, pricing, taxes, freight, delivery, payment and warranty are valid only when stated in a signed, project-specific formal quotation issued by V&V Automation."
    )
    draw_wrapped(c, disclaimer, 42, 57, PAGE_W - 84, size=5.35, leading=7.1, color=HexColor("#535B63"), max_lines=3)
    draw_footer(c, 3, dark=False)


def build_pdf() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    register_fonts()
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("V&V Automation - Standard Technical & Commercial Proposal")
    c.setAuthor("V&V Automation")
    c.setSubject("No-price standard quotation and capability proposal")
    c.setCreator("V&V Automation")

    draw_cover(c)
    c.showPage()
    draw_portfolio(c)
    c.showPage()
    draw_scope(c)
    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build_pdf()
