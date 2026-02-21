import sys
import subprocess
import json
import os
import shutil
import time
import requests

try:
    from duckduckgo_search import DDGS
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "duckduckgo-search"])
    from duckduckgo_search import DDGS

with open("src/data/content.json", "r", encoding="utf-8") as f:
    data = json.load(f)

books = data["books"]
output_dir = "public/images/covers"
os.makedirs(output_dir, exist_ok=True)

for book in books:
    title = book["title"]
    author = book["author"]
    query = f"\"{title}\" \"{author}\" book cover high resolution"
    print(f"Fetching cover for: {title} by {author}")
    
    safe_name = title.replace(" ", "_").replace("'", "").lower() + ".jpg"
    out_path = os.path.join(output_dir, safe_name)
    
    if os.path.exists(out_path):
        print(f"Skipping {title}, already exists.")
        continue
        
    try:
        results = DDGS().images(
            keywords=query,
            region="wt-wt",
            safesearch="off",
            size="Large",
            max_results=1,
        )
        if not results:
            print(f"❌ No images found for {title}")
            continue
            
        img_url = results[0]['image']
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(img_url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            with open(out_path, 'wb') as f:
                f.write(response.content)
            print(f"✅ Saved {safe_name}")
        else:
            print(f"❌ Failed to download {title}: HTTP {response.status_code}")
            
    except Exception as e:
        print(f"❌ Error fetching {title}: {e}")
        
    time.sleep(1.5)

print("Done fetching covers.")
