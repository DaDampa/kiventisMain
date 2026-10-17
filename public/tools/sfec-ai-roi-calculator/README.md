# Singapore SFEC AI ROI Calculator

Region: SEA
Erzeugt: 2026-10-15T11:05:04+00:00
Status: ENTWURF

## Testwerte

Example 1 (Conservative): Employees 10, Cost/Employee 2500, SFEC Rate 0%, Direct Credit 0, Hours Saved 2, Hourly Rate 40, Weeks 48. Expected: Total Cost SGD 25,000; Net Cost SGD 25,000; Annual Savings SGD 38,400; Payback ~7.8 months; ROI ~54%; Net Benefit SGD 13,400.

Example 2 (With SFEC Funding): Employees 20, Cost/Employee 3000, SFEC Rate 50% (please verify), Direct Credit 5000, Hours Saved 4, Hourly Rate 50, Weeks 50. Expected: Total Cost SGD 60,000; Funding SGD 35,000; Net Cost SGD 25,000; Annual Savings SGD 200,000; Payback ~1.5 months; ROI ~700%; Net Benefit SGD 175,000.

Example 3 (Small Team, High Rate): Employees 5, Cost/Employee 4000, SFEC Rate 70% (please verify), Direct Credit 0, Hours Saved 5, Hourly Rate 60, Weeks 52. Expected: Total Cost SGD 20,000; Funding SGD 14,000; Net Cost SGD 6,000; Annual Savings SGD 78,000; Payback ~0.9 months; ROI ~1200%; Net Benefit SGD 72,000.

## README

# Singapore SFEC AI ROI Calculator

## Purpose
A standalone B2B lead-magnet calculator for AI competency training providers targeting Singapore enterprises. It compares training costs against SFEC (SkillsFuture Enterprise Credit) funding and productivity gains from AI adoption. Every assumption is exposed as an editable input — no hidden benchmarks or invented subsidy rates.

## Formulas (visible in code)
- Total Training Cost = Employees × Cost per Employee
- Funding = (Total Cost × SFEC Rate %) + Direct SFEC Credit
- Net Cost = Total Cost − Funding
- Annual Savings per Employee = Hours Saved/Week × Loaded Hourly Rate × Working Weeks/Year
- Total Annual Savings = Annual Savings per Employee × Employees
- Payback (months) = (Net Cost / Total Annual Savings) × 12
- ROI % = ((Total Annual Savings − Net Cost) / Net Cost) × 100
- Net Benefit Year 1 = Total Annual Savings − Net Cost

## Assumptions & Inputs
No fixed subsidy rates, productivity benchmarks, or legal thresholds are hard-coded. Every variable is an input field with a "(please verify)" note where external validation is required:
- SFEC subsidy rate: user must verify current Enterprise Singapore / SkillsFuture rules.
- Hours saved: user must verify via internal pilot or benchmark.
- Working weeks: user must adjust for leave/holidays.
- Hourly rate: user-defined loaded cost.

## Sources / Verification Notes
- SkillsFuture Enterprise Credit (SFEC): verify eligibility and credit rates at Enterprise Singapore / SkillsFuture Singapore official portals.
- Productivity estimates: should be derived from the client's own time-motion studies or pilot data, not generic studies.
- Tax treatment: this tool does not account for tax deductions or GST; verify with a tax advisor.

## Disclaimer
No legal or tax advice. Information provided without guarantee.
Keine Rechts- oder Steuerberatung. Angaben ohne Gewähr.
