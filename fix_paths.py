import os

def fix_level2_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # These files are 2 levels deep, so they need ../../ for root assets
    
    # css
    content = content.replace('href="../css/', 'href="../../css/')
    # js
    content = content.replace('src="../js/', 'src="../../js/')
    # logo
    content = content.replace('href="../images/logo', 'href="../../images/logo')
    content = content.replace('src="../images/logo', 'src="../../images/logo')
    # navbar Home link
    content = content.replace('href="../index.html"', 'href="../../index.html"')
    
    # Footer explore links (e.g. href="explore/index.html" should be href="../explore/index.html")
    # Actually it's easier to just use correct paths if we know them.
    # In explore directory: 
    if "explore" in filepath:
        content = content.replace('href="index.html">Explore Alappuzha', 'href="../explore/index.html">Explore Alappuzha')
        content = content.replace('href="places.html">Places to Visit', 'href="../explore/places.html">Places to Visit')
        content = content.replace('href="miscellaneous.html">Miscellaneous', 'href="../explore/miscellaneous.html">Miscellaneous')
        content = content.replace('href="temples.html">Temples', 'href="../explore/temples.html">Temples')
        content = content.replace('href="churches.html">Churches', 'href="../explore/churches.html">Churches')
        content = content.replace('href="mosques.html">Mosques', 'href="../explore/mosques.html">Mosques')
        
        # In explore/index.html we have <a href="index.html" class="active">Explore</a>. This is fine.

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed level-2 relative paths in {filepath}")

subdirs = ['campus', 'hostel', 'academics', 'explore']

for subdir in subdirs:
    dir_path = os.path.join('d:\\Compasstdmc\\pages', subdir)
    if os.path.exists(dir_path):
        for root, _, files in os.walk(dir_path):
            for file in files:
                if file.endswith('.html'):
                    fix_level2_file(os.path.join(root, file))
