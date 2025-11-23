import re

file_path = '/Users/dmytro/Downloads/home-main-3/js/tradein-content.js'

with open(file_path, 'r') as f:
    content = f.read()

# Pattern to find all defect blocks within a details section
pattern = re.compile(
    r'(      <div class="defect[^"]*">.*?</div>\n){5}',
    re.DOTALL
)

def replacement(match):
    # Extract all 5 defect divs
    defects = re.findall(r'      (<div class="defect[^"]*">.*?</div>)', match.group(0), re.DOTALL)
    
    # Create table structure
    table = '      <table class="defects-table">\n'
    table += '        <tr>\n'
    table += f'          <td>{defects[0]}</td>\n'
    table += f'          <td>{defects[1]}</td>\n'
    table += '        </tr>\n'
    table += '        <tr>\n'
    table += f'          <td>{defects[2]}</td>\n'
    table += f'          <td>{defects[3]}</td>\n'
    table += '        </tr>\n'
    table += '        <tr>\n'
    table += f'          <td colspan="2" style="text-align: center;">{defects[4]}</td>\n'
    table += '        </tr>\n'
    table += '      </table>\n'
    
    return table

new_content = pattern.sub(replacement, content)

with open(file_path, 'w') as f:
    f.write(new_content)

print("Converted defects to table structure successfully.")
