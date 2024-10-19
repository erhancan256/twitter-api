const puppeteer = require("puppeteer");
const express=require('express');
const app=express();
app.listen(process.env.PORT || 3000,()=>{
	console.log('App working ')
})
app.get('/user',(req,res)=>{
	var user=req.query.user;
	(async () => {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
    slowMo: 50, // Hızı biraz yavaşlatmak için
    args: ["--start-maximized"],
});

		const page = await browser.newPage();
  await page.goto("https://x.com/"+user, { waitUntil: "networkidle2" }); // Sayfa tam yüklendiğinde bekle



  // `css-9pa8cd` sınıfına sahip tüm img elementlerini seç
  const imageSrcs = await page.$$eval('img.css-9pa8cd', imgs => 
  	imgs.map(img => img.src).filter(src => src.includes('media'))
  	);

  // `src` içerisinde "media" kelimesi geçenleri ekrana yazdır
  if (imageSrcs.length > 0) {
  	console.log('Media içeren img src\'leri:');
  	imageSrcs.forEach(src => console.log(src));
  	res.json(imageSrcs)
  } else {
  	console.log('error');
  	res.send('error')
  }

  // Tarayıcıyı kapat
  //await browser.close();
})();
})

