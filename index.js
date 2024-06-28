const fs = require("fs");
const axios = require("axios");
const cheerio=require('cheerio')
const xlsx=require('xlsx')

const URL="https://www.amazon.com/s?k=phone&page=2&crid=18EUYBSP7O1SQ&qid=1702535235&sprefix=phon%2Caps%2C280&ref=sr_pg_2"
const getPageData = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "text/html",
        },
      });
      const data = response.data; // HTML Data
    //   console.log(data);
      fs.writeFileSync("index2.txt", data);
      const $ = cheerio.load(data);
      const titles = $('.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2')
      const pdata=[]
      titles.each((index, element) => {
        const ptitle=$(element).text()
        pdata.push(ptitle)
        // console.log(ptitle)
       

          
      })
      const price=$('.a-offscreen')
        const pricedat=[]
        price.each((index, element) => {
            const pprice=$(element).text()
            pricedat.push(pprice)
            
        }
      )

      const rating=$('.a-icon-alt')
      const ratingdata=[]
      rating.each((index, element) => {
          const prating=$(element).text()
          ratingdata.push(prating)

      })

    const finaldata = pdata.map((title, index) => {
      return {
        title,
        price:pricedat[index],
        rating:ratingdata[index]
        
      }

     })
     const wb = xlsx.utils.book_new();
     const ws = xlsx.utils.json_to_sheet(finaldata);
     xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
     xlsx.writeFile(wb, "index2.xlsx");
     console.log("xl sheeth is created successfully")

    } catch (error) {
        console.log(error);
    }
}
getPageData()