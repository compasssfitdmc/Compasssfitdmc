import os
import glob

def fix_literal_newlines():
    files = glob.glob('d:/Compasstdmc/**/*.html', recursive=True)
    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the literal two characters '\' and 'n' with actual newline character '\n'
        # Wait, if there are actual backslashes we want to preserve them, but here it's clearly a serialization bug
        if '\\n' in content:
            new_content = content.replace('\\n', '\n')
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {filepath}")

fix_literal_newlines()
