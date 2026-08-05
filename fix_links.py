import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix campus.html -> campus/index.html
    content = content.replace('href="campus.html"', 'href="campus/index.html"')
    content = content.replace('href="../campus.html"', 'href="../campus/index.html"')
    
    # Fix hostel.html -> hostel/index.html
    content = content.replace('href="hostel.html"', 'href="hostel/index.html"')
    content = content.replace('href="../hostel.html"', 'href="../hostel/index.html"')
    
    # Fix academics.html -> academics/index.html
    content = content.replace('href="academics.html"', 'href="academics/index.html"')
    content = content.replace('href="../academics.html"', 'href="../academics/index.html"')
    
    # For explore files, their logo might also be pointing to ../images/ instead of ../../images/
    # And css might be ../css/ instead of ../../css/
    # But wait, explore files have 2 levels deep, so they should be ../../
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed links in {filepath}")

for root, _, files in os.walk('d:\\Compasstdmc\\pages'):
    for file in files:
        if file.endswith('.html'):
            fix_file(os.path.join(root, file))

# Also fix contact.html separately if needed, wait contact.html is handled by the above
