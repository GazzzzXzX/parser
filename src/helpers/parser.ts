import * as request from "request";
import * as $ from "cherio";
import {DataCreateDto} from "../dtos/DataCreateDto";

async function getPage(URL:string)
{
    return new Promise((resolve, reject) =>
    {
        request(
            {
                url: URL,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36 OPR/73.0.3856.438'
                }
            },
            (err, response, body) =>
            {
                if (err) reject(err)

                return resolve($.load(body, {decodeEntities: false}))
            }
        )
    })
}

async function getAdsFromPage(URL:string)
{
    const result = []
    const html:any = await getPage(URL)

    const ads = html('.Box-row').each((i, el) =>
    {
        result.push(html(el))
    })
    return result
}

async function run(URL:string)
{
    const result : DataCreateDto[] = []
    const ads = await getAdsFromPage(URL)
    let i = 0
    for (const ad of ads)
    {
        result[i] =
        {
            Name: ad.find('.h3').text().trim().replace(/\n/g, '').replace(/\s+/g, ' '),
            Desc: ad.find('.col-9').text().trim(),
            Lang: $('span[itemprop="programmingLanguage"]', ad).text().trim(),
            Star: Number(ad.find('.Link--muted').text().trim().replace(/\n/g, '').split(' ')[0].replace(',', '')),
            Forked: Number(ad.find('.Link--muted').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ').split(' ')[1].replace(',', '')),
            StarToday: ad.find('.d-inline-block').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ').split(' ').length == 8
            ? Number(ad.find('.d-inline-block').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ').split(' ')[5].replace(',', ''))
            : ad.find('.d-inline-block').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ').split(' ').length == 9
            ? Number(ad.find('.d-inline-block').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ').split(' ')[6].replace(',', ''))
            : Number(ad.find('.d-inline-block').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ').split(' ')[4].replace(',', ''))
        }
       i++
    }
    return result
}

export async function runParser(URL:string) {
    try
    {
       const ads = await run(URL)

       return ads
    }
    catch(err)
    {
        console.log(err);
    }
}
