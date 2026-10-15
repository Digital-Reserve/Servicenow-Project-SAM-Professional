# The five stories

Northstar Manufacturing is an invented company: 60 employees, 45 laptops and 12 servers at three sites in the Netherlands. Five of its products were chosen so that every kind of license result appears once. All numbers are invented; they show what the tool does.

## A. Adobe Acrobat Pro: compliant

**Situation.** Northstar rents 40 Acrobat Pro licenses per named user. 40 people have Acrobat installed.
**What the system shows.** 40 owned, 40 used: compliant. Each license is allocated to a named person, and the renewal date of 31 January 2027 is tracked.
**Why it matters.** Most products are fine. Showing a clean result proves the counting is right and not just alarming.

## B. Microsoft SQL Server Standard: under-licensed

**Situation.** Three database servers each have 2 processors with 4 cores: 24 cores. Northstar bought 16 core licenses.
**What the system shows.** 24 needed, 16 owned: 8 cores short. Licenses come in packs of 2 cores at EUR 3,945 per core, so closing the gap costs 8 x EUR 3,945 = **EUR 15,780**.
**Why it matters.** This is the classic audit finding. The system finds it before the vendor does and traces it to the three servers.

## C. Microsoft Visio Professional: over-licensed

**Situation.** Northstar owns 60 Visio licenses. Only 35 laptops have Visio.
**What the system shows.** 25 licenses unused, worth 25 x EUR 579 = **EUR 14,475**.
**Why it matters.** The next 25 Visio requests cost nothing: the licenses already exist.

## D. Microsoft Project Professional: unused installations

**Situation.** Northstar owns 30 Project licenses and 28 laptops have Project. Usage data shows 12 of them not used for more than 90 days.
**What the system shows.** Compliant, but a reclamation rule turns the 12 unused installations into removal candidates, worth 12 x EUR 1,059 = **EUR 12,708**.
**Why it matters.** Taking back unused licenses is the cheapest way to cover new demand.

## E. Microsoft Windows Server Standard: vendor rules

**Situation.** Seven Windows servers: four with 16 cores and three with 8 cores, 88 cores in total. Northstar owns 112 core licenses.
**What the system shows.** Compliant, because Microsoft requires at least 16 core licenses per server: 7 x 16 = 112.
**Why it matters.** A simple count says 88 and suggests waste. The vendor's rule says 112. The publisher pack applies the rule, which is exactly what an auditor would do.

## Summary

| Story | Product | Result | Money |
| --- | --- | --- | --- |
| A | Adobe Acrobat Pro | Compliant | Renewal tracked |
| B | Microsoft SQL Server Standard | Under-licensed by 8 cores | EUR 15,780 exposure |
| C | Microsoft Visio Professional | Over-licensed by 25 | EUR 14,475 to reuse |
| D | Microsoft Project Professional | 12 unused installations | EUR 12,708 reclaimable |
| E | Microsoft Windows Server Standard | Compliant under Microsoft's rules | Correct count of 112 |
