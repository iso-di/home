
import re

file_path = '/Users/dmytro/Downloads/home-main-3/js/tradein-content.js'

with open(file_path, 'r') as f:
    content = f.read()

# Pattern to match the sequence: defect3, defect, defect2
# We capture the full lines including indentation and content
pattern = re.compile(r'(\s*<div class="defect3">.*?</div>\n)(\s*<div class="defect">.*?</div>\n)(\s*<div class="defect2">.*?</div>\n)', re.DOTALL)

def replacement(match):
    d3 = match.group(1)
    d1 = match.group(2)
    d2 = match.group(3)
    # Reorder to: defect, defect2, defect3
    return d1 + d2 + d3

new_content = pattern.sub(replacement, content)

with open(file_path, 'w') as f:
    f.write(new_content)

print("Reordered defect blocks successfully.")
