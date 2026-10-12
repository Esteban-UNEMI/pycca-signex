const { chromium }=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:390,height:844}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000/bebes');
 await page.getByRole('heading',{name:'Elige con confianza.'}).waitFor();
 assert.equal(await page.locator('.product-card').count(),8);
 const options=page.locator('.baby-compare-options input');
 await options.nth(0).check();await options.nth(1).check();await options.nth(2).check();
 assert.equal(await page.locator('.baby-compare-grid article').count(),3);
 assert(await options.nth(3).isDisabled());
 await options.nth(1).uncheck();assert(await options.nth(3).isEnabled());
 await page.locator('.baby-checklist input').nth(0).check();await page.reload();
 await page.locator('.baby-checklist input').nth(0).waitFor();
 assert(await page.locator('.baby-checklist input').nth(0).isChecked());
 for(const width of [360,390,768,1440]){
  await page.setViewportSize({width,height:950});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${width}`);
 }
 await page.screenshot({path:'output/playwright/campaign-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'output/playwright/campaign-mobile.png',fullPage:true});
 const loaded=await page.locator('.product-card img').evaluateAll(imgs=>imgs.every(i=>i.complete&&i.naturalWidth>0&&i.getAttribute('src').endsWith('-v2.webp')));assert(loaded);
 // Upgrade a persisted catalog while preserving a custom photo, price and deleted item.
 await page.evaluate(()=>{
  localStorage.setItem('casa-viva-products',JSON.stringify([
   {id:'baby-cuna-nido',image:'/baby/crib-natural.svg',price:321,stock:4,department:'Bebés',category:'Cunas',name:'Mi cuna',description:'Demo',seller:'Demo',rating:0,reviews:0},
   {id:'baby-cuna-luna',image:'https://example.com/custom.jpg',price:99,stock:3,department:'Bebés',category:'Cunas',name:'Personalizada',description:'Demo',seller:'Demo',rating:0,reviews:0}
  ]));localStorage.removeItem('pycca-baby-images-v2');
 });await page.reload();await page.locator('.baby-planner').waitFor();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('casa-viva-products')));
 assert.equal(saved.length,2);assert.equal(saved[0].image,'/baby/crib-natural-v2.webp');assert.equal(saved[0].price,321);assert.equal(saved[1].image,'https://example.com/custom.jpg');
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: campaign images, 360/390/768/1440 widths, comparison limit, checklist persistence and catalog migration.');
})().catch(e=>{console.error(e);process.exit(1)});
