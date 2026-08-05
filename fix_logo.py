import os

def fix_logo(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Replace any reference to the WhatsApp image with logo_updated.jpeg
    content = content.replace('WhatsApp Image 2026-07-31 at 12.29.22 AM (13).jpeg', 'logo_updated.jpeg')
    content = content.replace('WhatsApp%20Image%202026-07-31%20at%2012.29.22%20AM%20(13).jpeg', 'logo_updated.jpeg')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed logo in {filepath}")

for root, _, files in os.walk('d:\\Compasstdmc'):
    for file in files:
        if file.endswith('.html'):
            fix_logo(os.path.join(root, file))
