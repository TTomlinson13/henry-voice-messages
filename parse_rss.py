import xml.etree.ElementTree as ET
import sys

def parse_rss(file_path):
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
        print(f"--- {file_path} ---")
        for item in root.findall('.//item')[:5]:
            title = item.find('title').text
            pubDate = item.find('pubDate').text
            link = item.find('link').text
            print(f"Title: {title}")
            print(f"Date: {pubDate}")
            print(f"Link: {link}")
            print("-")
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")

if __name__ == "__main__":
    for f in sys.argv[1:]:
        parse_rss(f)
