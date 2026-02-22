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

import urllib.parse

def fetch_from_openlibrary(title, author, out_path):
    print(f"  -> Attempting OpenLibrary fallback for: {title}")
    search_url = f"https://openlibrary.org/search.json?title={urllib.parse.quote(title)}&author={urllib.parse.quote(author)}"
    try:
        res = requests.get(search_url, timeout=10)
        if res.status_code == 200:
            data = res.json()
            docs = data.get("docs", [])
            for doc in docs:
                cover_i = doc.get("cover_i")
                if cover_i:
                    img_url = f"https://covers.openlibrary.org/b/id/{cover_i}-L.jpg"
                    headers = {'User-Agent': 'Mozilla/5.0'}
                    img_res = requests.get(img_url, headers=headers, timeout=10)
                    if img_res.status_code == 200:
                        with open(out_path, 'wb') as f:
                            f.write(img_res.content)
                        print(f"✅ Saved {os.path.basename(out_path)} from OpenLibrary")
                        return True
            print(f"❌ OpenLibrary found no cover image for {title}")
        else:
            print(f"❌ OpenLibrary search failed with HTTP {res.status_code}")
    except Exception as e:
        print(f"❌ OpenLibrary error for {title}: {e}")
    return False

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
        
    success = False
    try:
        results = DDGS().images(
            keywords=query,
            region="wt-wt",
            safesearch="off",
            size="Large",
            max_results=1,
        )
        if results:
            img_url = results[0]['image']
            headers = {'User-Agent': 'Mozilla/5.0'}
            response = requests.get(img_url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                with open(out_path, 'wb') as f:
                    f.write(response.content)
                print(f"✅ Saved {safe_name} from DuckDuckGo")
                success = True
            else:
                print(f"⚠️ DuckDuckGo download failed: HTTP {response.status_code}")
        else:
            print(f"⚠️ No images found for {title} on DuckDuckGo")
            
    except Exception as e:
        print(f"⚠️ DuckDuckGo fetch error for {title}: {e}")
        
    if not success:
        # Fallback to OpenLibrary
        success = fetch_from_openlibrary(title, author, out_path)
        
    time.sleep(2)

print("Done fetching covers.")
