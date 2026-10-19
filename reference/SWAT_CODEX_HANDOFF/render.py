from pathlib import Path
from playwright.sync_api import sync_playwright
import json,base64
root=Path(__file__).parent
out=root/'screenshots'
(out/'desktop').mkdir(exist_ok=True,parents=True)
(out/'mobile').mkdir(exist_ok=True,parents=True)
css=(root/'preview/styles.css').read_text()
js0=(root/'preview/app.js').read_text()
assets={k.stem:'data:image/svg+xml;base64,'+base64.b64encode(k.read_bytes()).decode() for k in (root/'reference_art').glob('*.svg')}
report=[]
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for mode,w,h in [('desktop',1440,900),('mobile',390,844)]:
  for route in ['home','river','history','places','people','fieldnotes']:
   page=browser.new_page(viewport={'width':w,'height':h},device_scale_factor=1,reduced_motion='reduce')
   errors=[];page.on('pageerror',lambda e: errors.append(str(e)))
   page.set_content(f'<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"/><style>{css}</style></head><body><div id="app"></div></body></html>')
   js=js0.replace("const page=q.get('page')||'home';",f"const page='{route}';")
   page.add_script_tag(content=js)
   page.evaluate('''assets => {for(const im of document.querySelectorAll('img.art, img.tile-art')) {const file=im.getAttribute('src').split('/').pop().replace('.svg','');if(assets[file]) im.src=assets[file];}}''', assets)
   page.wait_for_timeout(350)
   page.screenshot(path=str(out/mode/f'{route}.png'),full_page=True,animations='disabled',timeout=60000)
   res=page.evaluate('''() => ({height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,headers:document.querySelectorAll('h1').length,sections:document.querySelectorAll('section').length,imagesLoaded:[...document.querySelectorAll('img.art')].every(i=>i.complete&&i.naturalWidth>0)})''')
   report.append({'mode':mode,'route':route,'errors':errors,**res})
   print(mode,route,res,'errors=',len(errors),flush=True)
   page.close()
 browser.close()
(root/'docs'/'REFERENCE_SCREENSHOT_QA.json').write_text(json.dumps(report,indent=2))
