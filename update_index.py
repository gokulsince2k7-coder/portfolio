#!/usr/bin/env python3
"""Script to update index.html for the new multi-page portfolio structure."""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update nav links
old_nav = '''        <a href="#about"        class="nl">About</a>
        <a href="#skills"       class="nl">Skills</a>
        <a href="#projects"     class="nl">Work</a>
        <a href="#contact"      class="nl">Contact</a>
        <a href="mailto:gokulsince2k7@gmail.com" class="nl nl-cta">Hire Me</a>'''

new_nav = '''        <a href="#about" class="nl">About</a>
        <a href="roles.html" class="nl">Work</a>
        <a href="mailto:gokulsince2k7@gmail.com" class="nl nl-cta">Hire Me</a>'''

content = content.replace(old_nav, new_nav)
print("Nav update:", "OK" if new_nav in content else "FAILED - trying alt")

# Try alternate (with different whitespace)
if new_nav not in content:
    # Find and replace by searching for the section
    import re
    content = re.sub(
        r'<a href="#about"\s+class="nl">About</a>\s*\n\s*<a href="#skills"\s+class="nl">Skills</a>\s*\n\s*<a href="#projects"\s+class="nl">Work</a>\s*\n\s*<a href="#contact"\s+class="nl">Contact</a>\s*\n\s*<a href="mailto:gokulsince2k7@gmail\.com" class="nl nl-cta">Hire Me</a>',
        '        <a href="#about" class="nl">About</a>\r\n        <a href="roles.html" class="nl">Work</a>\r\n        <a href="mailto:gokulsince2k7@gmail.com" class="nl nl-cta">Hire Me</a>',
        content
    )
    print("Nav regex update done")

# 2. Update hero CTA button
content = content.replace(
    '<a href="#projects" class="btn-primary">View Work</a>',
    '<a href="roles.html" class="btn-primary">Explore My Work</a>'
)
print("Hero btn update:", "OK" if 'roles.html" class="btn-primary"' in content else "FAILED")

content = content.replace(
    '<a href="#contact"  class="btn-ghost">Get in Touch</a>',
    '<a href="mailto:gokulsince2k7@gmail.com" class="btn-ghost">Get in Touch</a>'
)

# 3. Remove everything from SKILLS section onward, keep footer
# Keep: everything up to and including about section + marquee
# Remove: skills, projects, certifications, achievements, contact
# Keep: footer

# Find the start of skills section
skills_start = content.find('\r\n  <!-- SKILLS -->')
if skills_start == -1:
    skills_start = content.find('\n  <!-- SKILLS -->')

# Find the footer
footer_start = content.find('  <!-- FOOTER -->')

if skills_start != -1 and footer_start != -1:
    # Keep everything before skills, then add an "explore work" CTA section, then footer
    before_skills = content[:skills_start]
    footer_onward = content[footer_start:]
    
    explore_section = '''

  <!-- EXPLORE CTA -->
  <section class="section explore-cta-section">
    <div class="container">
      <div class="explore-cta-wrap">
        <div>
          <p class="label">My Work</p>
          <h2 class="section-heading">Ready to explore?</h2>
          <p class="explore-desc">Browse my projects by role — web development &amp; cyber security.</p>
        </div>
        <a href="roles.html" class="btn-primary explore-btn">
          Enter Portfolio
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </section>

  '''
    
    content = before_skills + explore_section + footer_onward
    print(f"Sections removed: OK (skills start: {skills_start}, footer: {footer_start})")
else:
    print(f"WARNING: Could not find sections. skills_start={skills_start}, footer_start={footer_start}")
    print("Searching for markers...")
    for marker in ['SKILLS', 'FOOTER', 'PROJECTS', 'skills']:
        idx = content.find(f'<!-- {marker}')
        print(f"  '<!-- {marker}': {idx}")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! index.html updated.")
